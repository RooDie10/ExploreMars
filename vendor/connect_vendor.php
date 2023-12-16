<?php

try {
    $connect = new PDO("mysql:host=localhost:3306;dbname=MarsExp", "root", "");
}
catch (PDOException $exception){
    die($exception);

}