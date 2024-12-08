<?php
// Memasukkan file koneksi database
include 'db_connection.php';

// Mengecek apakah metode request adalah POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validasi input data
    $produk_id = isset($_POST['produk_id']) ? (int)$_POST['produk_id'] : null;

    if ($produk_id) {
        // Mengambil nama file gambar untuk produk yang akan dihapus
        $getImageQuery = "SELECT produk_image FROM Produk WHERE produk_id = $produk_id";
        $result = $conn->query($getImageQuery);

        if ($result && $row = $result->fetch_assoc()) {
            $uploadDir = 'uploads/';
            $imagePath = $uploadDir . $row['produk_image'];

            // Hapus gambar jika ada
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }

            // Menghapus data produk dari database
            $deleteQuery = "DELETE FROM Produk WHERE produk_id = $produk_id";
            if ($conn->query($deleteQuery) === TRUE) {
                http_response_code(200);
                echo json_encode(["message" => "Product deleted successfully."]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Failed to delete product.", "details" => $conn->error]);
            }
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Product not found."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Invalid or missing product ID."]);
    }
} else {
    // Jika metode request bukan POST
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed."]);
}

// Menutup koneksi database
$conn->close();
?>
