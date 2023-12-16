<?php
$connect = new PDO("mysql:host=localhost:3306;dbname=MarsExp", "root", "");

session_start();
$email = $_POST['email'];
$login    = $_POST['login'];
$password = $_POST['password'];

$query = "INSERT INTO `user`(id, mail, password, login, tour) VALUES (?, ?, ?, ?, ?)";
$statement = $connect->prepare($query);
$statement = $statement->execute([NULL, $email, $password, $login, '']);
$respone = [
    "message" => true,
    "data" => $statement,
    "statement" => $connect,
];
echo json_encode($respone);