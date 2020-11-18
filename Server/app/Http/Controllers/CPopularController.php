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
        $cpopulars = CPopular::all(['id', 'name', 'code']);

        return response()->json(compact('cpopulars'));
    }

    public function streets($cpopular)
    {
        $cpopular = CPopular::findOrFail($cpopular);
        $streets = $cpopular->streets;
        return response()->json(compact('streets'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name'      => 'required|string|max:25|unique:cpopulars',
        ]);

        $cpopular = new CPopular([
            'name'              => $request->name,
            'code'              => next_id(CPopular::class),
        ]);
        $cpopular->save();

        return response()->json($cpopular);
    }

    public function update(Request $request, $cpopular)
    {
        $cpopular = CPopular::findOrFail($cpopular);

        $this->validate($request, [
            'name'      => 'required|string|max:25',
        ]);

        $cpopular->fill([
            'name'              => $request->name,
        ])->save();

        return response()->json($cpopular);
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
