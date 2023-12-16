<?php
require_once "connect_vendor.php";

session_start();
$login = $_POST['login'];
$password = $_POST['password'];

$query = "SELECT * FROM `user` WHERE `login` = ? AND `password` = ?";

$statement = $connect->prepare($query);
$statement->execute([$login, $password]);
$user = $statement->fetch(PDO::FETCH_ASSOC);

if (sizeof($user) > 1) {
    $response = [
        "message" => true,
        "random" => sizeof($user),
    ];
    echo json_encode($response);
    die();
} else {
    $_SESSION['user'] = $user;
    $response = [
        "message" => false,
        "random" => sizeof($user),
    ];
    echo json_encode($response);
}