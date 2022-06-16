<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CardRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules['description']   = 'required';
        $rules['estimation_at'] = 'required';

        return $rules;
    }

    public function messages()
    {
        return[
            'description.required'      => 'El campo descripción es obligatorio',
            'estimation_at.required'    => 'El campo estimación es obligatorio',
        ];
    }
}
