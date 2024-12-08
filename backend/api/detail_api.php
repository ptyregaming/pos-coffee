<?php
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

// CRUD untuk Detail (Read, Create, Update, Delete)
if ($action == "read") {
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    $query = $id ? "SELECT * FROM Detail WHERE detail_penjualan_id=$id" : "SELECT * FROM Detail";
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
    $query = "INSERT INTO Detail (penjualan_id, product_id, jumlah, subtotal) 
              VALUES ('{$data['penjualan_id']}', '{$data['product_id']}', '{$data['jumlah']}', '{$data['subtotal']}')";
    if ($conn->query($query)) {
        sendResponse("success", "Detail berhasil ditambahkan.");
    } else {
        sendResponse("error", $conn->error);
    }
} elseif ($action == "update") {
    $id = $_GET['id'];
    $data = json_decode(file_get_contents("php://input"), true);
    $query = "UPDATE Detail SET penjualan_id='{$data['penjualan_id']}', product_id='{$data['product_id']}', jumlah='{$data['jumlah']}', subtotal='{$data['subtotal']}' WHERE detail_penjualan_id=$id";
    if ($conn->query($query)) {
        sendResponse("success", "Detail berhasil diupdate.");
    } else {
        sendResponse("error", $conn->error);
    }
} elseif ($action == "delete") {
    $id = $_GET['id'];
    $query = "DELETE FROM Detail WHERE detail_penjualan_id=$id";
    if ($conn->query($query)) {
        sendResponse("success", "Detail berhasil dihapus.");
    } else {
        sendResponse("error", $conn->error);
    }
}

$conn->close();
?>
