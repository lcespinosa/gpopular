<?php

namespace App\Http\Controllers;

use App\Models\Agency;
use App\Models\Functionary;
use Illuminate\Http\Request;

class FunctionaryController extends Controller
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
        $functionariesGropedByAgency = Agency::with('functionaries')
            ->get(['id', 'name']);

        return response()->json(compact('functionariesGropedByAgency'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'agency_id' => 'required|integer',
            'name'      => 'required|string|max:30',
        ]);

        $agency = Agency::findOrFail($request->agency_id);
        $functionary = new Functionary([
            'name'          => $request->name,
            'last_name'     => $request->last_name,
            'nick'          => $request->nick,
            'phones'        => $request->phones,
            'is_relevant'   => $request->is_relevant ?? false,
            'occupation'    => $request->occupation,
        ]);
        $agency->functionaries()->save($functionary);

        return response()->json(compact('functionary'));
    }

    public function update(Request $request, $functionary)
    {
        $functionary = Functionary::findOrFail($functionary);

        $this->validate($request, [
            'name'      => 'required|string|max:30',
            'is_relevant' => 'required',
        ]);

        $functionary->fill([
            'name'          => $request->name,
            'last_name'     => $request->last_name,
            'nick'          => $request->nick,
            'phones'        => $request->phones,
            'is_relevant'   => $request->is_relevant ?? false,
            'occupation'    => $request->occupation,
        ])->save();

        return response()->json(compact('functionary'));
    }

    public function show($functionary)
    {
        $functionary = Functionary::findOrFail($functionary);
        return response()->json(compact('functionary'));
    }

    public function delete($functionary)
    {
        $functionary = Functionary::findOrFail($functionary);
        $functionary->delete();
        return response()->json([
            'code'      => '200_01'
        ]);
    }
}
