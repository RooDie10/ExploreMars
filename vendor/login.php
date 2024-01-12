<?php
require_once "connect_vendor.php";

session_start();
$login = $_POST['login'];
$password = $_POST['password'];

$query = "SELECT * FROM `user` WHERE (`login` = ? OR `mail` = ?) AND `password` = ?";

$statement = $connect->prepare($query);
$statement->execute([$login, $login, $password]);
$user = $statement->fetch(PDO::FETCH_ASSOC);

if (sizeof($user) > 1) {
    $_SESSION['user'] = $user;
    $response = [
        "message" => true,
        ];
    echo json_encode($response);
    die();
} else {
    $response = [
        "message" => false,
    ];
    echo json_encode($response);
    die();
}