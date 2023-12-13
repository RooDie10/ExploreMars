<?php

try {
    $connect = new PDO("mysql:host=localhost:3306;dbname=exploring_mars", "root", "");
}
catch (PDOException $exception){
    die($exception);

}