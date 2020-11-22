<?php

namespace App\Http\Controllers;

use App\Models\Agency;
use Illuminate\Http\Request;

class AgencyController extends Controller
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
        $agencies = Agency::all(['id', 'name', 'code', 'description', 'phones']);

        return response()->json(compact('agencies'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name'      => 'required|string|max:50|unique:agencies',
        ]);

        $agency = new Agency([
            'name'              => $request->name,
            'code'              => next_id(Agency::class),
            'description'       => $request->description,
            'phones'            => $request->phones,
        ]);
        $agency->save();

        return response()->json($agency);
    }

    public function update(Request $request, $agency)
    {
        $agency = Agency::findOrFail($agency);

        $this->validate($request, [
            'name'      => 'required|string|max:50',
        ]);

        $agency->fill([
            'name'              => $request->name,
            'description'       => $request->description,
            'phones'            => $request->phones,
        ])->save();

        return response()->json($agency);
    }

    public function topics($agency)
    {
        $agency = Agency::findOrFail($agency);
        $agency->load('topics');
        $topics = $agency->topics;
        return response()->json(compact('topics'));
    }

    public function functionaries($agency)
    {
        $agency = Agency::findOrFail($agency);
        $agency->load('functionaries');
        $functionaries = $agency->functionaries;
        return response()->json(compact('functionaries'));
    }

    public function show($agency)
    {
        $agency = Agency::findOrFail($agency);
        return response()->json(compact('agency'));
    }

    public function delete($agency)
    {
        $agency = Agency::findOrFail($agency);
        $agency->delete();
        return response()->json([
            'code'      => '200_01'
        ]);
    }
}
