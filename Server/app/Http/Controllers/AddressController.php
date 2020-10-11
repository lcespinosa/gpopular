<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Contact;
use Illuminate\Http\Request;

class AddressController extends Controller
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
        $addresses = Address::with(['contact', 'street'])
            ->get();

        return response()->json(compact('addresses'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'street_id'     => 'required|integer|exist:streets,id',
            'contact_id'    => 'required|integer',
        ]);

        $contact = Contact::findOrFail($request->contact_id);

        $address = new Address([
            'building'      => $request->building,
            'apartment'     => $request->apartment,
            'number'        => $request->number,
            'active'        => $request->active ?? true,
            'street_id'     => $request->street_id
        ]);
        $contact->address()->save($address);

        return response()->json(compact('address'));
    }

    public function update(Request $request, $address)
    {
        $address = Address::findOrFail($address);

        $address->fill([
            'building'      => $request->building,
            'apartment'     => $request->apartment,
            'number'        => $request->number,
            'active'        => $request->active ?? true,
        ])->save();

        return response()->json(compact('address'));
    }

    public function show($address)
    {
        $address = Address::findOrFail($address);
        return response()->json(compact('address'));
    }

    public function delete($address)
    {
        $address = Address::findOrFail($address);
        $address->delete();
        return response()->json([
            'code'      => '200_01'
        ]);
    }
}
