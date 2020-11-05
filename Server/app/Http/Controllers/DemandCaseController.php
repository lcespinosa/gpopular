<?php

namespace App\Http\Controllers;

use App\Models\DemandCase;
use Illuminate\Http\Request;

class DemandCaseController extends Controller
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
        $demand_cases = DemandCase::all(['id', 'name', 'code']);

        return response()->json(compact('demand_cases'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name'      => 'required|string|max:25|unique:demand_cases',
        ]);

        $demand_case = new DemandCase([
            'name'              => $request->name,
            'code'              => next_id(DemandCase::class),
        ]);
        $demand_case->save();

        return response()->json(compact('demand_case'));
    }

    public function update(Request $request, $demand_case)
    {
        $demand_case = DemandCase::findOrFail($demand_case);

        $this->validate($request, [
            'name'      => 'required|string|max:25',
        ]);

        $demand_case->fill([
            'name'              => $request->name,
        ])->save();

        return response()->json(compact('demand_case'));
    }

    public function show($demand_case)
    {
        $demand_case = DemandCase::findOrFail($demand_case);
        return response()->json(compact('demand_case'));
    }

    public function delete($demand_case)
    {
        $demand_case = DemandCase::findOrFail($demand_case);
        $demand_case->delete();
        return response()->json([
            'code'      => '200_01'
        ]);
    }
}
