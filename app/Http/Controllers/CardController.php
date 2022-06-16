<?php

namespace App\Http\Controllers;

use App\Http\Requests\CardRequest;
use App\Models\Card;
use Illuminate\Http\Request;

class CardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            return response()->json([
                'buffer'    => Auth()->user()->buffer,
                'working'   => Auth()->user()->working,
                'done'      => Auth()->user()->done,
                'archived'  => Auth()->user()->archived
            ],200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Unexpected error, our devs have been notified.'
            ],500);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CardRequest $request)
    {
        try {
            $newCard                = new Card;
            $newCard->user_id       = Auth()->user()->id;
            $newCard->description   = $request->description;
            $newCard->stage         = $request->stage;
            $newCard->estimation_at = $request->estimation_at;
            $newCard->delivery_at   = $request->delivery_at ? $request->delivery_at : null;
            $newCard->save();

            return response()->json([
                'message' => 'Card created successfully'
            ],200);

        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Unexpected error, our devs have been notified.'
            ],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CardRequest $request, $id)
    {
        try {
            $editCard = Card::withTrashed()->find($id);
            $editCard->user_id       = Auth()->user()->id;
            $editCard->description   = $request->description;
            $editCard->stage         = $request->stage;
            $editCard->estimation_at = $request->estimation_at;
            $editCard->delivery_at   = $request->delivery_at ? $request->delivery_at : null;
            if($editCard->deleted_at===null){
                $editCard->save();
            }else{
                $editCard->restore();
            }

            return response()->json([
                'message' => 'Card updated successfully'
            ],200);

        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Unexpected error, our devs have been notified.'
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            Card::destroy($id);

            return response()->json([
                'message' => 'Card eliminated successfully'
            ],200);

        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Unexpected error, our devs have been notified.'
            ],500);
        }
    }
}
