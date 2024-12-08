<?php

// Mengizinkan permintaan dari asal tertentu
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Menangani preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Memasukkan file koneksi database
include 'db_connection.php';

// Mengecek apakah metode request adalah POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Mengambil data JSON dari request body
    $input = json_decode(file_get_contents('php://input'), true);

    $user_id = isset($input['user_id']) ? (int)$input['user_id'] : null;
    $metode = isset($input['metode']) ? $conn->real_escape_string($input['metode']) : null;
    $orders = isset($input['orders']) ? $input['orders'] : null;
    $total = isset($input['total']) ? (float)$input['total'] : null;

    if ($user_id && $metode && $orders && $total) {
        $tanggal_pembelian = date('Y-m-d');

        // Memulai transaksi
        $conn->begin_transaction();

        try {
            // Insert ke tabel Penjualan
            $queryPenjualan = "
                INSERT INTO coffee.Penjualan (user_id, tanggal_pembelian, total, metode)
                VALUES ('$user_id', '$tanggal_pembelian', '$total', '$metode')
            ";
            if (!$conn->query($queryPenjualan)) {
                throw new Exception("Gagal menyisipkan data ke tabel Penjualan: " . $conn->error);
            }

            // Mendapatkan ID penjualan terakhir
            $penjualan_id = $conn->insert_id;

            // Insert ke tabel Detail
            foreach ($orders as $order) {
                $product_id = (int)$order['product_id'];
                $jumlah = (int)$order['quantity'];
                $subtotal = (float)$order['subtotal'];

                $queryDetail = "
                    INSERT INTO coffee.Detail (penjualan_id, product_id, jumlah, subtotal)
                    VALUES ('$penjualan_id', '$product_id', '$jumlah', '$subtotal')
                ";
                if (!$conn->query($queryDetail)) {
                    throw new Exception("Gagal menyisipkan data ke tabel Detail: " . $conn->error);
                }
            }

            // Commit transaksi
            $conn->commit();

            // Respon berhasil
            http_response_code(201);
            echo json_encode(["message" => "Data berhasil disimpan.", "penjualan_id" => $penjualan_id]);
        } catch (Exception $e) {
            $conn->rollback();
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Data tidak lengkap."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Metode request tidak diizinkan."]);
}

$conn->close();
?>

