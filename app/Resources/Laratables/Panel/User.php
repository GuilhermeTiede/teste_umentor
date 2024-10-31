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

        $query = static::applyColumnFilters($query);

        return $query;
    }

    public static function laratablesFilterName(Builder $query, $searchValue)
    {
       $query =  $query->where('users.name', 'LIKE', "{$searchValue}%");

       return $query;
    }

    public static function laratablesFilterEmail(Builder $query, $searchValue)
    {
        return $query->where('users.email', 'LIKE', "{$searchValue}%");
    }

}