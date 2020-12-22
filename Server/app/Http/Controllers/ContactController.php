<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Contact;
use App\Models\CPopular;
use App\Models\Street;
use App\Scopes\NotAnonymous;
use Illuminate\Http\Request;

class ContactController extends Controller
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
        $contacts = Contact::with(['address', 'address.street', 'address.street.cpopular'])
            ->get();

        return response()->json(compact('contacts'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name'      => 'required|string|max:50',
//            'street_id' => 'required',
            'cpopular_id' => 'required',
        ]);

        $contact = new Contact([
            'name'              => $request->name,
            'last_name'         => $request->last_name,
            'phones'            => $request->phones,
            'anonymous'         => false,
        ]);
        $contact->save();

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
        if ($request->has('street_id') && !empty($request->street_id)) {
            if (filter_var($request->street_id, FILTER_VALIDATE_INT) !== false) {
                $street = Street::findOrFail($request->street_id);
            } else {
                $street = Street::whereName($request->street_id)->first();
                if (!$street) {
                    $street = Street::create([
                        'name' => $request->street_id,
                        'code' => next_id(Street::class),
                        'cpopular_id' => $cpopular->id
                    ]);
                }
            }
        }
        else {
            $street = Street::create([
                'name' => $cpopular->name . ' desconocida',
                'code' => next_id(Street::class),
                'cpopular_id' => $cpopular->id
            ]);
        }

        $address = new Address([
            'building'  => $request->address['building'],
            'apartment' => $request->address['apartment'],
            'number'    => $request->address['number'],

            'active'    => true,

            'street_id' => $street->id
        ]);
        $contact->address()->save($address);

        return response()->json(compact('contact'));
    }

    public function update(Request $request, $contact)
    {
        $contact = Contact::findOrFail($contact);

        $this->validate($request, [
            'name'      => 'required|string|max:50',
            'street_id' => 'required',
            'cpopular_id' => 'required',
        ]);

        $contact->fill([
            'name'              => $request->name,
            'last_name'         => $request->last_name,
            'phones'            => $request->phones,
            'anonymous'         => false,
        ])->save();

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
        if ($request->has('street_id') && !empty($request->street_id)) {
            if (filter_var($request->street_id, FILTER_VALIDATE_INT) !== false) {
                $street = Street::findOrFail($request->street_id);
            } else {
                $street = Street::whereName($request->street_id)->first();
                if (!$street) {
                    $street = Street::create([
                        'name' => $request->street_id,
                        'code' => next_id(Street::class),
                        'cpopular_id' => $cpopular->id
                    ]);
                }
            }
        }
        else {
            $street = $cpopular->streets()->first();
        }

        if (isset($street)) {
            $address = $contact->address;
            if ($address) {
                $address->fill([
                    'building'  => $request->address['building'],
                    'apartment' => $request->address['apartment'],
                    'number'    => $request->address['number'],

                    'street_id' => $street->id
                ]);
            }
            else {
                $address = new Address([
                    'building'  => $request->address['building'],
                    'apartment' => $request->address['apartment'],
                    'number'    => $request->address['number'],

                    'active'    => true,

                    'street_id' => $street->id
                ]);
            }
            $contact->address()->save($address);
        }

        return response()->json(compact('contact'));
    }

    public function show($contact)
    {
        $contact = Contact::findOrFail($contact);
        return response()->json(compact('contact'));
    }

    public function anonymous()
    {
        $contact = Contact::whithoutScope(NotAnonymous::class)
            ->whereAnonymous(true)
            ->first();
        return response()->json(compact('contact'));
    }

    public function delete($contact)
    {
        $contact = Contact::findOrFail($contact);
        $contact->delete();
        return response()->json([
            'code'      => '200_01'
        ]);
    }
}
