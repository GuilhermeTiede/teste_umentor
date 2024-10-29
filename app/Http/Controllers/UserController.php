<?php

namespace App\Http\Controllers;

use App\Models\Panel\Assistance\Attendment;
use App\Models\Panel\Assistance\AttendmentAnnotation;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{

    public function index(): Response
    {
        return Inertia::render('Users/List', [
            'users' => User::all()
        ]);
    }
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Users/Edit');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('users.index')->with('success', 'Usuário Criado.');


    }

    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', [
            'user' => $user
        ]);
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class . ',email,' . $user->id,
        ]);

        $user->update($request->all());

        return redirect()->route('users.index')->with('success', 'Usuário Atualizado.');
    }

    /**
     * @param User $user
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function destroy(User $user)
    {
        if ($this->isCurrentUser($user)) {
            return response()->json(['error' => 'Você não pode excluir a si mesmo.'], 403);
        }

        return response()->json([
            'success' => 'Usuário excluído com sucesso.',
             'status' => $user->delete(),
        ]);
    }

    private function isCurrentUser(User $user): bool
    {
        return auth()->user()->id === $user->id;
    }

}