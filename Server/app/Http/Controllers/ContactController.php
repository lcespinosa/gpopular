<?php

namespace App\Http\Controllers;

use App\Models\Contact;
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
        $contacts = Contact::all(['id', 'name', 'last_name']);

        return response()->json(compact('contacts'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name'      => 'required|string|max:50',
        ]);

        $contact = new Contact([
            'name'              => $request->name,
            'last_name'         => $request->last_name,
            'phones'            => $request->phones,
            'anonymous'         => false,
        ]);
        $contact->save();

        return response()->json(compact('contact'));
    }

    public function update(Request $request, $contact)
    {
        $contact = Contact::findOrFail($contact);

        $this->validate($request, [
            'name'      => 'required|string|max:50',
        ]);

        $contact->fill([
            'name'              => $request->name,
            'last_name'         => $request->last_name,
            'phones'            => $request->phones,
            'anonymous'         => false,
        ])->save();

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
