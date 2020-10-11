<?php

namespace App\Http\Controllers;

use App\Models\ReasonType;
use Illuminate\Http\Request;

class ReasonTypeController extends Controller
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
        $reason_types = ReasonType::all(['id', 'name']);

        return response()->json(compact('reason_types'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name'      => 'required|string|max:25',
            'code'      => 'required|string|max:25|unique:reason_types',
        ]);

        $reason_type = new ReasonType([
            'name'              => $request->name,
            'code'              => $request->code,
        ]);
        $reason_type->save();

        return response()->json(compact('reason_type'));
    }

    public function update(Request $request, $reason_type)
    {
        $reason_type = ReasonType::findOrFail($reason_type);

        $this->validate($request, [
            'name'      => 'required|string|max:25',
            'code'      => 'required|string|max:25|unique:reason_types,code,' . $reason_type->id,
        ]);

        $reason_type->fill([
            'name'              => $request->name,
            'code'              => $request->code,
        ])->save();

        return response()->json(compact('reason_type'));
    }

    public function show($reason_type)
    {
        $reason_type = ReasonType::findOrFail($reason_type);
        return response()->json(compact('reason_type'));
    }

    public function delete($reason_type)
    {
        $reason_type = ReasonType::findOrFail($reason_type);
        $reason_type->delete();
        return response()->json([
            'code'      => '200_01'
        ]);
    }
}
