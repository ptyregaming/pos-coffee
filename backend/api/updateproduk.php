<?php
// Memasukkan file koneksi database
include 'db_connection.php';

// Mengecek apakah metode request adalah POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validasi input data
    $produk_id = isset($_POST['produk_id']) ? (int)$_POST['produk_id'] : null;
    $produk_judul = isset($_POST['produk_judul']) ? $conn->real_escape_string($_POST['produk_judul']) : null;
    $produk_harga = isset($_POST['produk_harga']) ? $conn->real_escape_string($_POST['produk_harga']) : null;
    $produk_deskripsi = isset($_POST['produk_deskripsi']) ? $conn->real_escape_string($_POST['produk_deskripsi']) : null;
    $stok = isset($_POST['stok']) ? (int)$_POST['stok'] : null;
    $kategori_id = isset($_POST['kategori_id']) ? (int)$_POST['kategori_id'] : null;

    if ($produk_id && $produk_judul && $produk_harga && $produk_deskripsi && $stok !== null && $kategori_id) {
        // Mengecek apakah file gambar baru diunggah
        if (isset($_FILES['produk_image']) && $_FILES['produk_image']['error'] === UPLOAD_ERR_OK) {
            // Memastikan folder upload ada
            $uploadDir = 'uploads/';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }

            $imageTmpName = $_FILES['produk_image']['tmp_name'];
            $imageName = basename($_FILES['produk_image']['name']);
            $imageExt = strtolower(pathinfo($imageName, PATHINFO_EXTENSION));
            $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

            if (in_array($imageExt, $allowedExtensions)) {
                $newFileName = uniqid('img_') . '.' . $imageExt;
                $uploadPath = $uploadDir . $newFileName;

                if (move_uploaded_file($imageTmpName, $uploadPath)) {
                    // Mengambil nama file lama dari database untuk dihapus
                    $oldImageQuery = "SELECT produk_image FROM Produk WHERE produk_id = $produk_id";
                    $result = $conn->query($oldImageQuery);
                    if ($result && $row = $result->fetch_assoc()) {
                        $oldImagePath = $uploadDir . $row['produk_image'];
                        if (file_exists($oldImagePath)) {
                            unlink($oldImagePath);
                        }
                    }

                    // Update produk dengan gambar baru
                    $query = "
                        UPDATE Produk
                        SET produk_judul = '$produk_judul', produk_harga = '$produk_harga', produk_deskripsi = '$produk_deskripsi', 
                            stok = $stok, produk_image = '$newFileName', kategori_id = $kategori_id
                        WHERE produk_id = $produk_id
                    ";
                } else {
                    // Jika gagal memindahkan file
                    http_response_code(500);
                    echo json_encode(["error" => "Failed to upload new image."]);
                    exit;
                }
            } else {
                // Jika ekstensi file tidak diizinkan
                http_response_code(400);
                echo json_encode(["error" => "Invalid file type. Allowed types are: " . implode(', ', $allowedExtensions)]);
                exit;
            }
        } else {
            // Update produk tanpa mengubah gambar
            $query = "
                UPDATE Produk
                SET produk_judul = '$produk_judul', produk_harga = '$produk_harga', produk_deskripsi = '$produk_deskripsi', 
                    stok = $stok, kategori_id = $kategori_id
                WHERE produk_id = $produk_id
            ";
        }

        // Eksekusi query pembaruan
        if ($conn->query($query) === TRUE) {
            http_response_code(200);
            echo json_encode(["message" => "Product updated successfully."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Failed to update product.", "details" => $conn->error]);
        }
    } else {
        // Jika data tidak lengkap
        http_response_code(400);
        echo json_encode(["error" => "Incomplete data."]);
    }
} else {
    // Jika metode request bukan POST
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed."]);
}

// Menutup koneksi database
$conn->close();
?>
