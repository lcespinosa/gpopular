<?php

namespace App\Http\Controllers;

use App\Models\Way;
use Illuminate\Http\Request;

class WayController extends Controller
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
        $ways = Way::all(['id', 'name']);

        return response()->json(compact('ways'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name'      => 'required|string|max:25',
            'code'      => 'required|string|max:25|unique:ways',
        ]);

        $way = new Way([
            'name'              => $request->name,
            'code'              => $request->code,
        ]);
        $way->save();

        return response()->json(compact('way'));
    }

    public function update(Request $request, $way)
    {
        $way = Way::findOrFail($way);

        $this->validate($request, [
            'name'      => 'required|string|max:25',
            'code'      => 'required|string|max:25|unique:ways,code,' . $way->id,
        ]);

        $way->fill([
            'name'              => $request->name,
            'code'              => $request->code,
        ])->save();

        return response()->json(compact('way'));
    }

    public function show($way)
    {
        $way = Way::findOrFail($way);
        return response()->json(compact('way'));
    }

    public function delete($way)
    {
        $way = Way::findOrFail($way);
        $way->delete();
        return response()->json([
            'code'      => '200_01'
        ]);
    }
}
