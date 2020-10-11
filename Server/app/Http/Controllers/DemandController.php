<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Demand;
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
        $demands = Demand::with(['contact', 'type'])
            ->get();

        return response()->json(compact('demands'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'type_id'   => 'required|integer|exist:types,id',
            'way_id'    => 'required|integer|exist:ways,id',
            'topics'    =>  'required|array|min:1',
            'is_anonymous'  => 'required|boolean',
            'contact_id' => 'exclude_unless:is_anonymous,false|required|integer',
            'page'      => 'required|integer',
            'number'    => 'required|integer',
            'is_demand' => 'required|boolean',
            'demand_case_id' => 'exclude_unless:is_demand,true|required|exist:demand_cases,id',
        ]);

        if ($request->is_anonymous) {
            $contact = Contact::whithoutScope(NotAnonymous::class)
                ->whereAnonymous(true)
                ->first();
        }
        else {
            $contact = Contact::findOrFail($request->contact_id);
        }

        $demand = new Demand([
            'page'              => $request->page,
            'number'            => $request->number,
            'expedient'         => $request->expedient,
            'reception_date'    => $request->reception_date,
            'content'           => $request->get('content'),
            'is_demand'         => $request->is_demand ?? false,

            'type_id'           => $request->type_id,
            'way_id'            => $request->way_id,
        ]);
        if ($request->is_demand) {
            $demand->demand_case_id = $request->demand_case_id;
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
