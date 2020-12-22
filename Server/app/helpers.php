<?php

use App\Models\Quarter;
use App\Models\Year;
use Carbon\Carbon;

if (!function_exists('next_id')) {
function next_id($class, $padLength = 2) {
    $maxId = call_user_func($class . "::max", 'id');
    if (!empty($maxId)) {
        $maxCode = call_user_func($class . "::where", 'id', $maxId);
        $maxCode = (integer)$maxCode->first()->code;
    }
    else {
        $maxCode = 0;
    }
    $strId = str_pad($maxCode + 1, $padLength, '0', STR_PAD_LEFT);
    return $strId;
}
}

if (!function_exists('get_trimester')) {
function get_quarter(Carbon $date) {
    $year = Year::whereCode($date->year)->first();
    if (!$year) {
        $year = Year::create([
            'name'  => 'Año ' . $date->year,
            'code'  => $date->year
        ]);
    }

    $quarter = $year->quarters()->whereQuarter($date->quarter)->first();
    if (!$quarter) {
        $quarter = Quarter::create([
            'name'      => $date->startOfQuarter()->monthName . ' - ' . $date->endOfQuarter()->monthName,
            'code'      => $year->code . '/' . $date->quarter,
            'quarter'   => $date->quarter,
            'year_id'   => $year->id
        ]);
    }

    return $quarter;
}
}
