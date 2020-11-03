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
        $topics = Topic::with('agency')
            ->get();

        return response()->json(compact('topics'));
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
            'has_resources'     => $request->has_resources ?? false,
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
            'has_resources'     => $request->has_resources ?? false,
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
