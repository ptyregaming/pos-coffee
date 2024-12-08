<?php
// Memasukkan file koneksi database
include 'db_connection.php';

// Mengecek apakah metode request adalah POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Memastikan folder upload ada
    $uploadDir = 'uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Validasi input data
    $produk_judul = isset($_POST['produk_judul']) ? $conn->real_escape_string($_POST['produk_judul']) : null;
    $produk_harga = isset($_POST['produk_harga']) ? $conn->real_escape_string($_POST['produk_harga']) : null;
    $produk_deskripsi = isset($_POST['produk_deskripsi']) ? $conn->real_escape_string($_POST['produk_deskripsi']) : null;
    $stok = isset($_POST['stok']) ? (int)$_POST['stok'] : null;
    $kategori_id = isset($_POST['kategori_id']) ? (int)$_POST['kategori_id'] : null;

    if ($produk_judul && $produk_harga && $produk_deskripsi && $stok !== null && $kategori_id) {
        // Validasi dan proses file upload
        if (isset($_FILES['produk_image']) && $_FILES['produk_image']['error'] === UPLOAD_ERR_OK) {
            $imageTmpName = $_FILES['produk_image']['tmp_name'];
            $imageName = basename($_FILES['produk_image']['name']);
            $imageExt = strtolower(pathinfo($imageName, PATHINFO_EXTENSION));
            $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

            if (in_array($imageExt, $allowedExtensions)) {
                $newFileName = uniqid('img_') . '.' . $imageExt;
                $uploadPath = $uploadDir . $newFileName;

                if (move_uploaded_file($imageTmpName, $uploadPath)) {
                    // File berhasil diunggah, lanjutkan simpan ke database
                    $query = "
                        INSERT INTO Produk (produk_judul, produk_harga, produk_deskripsi, stok, produk_image, kategori_id)
                        VALUES ('$produk_judul', '$produk_harga', '$produk_deskripsi', $stok, '$newFileName', $kategori_id)
                    ";

                    if ($conn->query($query) === TRUE) {
                        http_response_code(201);
                        echo json_encode(["message" => "Product added successfully.", "file" => $newFileName]);
                    } else {
                        // Jika gagal menyimpan ke database
                        http_response_code(500);
                        echo json_encode(["error" => "Failed to add product.", "details" => $conn->error]);
                    }
                } else {
                    // Jika gagal memindahkan file
                    http_response_code(500);
                    echo json_encode(["error" => "Failed to upload image."]);
                }
            } else {
                // Jika ekstensi file tidak diizinkan
                http_response_code(400);
                echo json_encode(["error" => "Invalid file type. Allowed types are: " . implode(', ', $allowedExtensions)]);
            }
        } else {
            // Jika tidak ada file diunggah atau ada error pada upload
            http_response_code(400);
            echo json_encode(["error" => "No image uploaded or upload error occurred."]);
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

