<?php
// db_connection.php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "coffee";

// Koneksi ke database
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}
?>
