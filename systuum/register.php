<?php
session_start();

include('connectdb.php');
echo "Connection Successful";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    $genres = isset($_POST['genres_string']) ? $_POST['genres_string'] : "";

    if ($password !== $confirm_password) {
        echo "Password and confirm password do not match.";
        exit();
    }

    $sql = "INSERT INTO users (name, username, email, password, genres) VALUES (?, ?, ?, ?, ?)";
    $stmt = mysqli_prepare($conn, $sql);

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "sssss", $name, $username, $email, $password, $genres);
        if (mysqli_stmt_execute($stmt)) {
            $user_id = mysqli_insert_id($conn);
            $_SESSION['user_id'] = $user_id;
            header("Location: ../user/index.php");

            exit();
        } else {
            echo "Error: " . mysqli_error($conn);
        }
    } else {
        echo "Error: " . mysqli_error($conn);
    }
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
}
