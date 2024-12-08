<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include 'db_connection.php';

// Handle OPTIONS request for CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Parse JSON input
    $data = json_decode(file_get_contents('php://input'), true);
    $penjualan_id = $data['penjualan_id'] ?? null;
    $user_id = $data['user_id'] ?? null;
    $tanggal_pembelian = $data['tanggal_pembelian'] ?? null;
    $total = $data['total'] ?? null;
    $metode = $data['metode'] ?? null;

    // Validate input
    if ($penjualan_id && $user_id && $tanggal_pembelian && $total && $metode) {
        $query = "
            INSERT INTO Penjualan (penjualan_id, user_id, tanggal_pembelian, total, metode)
            VALUES ($penjualan_id, $user_id, '$tanggal_pembelian', $total, '$metode')
        ";

        if ($conn->query($query) === TRUE) {
            http_response_code(201);
            echo json_encode([
                "message" => "Data berhasil ditambahkan.",
                "penjualan_id" => $penjualan_id
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "error" => "Gagal menambahkan data.",
                "details" => $conn->error
            ]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Data tidak lengkap atau format salah."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed."]);
}

$conn->close();
?>

