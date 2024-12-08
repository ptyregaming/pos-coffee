<?php
// Memasukkan file koneksi database
include 'db_connection.php';

// Memastikan koneksi berhasil
if (!$conn) {
    header('Content-Type: application/json');
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Database connection failed."]);
    exit();
}

// Mendapatkan username dari parameter GET atau POST
$username = isset($_GET['username']) ? trim($_GET['username']) : null;

if (!$username) {
    // Jika username tidak disediakan
    header('Content-Type: application/json');
    http_response_code(400); // Bad Request
    echo json_encode(["error" => "Username is required."]);
    exit();
}

// Menyiapkan query SQL untuk mengambil data pengguna berdasarkan username
$query = $conn->prepare("SELECT id, username, nama, level FROM Users WHERE username = ?");
$query->bind_param("s", $username);

try {
    // Menjalankan query
    $query->execute();
    $result = $query->get_result();

    if ($result->num_rows > 0) {
        // Mengambil data pengguna dari hasil query
        $user_data = $result->fetch_assoc();

        // Mengatur header untuk format JSON
        header('Content-Type: application/json');

        // Mengembalikan data dalam format JSON
        echo json_encode(["status" => "success", "data" => $user_data]);
    } else {
        // Jika tidak ada data ditemukan
        header('Content-Type: application/json');
        http_response_code(404); // Not Found
        echo json_encode(["status" => "error", "message" => "User not found."]);
    }
} catch (Exception $e) {
    // Penanganan error pada query
    header('Content-Type: application/json');
    http_response_code(500); // Internal Server Error
    echo json_encode(["status" => "error", "message" => "Failed to fetch user data.", "details" => $e->getMessage()]);
} finally {
    // Menutup koneksi database
    $query->close();
    $conn->close();
}
?>

