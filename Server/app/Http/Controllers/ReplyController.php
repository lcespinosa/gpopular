<?php

namespace App\Http\Controllers;

use App\Models\Demand;
use App\Models\Functionary;
use App\Models\Reply;
use Illuminate\Http\Request;

class ReplyController extends Controller
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
        $replies = Reply::with(['reason_type', 'demand', 'functionary', 'result'])
            ->get();

        return response()->json(compact('replies'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'functionary_id'    => 'required|integer|exists:functionaries,id',
            'reason_type_id'    => 'required|integer|exists:reason_types,id',
            'result_id'         => 'required|integer|exists:results,id',
            'demand_id'         => 'required|integer',
            'description'       => 'required|string',
            'accepted'          => 'required|boolean',
            'reply_date'        => 'exclude_if:send_date,null|after:send_date',
        ]);

        $demand = Demand::findOrFail($request->demand_id);
        $functionary = Functionary::findOrFail($request->functionary_id);
        if ($demand->topic->agency->id === $functionary->agency->id) {
            $hasAcceptedReply = $demand->replies()->where('accepted', true)->count() > 0;
            if ($hasAcceptedReply && $request->accepted) {
                $demand->replies()->update(['accepted' => false]);
            }

            $reply = new Reply([
                'description' => $request->description,
                'accepted' => $request->accepted,
                'send_date' => $request->send_date,
                'reply_date' => $request->reply_date,

                'reason_type_id' => $request->reason_type_id,
                'result_id' => $request->result_id,
                'functionary_id' => $request->functionary_id,
            ]);
            $demand->replies()->save($reply);

            return response()->json(compact('reply'));
        }
        return response()->json(['error' => 'La respuesta no proviene del mismo organismo.'], 400);
    }

    public function update(Request $request, $reply)
    {
        $this->validate($request, [
            'functionary_id'    => 'required|integer|exists:functionaries,id',
            'reason_type_id'    => 'required|integer|exists:reason_types,id',
            'result_id'         => 'required|integer|exists:results,id',
            'description'       => 'required|string',
            'accepted'          => 'required|boolean',
            'reply_date'        => 'exclude_if:send_date,null|after:send_date',
        ]);

        $reply = Reply::findOrFail($reply);

        $demand = $reply->demand;
        $functionary = Functionary::findOrFail($request->functionary_id);
        if ($demand->topic->agency->id === $functionary->agency->id) {
            $hasAcceptedReply = $demand->replies()->where('accepted', true)->count() > 0;
            if ($hasAcceptedReply && $request->accepted) {
                $demand->replies()->update(['accepted' => false]);
            }

            $reply->fill([
                'description' => $request->description,
                'accepted' => $request->accepted,
                'send_date' => $request->send_date,
                'reply_date' => $request->reply_date,

                'reason_type_id' => $request->reason_type_id,
                'result_id' => $request->result_id,
                'functionary_id' => $request->functionary_id,
            ])->save();

            return response()->json(compact('reply'));
        }
        return response()->json(['error' => 'La respuesta no proviene del mismo organismo.'], 400);
    }

    public function show($reply)
    {
        $reply = Reply::findOrFail($reply);
        $reply->load(['reason_type', 'demand', 'functionary', 'result']);
        return response()->json(compact('reply'));
    }

    public function delete($reply)
    {
        $reply = Reply::findOrFail($reply);
        $reply->delete();
        return response()->json([
            'code'      => '200_01'
        ]);
    }
}
