<?php

header("Access-Control-Allow-Origin: *"); // Izinkan semua origin
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Metode HTTP yang diizinkan
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Header yang diizinkan
header("Access-Control-Allow-Credentials: true"); // Jika Anda menggunakan credentials seperti cookie
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Mengimpor koneksi database
include 'db_connection.php';

$action = isset($_GET['action']) ? $_GET['action'] : null;

function sendResponse($status, $data) {
    header("Content-Type: application/json");
    echo json_encode(["status" => $status, "data" => $data]);
    exit;
}

// CRUD untuk Kategori (Read, Create, Update, Delete)
if ($action == "read") {
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    $query = $id ? "SELECT * FROM Kategori WHERE kategori_id=$id" : "SELECT * FROM Kategori";
    $result = $conn->query($query);
    if ($result->num_rows > 0) {
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        sendResponse("success", $data);
    } else {
        sendResponse("error", "Data tidak ditemukan.");
    }
} elseif ($action == "create") {
    $data = json_decode(file_get_contents("php://input"), true);
    $query = "INSERT INTO Kategori (kategori_nama) VALUES ('{$data['kategori_nama']}')";
    if ($conn->query($query)) {
        sendResponse("success", "Kategori berhasil ditambahkan.");
    } else {
        sendResponse("error", $conn->error);
    }
} elseif ($action == "update") {
    $id = $_GET['id'];
    $data = json_decode(file_get_contents("php://input"), true);
    $query = "UPDATE Kategori SET kategori_nama='{$data['kategori_nama']}' WHERE kategori_id=$id";
    if ($conn->query($query)) {
        sendResponse("success", "Kategori berhasil diupdate.");
    } else {
        sendResponse("error", $conn->error);
    }
} elseif ($action == "delete") {
    $id = $_GET['id'];
    $query = "DELETE FROM Kategori WHERE kategori_id=$id";
    if ($conn->query($query)) {
        sendResponse("success", "Kategori berhasil dihapus.");
    } else {
        sendResponse("error", $conn->error);
    }
}

$conn->close();
?>
