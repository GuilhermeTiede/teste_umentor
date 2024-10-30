<?php

namespace App\Resources\Laratables;

use App\Resources\Base;
use Illuminate\Database\Eloquent\Builder;

class User extends Base
{
    /**
     * @param $query
     * @return Builder|mixed
     */
    public static function laratablesQueryConditions($query): mixed
    {
        $query = $query->addSelect([
            'users.*',
        ]);

        $query = static::applyColumnFilters($query);

        return $query;
    }
}