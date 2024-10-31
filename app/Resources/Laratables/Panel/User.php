<?php

namespace App\Resources\Laratables\Panel;

use App\Resources\Laratables\Base;
use Illuminate\Database\Eloquent\Builder;

class User extends Base
{
    public static function laratablesQueryConditions($query)
    {

        $query = $query->addSelect([
            'users.*',
        ]);

        return $query;
    }
}