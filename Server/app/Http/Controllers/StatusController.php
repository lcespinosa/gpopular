<?php

namespace App\Http\Controllers;

use App\Models\Status;
use Illuminate\Http\Request;

class StatusController extends Controller
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
        $statuses = Status::all(['id', 'name']);

        return response()->json(compact('statuses'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name'      => 'required|string|max:50',
            'code'      => 'required|string|max:50|unique:statuses',
        ]);

        $status = new Status([
            'name'              => $request->name,
            'code'              => $request->code,
        ]);
        $status->save();

        return response()->json(compact('status'));
    }

    public function update(Request $request, $status)
    {
        $status = Status::findOrFail($status);

        $this->validate($request, [
            'name'      => 'required|string|max:50',
            'code'      => 'required|string|max:50|unique:status,code,' . $status->id,
        ]);

        $status->fill([
            'name'              => $request->name,
            'code'              => $request->code,
        ])->save();

        return response()->json(compact('status'));
    }

    public function show($status)
    {
        $status = Status::findOrFail($status);
        return response()->json(compact('status'));
    }

    public function delete($status)
    {
        $status = Status::findOrFail($status);
        $status->delete();
        return response()->json([
            'code'      => '200_01'
        ]);
    }
}
