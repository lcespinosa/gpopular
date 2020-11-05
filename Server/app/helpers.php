<?php

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