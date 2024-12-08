<?php
// Mengimpor koneksi database
include 'db_connection.php';

header('Content-Type: application/json');
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

// API Login
if ($action == "login") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $query = "SELECT * FROM Users WHERE username='$username' AND password='$password'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $updateQuery = "UPDATE Users SET status=1 WHERE username='$username'";
        if ($conn->query($updateQuery)) {
            sendResponse("success", "Login berhasil.");
        } else {
            sendResponse("error", "Gagal memperbarui status.");
        }
    } else {
        sendResponse("error", "Login gagal, username atau password salah.");
    }
}

// API Logout
if ($action == "logout") {
    $userId = $_POST['id'];
    $updateQuery = "UPDATE Users SET status=0 WHERE username='$userId'";
    if ($conn->query($updateQuery)) {
        sendResponse("success", "Logout berhasil.");
    } else {
        sendResponse("error", "Gagal memperbarui status.");
    }
}

if ($action == "getUserInfo") {
    $data = json_decode(file_get_contents("php://input"), true);
    $userId = $data['id'];

    $query = "SELECT id, nama FROM Users WHERE id=$userId";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        sendResponse("success", $user);
    } else {
        sendResponse("error", "User not found.");
    }
}


// CRUD untuk User (Read, Create, Update, Delete)
if ($action == "read") {
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    $query = $id ? "SELECT * FROM Users WHERE id=$id" : "SELECT * FROM Users";
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
    $query = "INSERT INTO Users (username, password, nama, alamat, nomorTelepon, level, status) VALUES 
              ('{$data['username']}', '{$data['password']}', '{$data['nama']}', '{$data['alamat']}', '{$data['nomorTelepon']}', '{$data['level']}', 0)";
    if ($conn->query($query)) {
        sendResponse("success", "User berhasil ditambahkan.");
    } else {
        sendResponse("error", $conn->error);
    }
} elseif ($action == "update") {
    $id = $_GET['id'];
    $data = json_decode(file_get_contents("php://input"), true);
    $query = "UPDATE Users SET username='{$data['username']}', password='{$data['password']}', nama='{$data['nama']}', alamat='{$data['alamat']}', nomorTelepon='{$data['nomorTelepon']}', level='{$data['level']}' WHERE id=$id";
    if ($conn->query($query)) {
        sendResponse("success", "User berhasil diupdate.");
    } else {
        sendResponse("error", $conn->error);
    }
} elseif ($action == "delete") {
    $id = $_GET['id'];
    $query = "DELETE FROM Users WHERE id=$id";
    if ($conn->query($query)) {
        sendResponse("success", "User berhasil dihapus.");
    } else {
        sendResponse("error", $conn->error);
    }
}

if ($_GET['action'] == 'register') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data || !isset($data['username'], $data['password'])) {
        echo json_encode([
            'status' => 'error',
            'data' => 'Invalid input'
        ]);
        exit;
    }

    // Logika registrasi...
    echo json_encode([
        'status' => 'success',
        'data' => 'User registered successfully'
    ]);
    exit;
}


$conn->close();
?>
