<?php
session_start();
require_once "vendor/connect_vendor.php";
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Expedition</title>
    <style>
        .gallery img {
            flex-wrap: nowrap;
            max-width: 100%;
            justify-content: flex-start;
            height: auto;
            max-height: 200px;
        }
    </style>
</head>
<body>
<header>
    <h1>Mars Exploration</h1>
</header>

<nav>
    <a href="#">Main</a>
    <a href="#">Profile</a>
    <a href="#">About Exploration</a>
</nav>
<h2>Welcome to our Mars Exploration tour!</h2>
<p>Here you'll find a brief description of our amazing expedition along with a photo gallery for your enjoyment.</p>
<p>Our tour is divided into 3 levels:</p>
<?php
 $levels = get_expedition_levels();
foreach ($levels as $item):
?>
<section>

<div>
    <h3><?= $item['type']?></h3>
    <p>$ <?=$item['price']?></p>
    <p><?= $item['description']?></p>
    <img height="200" src="<?= $item['image']?>" alt="Expedition image">
    <ul><?php
        $included = included($item['included']);
        foreach ($included as $include):
            ?>
            <li><?= $include ?></li>
        <?php endforeach; ?>
         </ul>
<form>
    <button type="submit">Buy</button>
</form>
</div>
</section>
<?php endforeach; ?>
<div class="gallery">
    <h2>Photo Gallery</h2>
    <img src="Gallery/image1.jpg" alt="Photo 1">
    <img src="Gallery/image2.jpg" alt="Photo 2">
    <img src="Gallery/image3.png" alt="Photo 3">
</div>
</body>
</html>