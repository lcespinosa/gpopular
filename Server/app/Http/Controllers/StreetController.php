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
        $streets = Street::with(['cpopular', 'first_between_street', 'second_between_street'])
            ->get();

        return response()->json(compact('streets'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'cpopular_id' => 'required|integer',
            'name'      => 'required|string|max:100|unique:streets',
        ]);

        $cpopular = CPopular::findOrFail($request->cpopular_id);
        $street = new Street([
            'name'              => $request->name,
            'code'              => next_id(Street::class),
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
        ]);

        $street->fill([
            'name'              => $request->name,
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
