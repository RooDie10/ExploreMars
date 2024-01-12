<?php
session_start();
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Exploring Mars</title>
</head>
<body>
<button id="sign-in-button">
    Sign in
</button>
<form action="expedition.php">
    <button type="submit">
        About expedition
    </button>
</form>
<dialog id="login">
    <form id="login-form">
        <input placeholder="Username or E-mail" type="text" name="login">
        <input placeholder="Password" type="password" name="password">
        <button type="submit">Submit</button>
    </form>
    <button id="registration-button">Registration</button>
</dialog>
<dialog id="signup">
    <form id="signup-form">
        <input placeholder="Username" type="text" name="login">
        <input placeholder="E-mail" type="text" name="email">
        <input placeholder="Password" type="password" name="password">
        <button type="submit">Submit</button>
    </form>
    <button id="login-button">Login</button>
</dialog>

<script src="main.js"></script>
</body>
</html>