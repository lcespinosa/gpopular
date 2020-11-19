<?php

namespace App\Http\Controllers;

use App\Models\Agency;
use App\Models\Contact;
use App\Models\Demand;
use App\Models\DemandCase;
use App\Models\Topic;
use App\Models\Way;
use App\Scopes\NotAnonymous;
use Illuminate\Http\Request;

class DemandController extends Controller
{
    /**
     * Instantiate a new UserController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $demands = Demand::with(['contact', 'type', 'way', 'topics', 'demand_case'])
            ->get();

        return response()->json(compact('demands'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'type_id'   => 'required|integer|exist:types,id',
            'way_id'    => 'required|integer|exist:ways,id',
            'topic_id'    =>  'required',
            'agency_id'    =>  'required',
            'is_anonymous'  => 'required|boolean',
            'contact_id' => 'exclude_unless:is_anonymous,false|required|integer',
            'page'      => 'required|integer',
            'number'    => 'required|integer',
            'demand_case_id' => 'exclude_unless:type_id,3|required|exist:demand_cases,id',
        ]);

        if ($request->is_anonymous) {
            $contact = Contact::whithoutScope(NotAnonymous::class)
                ->whereAnonymous(true)
                ->first();
        }
        else {
            $contact = Contact::findOrFail($request->contact_id);
        }

        if (filter_var($request->way_id, FILTER_VALIDATE_INT) !== false) {
            $way = Way::findOrFail($request->way_id);
        }
        else {
            $way = Way::whereName($request->way_id)->first();
            if (!$way) {
                $way = Way::create([
                    'name'  => $request->way_id,
                    'code'  => next_id(Way::class)
                ]);
            }
        }

        if (filter_var($request->agency_id, FILTER_VALIDATE_INT) !== false) {
            $agency = Agency::findOrFail($request->agency_id);
        }
        else {
            $agency = Agency::whereName($request->agency_id)->first();
            if (!$agency) {
                $agency = Agency::create([
                    'name'  => $request->agency_id,
                    'code'  => next_id(Agency::class)
                ]);
            }
        }
        if (filter_var($request->topic_id, FILTER_VALIDATE_INT) !== false) {
            $topic = Topic::findOrFail($request->topic_id);
        }
        else {
            $topic = Topic::whereName($request->topic_id)->first();
            if (!$topic) {
                $topic = Topic::create([
                    'name'  => $request->topic_id,
                    'code'  => $request->topic_id,
                    'agency_id' => $agency->id
                ]);
            }
        }

        $demand = new Demand([
            'page'              => $request->page,
            'number'            => $request->number,
            'expedient'         => $request->expedient,
            'reception_date'    => $request->reception_date,
            'content'           => $request->get('content'),
            'is_anonymous'      => $request->is_anonymous,

            'type_id'           => $request->type_id,
            'way_id'            => $way->id,
            'topic_id'          => $topic->id,
        ]);
        if ($request->type_id === 3) {
            if (filter_var($request->demand_case_id, FILTER_VALIDATE_INT) !== false) {
                $case = DemandCase::findOrFail($request->demand_case_id);
            }
            else {
                $case = DemandCase::whereName($request->demand_case_id)->first();
                if (!$case) {
                    $case = DemandCase::create([
                        'name'  => $request->demand_case_id,
                        'code'  => next_id(DemandCase::class)
                    ]);
                }
            }
            $demand->demand_case_id = $case->id;
        }
        $contact->demands()->save($demand);

        return response()->json(compact('demand'));
    }

    public function update(Request $request, $demand)
    {
        $demand = Demand::findOrFail($demand);

        $demand->fill([
            'page'              => $request->page,
            'number'            => $request->number,
            'expedient'         => $request->expedient,
            'reception_date'    => $request->reception_date,
            'content'           => $request->get('content'),
        ])->save();

        return response()->json(compact('demand'));
    }

    public function show($demand)
    {
        $demand = Demand::findOrFail($demand);
        return response()->json(compact('demand'));
    }

    public function replies($demand)
    {
        $demand = Demand::findOrFail($demand);
        $demand->load(['reply.reason_type', 'reply.functionary', 'reply.result']);
        return response()->json(compact('demand'));
    }

    public function delete($demand)
    {
        $demand = Demand::findOrFail($demand);
        $demand->delete();
        return response()->json([
            'code'      => '200_01'
        ]);
    }
}
