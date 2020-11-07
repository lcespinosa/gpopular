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

    public function index(Request $request)
    {
        $streets = Street::query()
            ->with(['cpopular', 'first_between_street', 'second_between_street']);
        if ($request->has('cpopular_id') && !empty($request->cpopular_id)) {
            $streets = $streets->where('cpopular_id', $request->cpopular_id);
        }
        $streets = $streets->get();

        return response()->json(compact('streets'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'cpopular_id' => 'required',
            'name'      => 'required|string|max:100|unique:streets',
        ]);

        if (filter_var($request->cpopular_id, FILTER_VALIDATE_INT) !== false) {
            $cpopular = CPopular::findOrFail($request->cpopular_id);
        }
        else {
            $cpopular = CPopular::whereName($request->cpopular_id)->first();
            if (!$cpopular) {
                $cpopular = CPopular::create([
                    'name'  => $request->cpopular_id,
                    'code'  => next_id(CPopular::class)
                ]);
            }
        }
        $street = new Street([
            'name'              => $request->name,
        ]);
        if ($request->has('first_between_id')) {
            if (filter_var($request->first_between_id, FILTER_VALIDATE_INT) !== false) {
                $fstreet = Street::findOrFail($request->first_between_id);
            }
            else {
                $fstreet = Street::whereName($request->first_between_id)->first();
                if (!$fstreet) {
                    $fstreet = Street::create([
                        'name'  => $request->first_between_id,
                        'code'  => next_id(Street::class),
                        'cpopular_id' => $cpopular->id,
                    ]);
                }
            }
            $street->first_between_id = $fstreet->id;
        }
        if ($request->has('second_between_id')) {
            if ($request->has('second_between_id')) {
                if (filter_var($request->second_between_id, FILTER_VALIDATE_INT) !== false) {
                    $sstreet = Street::findOrFail($request->second_between_id);
                }
                else {
                    $sstreet = Street::whereName($request->second_between_id)->first();
                    if (!$sstreet) {
                        $sstreet = Street::create([
                            'name'  => $request->second_between_id,
                            'code'  => next_id(Street::class),
                            'cpopular_id' => $cpopular->id,
                        ]);
                    }
                }
                $street->second_between_id = $sstreet->id;
            }
        }

        $street->code = next_id(Street::class);
        $cpopular->streets()->save($street);

        return response()->json(compact('street'));
    }

    public function update(Request $request, $street)
    {
        $street = Street::findOrFail($street);

        $this->validate($request, [
            'cpopular_id' => 'required',
            'name'      => 'required|string|max:100',
        ]);

        if (filter_var($request->cpopular_id, FILTER_VALIDATE_INT) !== false) {
            $cpopular = CPopular::findOrFail($request->cpopular_id);
        }
        else {
            $cpopular = CPopular::whereName($request->cpopular_id)->first();
            if (!$cpopular) {
                $cpopular = CPopular::create([
                    'name'  => $request->cpopular_id,
                    'code'  => next_id(CPopular::class)
                ]);
            }
        }

        if ($request->has('first_between_id')) {
            if (filter_var($request->first_between_id, FILTER_VALIDATE_INT) !== false) {
                $fstreet = Street::findOrFail($request->first_between_id);
            }
            else {
                $fstreet = Street::whereName($request->first_between_id)->first();
                if (!$fstreet) {
                    $fstreet = Street::create([
                        'name'  => $request->first_between_id,
                        'code'  => next_id(Street::class),
                        'cpopular_id' => $cpopular->id,
                    ]);
                }
            }
            $street->first_between_id = $fstreet->id;
        }
        if ($request->has('second_between_id')) {
            if ($request->has('second_between_id')) {
                if (filter_var($request->second_between_id, FILTER_VALIDATE_INT) !== false) {
                    $sstreet = Street::findOrFail($request->second_between_id);
                }
                else {
                    $sstreet = Street::whereName($request->second_between_id)->first();
                    if (!$sstreet) {
                        $sstreet = Street::create([
                            'name'  => $request->second_between_id,
                            'code'  => next_id(Street::class),
                            'cpopular_id' => $cpopular->id,
                        ]);
                    }
                }
                $street->second_between_id = $sstreet->id;
            }
        }

        $street->fill([
            'name'              => $request->name,
        ]);

        $cpopular->streets()->save($street);

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
