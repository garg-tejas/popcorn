<?php
session_start();
include('connectdb.php');

$login = $_POST['login'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE (username = '$login' OR email = '$login') AND password = '$password'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);

if ($row) {

    $_SESSION['user_id'] = $row['id'];
    $_SESSION['username'] = $row['username'];

    header('Location: ../user/index.php');
    exit();
} else {
    header('location: ../guest/index.php');
}
$conn->close();
