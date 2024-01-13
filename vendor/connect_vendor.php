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

function get_user($id)
{
    global $connect;
    $query = "SELECT * FROM `user` WHERE `id` = ?";
    $statement = $connect->prepare($query);
    $statement->execute([$id]);
    $user = $statement->fetch(PDO::FETCH_ASSOC);
    return $user;
}
function get_tour_by_user($id)
{
    global $connect;
    $query= "SELECT * FROM `Levels` WHERE `id` = (SELECT `tour` FROM `user` WHERE `id` = ?)";
    $statement = $connect->prepare($query);
    $statement->execute([$id]);
    $tour = $statement->fetch(PDO::FETCH_ASSOC);
    return $tour;
}