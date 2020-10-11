<?php

namespace App\Http\Controllers;

use App\Models\CPopular;
use App\Models\Street;
use Illuminate\Http\Request;

class StreetController extends Controller
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
        $streetsGropedByCPopular = CPopular::with('streets')
            ->get(['id', 'name']);

        return response()->json(compact('streetsGropedByCPopular'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'cpopular_id' => 'required|integer',
            'name'      => 'required|string|max:100',
            'code'      => 'required|string|max:100|unique:streets',
        ]);

        $cpopular = CPopular::findOrFail($request->cpopular_id);
        $street = new Street([
            'name'              => $request->name,
            'code'              => $request->code,
        ]);
        if ($request->has('first_between_id')) {
            $street->first_between_id = $request->first_between_id;
        }
        if ($request->has('second_between_id')) {
            $street->second_between_id = $request->second_between_id;
        }

        $cpopular->streets()->save($street);

        return response()->json(compact('street'));
    }

    public function update(Request $request, $street)
    {
        $street = Street::findOrFail($street);

        $this->validate($request, [
            'name'      => 'required|string|max:100',
            'code'      => 'required|string|max:100|unique:streets,code,' . $street->id,
        ]);

        $street->fill([
            'name'              => $request->name,
            'code'              => $request->code,
        ]);
        if ($request->has('first_between_id')) {
            $street->first_between_id = $request->first_between_id;
        }
        if ($request->has('second_between_id')) {
            $street->second_between_id = $request->second_between_id;
        }
        $street->save();

        return response()->json(compact('street'));
    }

    public function show($street)
    {
        $street = Street::findOrFail($street);
        return response()->json(compact('street'));
    }

    public function contacts($street)
    {
        $street = Street::findOrFail($street);
        $street->load('addresses.contact');
        return response()->json(compact('street'));
    }

    public function delete($street)
    {
        $street = Street::findOrFail($street);
        $street->delete();
        return response()->json([
            'code'      => '200_01'
        ]);
    }
}
