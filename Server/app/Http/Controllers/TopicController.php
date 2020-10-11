<?php

namespace App\Http\Controllers;

use App\Models\Agency;
use App\Models\Topic;
use Illuminate\Http\Request;

class TopicController extends Controller
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
        $topicsGropedByAgency = Agency::with('topics')
            ->get(['id', 'name']);

        return response()->json(compact('topicsGropedByAgency'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'agency_id' => 'required|integer',
            'name'      => 'required|string|max:50',
            'code'      => 'required|string|max:25|unique:topics',
        ]);

        $agency = Agency::findOrFail($request->agency_id);
        $topic = new Topic([
            'name'              => $request->name,
            'code'              => $request->code,
            'has_resources'     => $request->has_resources,
        ]);
        $agency->topics()->save($topic);

        return response()->json(compact('topic'));
    }

    public function update(Request $request, $topic)
    {
        $topic = Topic::findOrFail($topic);

        $this->validate($request, [
            'name'      => 'required|string|max:50',
            'code'      => 'required|string|max:25|unique:topics,code,' . $topic->id,
        ]);

        $topic->fill([
            'name'              => $request->name,
            'code'              => $request->code,
            'has_resources'     => $request->has_resources,
        ])->save();

        return response()->json(compact('topic'));
    }

    public function show($topic)
    {
        $topic = Topic::findOrFail($topic);
        return response()->json(compact('topic'));
    }

    public function delete($topic)
    {
        $topic = Topic::findOrFail($topic);
        $topic->delete();
        return response()->json([
            'code'      => '200_01'
        ]);
    }
}
