<?php
session_start();
require_once "connect_vendor.php";
$tour_id = $_POST['tour_id'];
$user_id = $_SESSION['user']['id'];
$query = "UPDATE `user` SET `tour` = ? WHERE `id` = ?";
$query = $connect->prepare($query);
$query->execute([$tour_id, $user_id]);
$response = [
    'status' => true,
    'message' => 'Tour successfully bought'
];
echo json_encode($response);