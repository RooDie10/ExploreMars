<?php
session_start();
require_once "vendor/connect_vendor.php";
if (!isset($_SESSION['user'])) {
    header('Location: index.php');
    die();
}
$user = get_user($_SESSION['user']['id']);
$tour = get_tour_by_user($_SESSION['user']['id']);
?>


<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<?php require_once "modules/header.php"; ?>
<h1><?php
echo $user['login']; ?></h1>
<h3><?php echo $tour['description'] ?></h3>
<form action="/vendor/logout.php">
    <button type="submit">Logout</button>
</form>
<?php require_once "modules/modals.php"; ?>
<script src="main.js"></script>
</body>
</html>