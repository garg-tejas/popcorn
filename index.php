<?php
session_start();
if (!isset($_SESSION['username'])) {
    header('location: guest/index.php');
} else {
    header('location: user/index.php');
}
