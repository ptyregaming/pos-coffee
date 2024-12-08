2<?php
// Mengimpor koneksi database
include 'db_connection.php';

header("Access-Control-Allow-Origin: *"); // Izinkan semua origin
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Metode HTTP yang diizinkan
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Header yang diizinkan
header("Access-Control-Allow-Credentials: true"); // Jika Anda menggunakan credentials seperti cookie
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

$action = isset($_GET['action']) ? $_GET['action'] : null;

function sendResponse($status, $data) {
    header("Content-Type: application/json");
    echo json_encode(["status" => $status, "data" => $data]);
    exit;
}

// CRUD untuk Penjualan (Read, Create, Update, Delete)
if ($action == "read") {
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    $query = $id ? "SELECT * FROM Penjualan WHERE penjualan_id=$id" : "SELECT * FROM Penjualan";
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
    $query = "INSERT INTO Penjualan (user_id, tanggal_pembelian, total, metode) 
              VALUES ('{$data['user_id']}', '{$data['tanggal_pembelian']}', '{$data['total']}', '{$data['metode']}')";
    if ($conn->query($query)) {
        sendResponse("success", "Penjualan berhasil ditambahkan.");
    } else {
        sendResponse("error", $conn->error);
    }
} elseif ($action == "update") {
    $id = $_GET['id'];
    $data = json_decode(file_get_contents("php://input"), true);
    $query = "UPDATE Penjualan SET user_id='{$data['user_id']}', tanggal_pembelian='{$data['tanggal_pembelian']}', total='{$data['total']}', metode='{$data['metode']}' WHERE penjualan_id=$id";
    if ($conn->query($query)) {
        sendResponse("success", "Penjualan berhasil diupdate.");
    } else {
        sendResponse("error", $conn->error);
    }
} elseif ($action == "delete") {
    $id = $_GET['id'];
    $query = "DELETE FROM Penjualan WHERE penjualan_id=$id";
    if ($conn->query($query)) {
        sendResponse("success", "Penjualan berhasil dihapus.");
    } else {
        sendResponse("error", $conn->error);
    }
}

$conn->close();
?>
