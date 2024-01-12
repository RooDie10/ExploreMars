<?php

try {
    $connect = new PDO("mysql:host=localhost:3306;dbname=MarsExp", "root", "");
}
catch (PDOException $exception){
    die($exception);

}

function get_expedition_levels($id = null)
{
    global $connect;
$query = "SELECT * FROM `Levels`";
    if ($id) {
        $query .= " WHERE `id` = ?";
    }
    $statement = $connect->prepare($query);
    $statement->execute([$id]);
    $expedition_levels = $statement->fetchAll(PDO::FETCH_ASSOC);
    return $expedition_levels;
}

function included($included = '')
{
    return explode('; ', $included);
}