<?php

namespace App\Http\Controllers;

use App\Models\CPopular;
use Illuminate\Http\Request;

class CPopularController extends Controller
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
        $cpopulars = CPopular::all(['id', 'name']);

        return response()->json(compact('cpopulars'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name'      => 'required|string|max:25',
            'code'      => 'required|string|max:25|unique:cpopulars',
        ]);

        $cpopular = new CPopular([
            'name'              => $request->name,
            'code'              => $request->code,
        ]);
        $cpopular->save();

        return response()->json(compact('cpopular'));
    }

    public function update(Request $request, $cpopular)
    {
        $cpopular = CPopular::findOrFail($cpopular);

        $this->validate($request, [
            'name'      => 'required|string|max:25',
            'code'      => 'required|string|max:25|unique:cpopulars,code,' . $cpopular->id,
        ]);

        $cpopular->fill([
            'name'              => $request->name,
            'code'              => $request->code,
        ])->save();

        return response()->json(compact('cpopular'));
    }

    public function show($cpopular)
    {
        $cpopular = CPopular::findOrFail($cpopular);
        return response()->json(compact('cpopular'));
    }

    public function delete($cpopular)
    {
        $cpopular = CPopular::findOrFail($cpopular);
        $cpopular->delete();
        return response()->json([
            'code'      => '200_01'
        ]);
    }
}