<?php

namespace App\Http\Controllers;

use App\Models\Result;
use Illuminate\Http\Request;

class ResultController extends Controller
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
        $results = Result::all(['id', 'name', 'code']);

        return response()->json(compact('results'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name'      => 'required|string|max:50|unique:results',
        ]);

        $result = new Result([
            'name'              => $request->name,
            'code'              => next_id(Result::class),
        ]);
        $result->save();

        return response()->json(compact('result'));
    }

    public function update(Request $request, $result)
    {
        $result = Result::findOrFail($result);

        $this->validate($request, [
            'name'      => 'required|string|max:50',
        ]);

        $result->fill([
            'name'              => $request->name,
        ])->save();

        return response()->json(compact('result'));
    }

    public function show($result)
    {
        $result = Result::findOrFail($result);
        return response()->json(compact('result'));
    }

    public function delete($result)
    {
        $result = Result::findOrFail($result);
        $result->delete();
        return response()->json([
            'code'      => '200_01'
        ]);
    }
}
