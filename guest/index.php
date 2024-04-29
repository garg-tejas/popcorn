<?php
session_start();
if (isset($_SESSION['user_id'])) {
    header('location: ../user/index.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Welcome to PopCorn</title>
    <link rel="stylesheet" href="../css/index.css">
    <link href='https://fonts.googleapis.com/css?family=Arimo' rel='stylesheet'>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

</head>

<body>
    <nav class="navbar navbar-expand-sm bg-secondary navbar-dark fixed-top">
        <a class="navbar-brand" href="../index.php">
            <img src="../image/icon.png" alt="logo" height="80px">
        </a>
        <ul class="navbar-nav ms-auto">
            <li class="nav-item">
                <a class="nav-link active" href="#">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../signup.php">Browse Movies</a>
            </li>
            <!-- <li class="nav-item">
                <a class="nav-link" href="../login.php">Log In</a>
            </li> -->
        </ul>
    </nav>


    <header>
        <div id="demo" class="carousel slide container" data-ride="carousel">
            <div class="ratedMoviesHead">
                <h1>Top Rated Movies</h1>
            </div>
            <ul class="carousel-indicators">
                <li data-target="#demo" data-slide-to="0" class="active"></li>
                <li data-target="#demo" data-slide-to="1"></li>
                <li data-target="#demo" data-slide-to="2"></li>
                <li data-target="#demo" data-slide-to="3"></li>
                <li data-target="#demo" data-slide-to="4"></li>
            </ul>

            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div id="topMovies1" class="row"></div>
                </div>
                <div class="carousel-item">
                    <div id="topMovies2" class="row"></div>
                </div>
                <div class="carousel-item">
                    <div id="topMovies3" class="row"></div>
                </div>
                <div class="carousel-item">
                    <div id="topMovies4" class="row"></div>
                </div>
                <div class="carousel-item">
                    <div id="topMovies5" class="row"></div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#demo" data-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </a>
            <a class="carousel-control-next" href="#demo" data-slide="next">
                <span class="carousel-control-next-icon"></span>
            </a>
        </div>
        <center>
            <div class="container">
                <a href="../login.php" class="btn-main btn-main-primary">
                    Log In
                </a>
                <a href="../signup.php" class="btn-main">
                    Sign Up
                </a>
            </div>
        </center>
    </header>

    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

    <!-- Popper JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>

    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="../js/main.js"></script>
    <script>
        getTopMovies();
    </script>
</body>

</html>