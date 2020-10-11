<?php

namespace App\Http\Controllers;

use App\Models\Type;
use Illuminate\Http\Request;

class TypeController extends Controller
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
        $types = Type::all(['id', 'name']);

        return response()->json(compact('types'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name'      => 'required|string|max:25',
            'code'      => 'required|string|max:25|unique:types',
        ]);

        $type = new Type([
            'name'              => $request->name,
            'code'              => $request->code,
        ]);
        $type->save();

        return response()->json(compact('type'));
    }

    public function update(Request $request, $type)
    {
        $type = Type::findOrFail($type);

        $this->validate($request, [
            'name'      => 'required|string|max:25',
            'code'      => 'required|string|max:25|unique:types,code,' . $type->id,
        ]);

        $type->fill([
            'name'              => $request->name,
            'code'              => $request->code,
        ])->save();

        return response()->json(compact('type'));
    }

    public function show($type)
    {
        $type = Type::findOrFail($type);
        return response()->json(compact('type'));
    }

    public function delete($type)
    {
        $type = Type::findOrFail($type);
        $type->delete();
        return response()->json([
            'code'      => '200_01'
        ]);
    }
}
