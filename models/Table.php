<?php

namespace Model;

class Table {
    protected $table = "";
    protected $columns = [];

    protected static $db;

    public static function setDB($db){
        self::$db = $db;
    }
}
