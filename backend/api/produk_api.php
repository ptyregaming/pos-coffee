<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

include_once 'db_connection.php';

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? intval($_GET['id']) : null;

function sendResponse($statusCode, $response)
{
    http_response_code($statusCode);
    echo json_encode($response);
}

switch ($method) {
    case 'GET':
        if ($id) {
            $query = "SELECT * FROM produk WHERE produk_id = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();

            if ($row) {
                sendResponse(200, $row);
            } else {
                sendResponse(404, ["message" => "Produk tidak ditemukan"]);
            }
        } else {
            $query = "SELECT * FROM produk";
            $result = $conn->query($query);
            $rows = [];
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            sendResponse(200, $rows);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) {
            sendResponse(400, ["message" => "Data tidak valid"]);
            break;
        }

        $kategori_id = $data['kategori_id'] ?? null;
        $produk_judul = $data['produk_judul'] ?? null;
        $produk_harga = $data['produk_harga'] ?? null;
        $produk_deskripsi = $data['produk_deskripsi'] ?? null;
        $produk_image = $data['produk_image'] ?? null;

        if (!$kategori_id || !$produk_judul || !$produk_harga || !$produk_deskripsi) {
            sendResponse(400, ["message" => "Semua data produk diperlukan"]);
            break;
        }

        $query = "INSERT INTO produk (kategori_id, produk_judul, produk_harga, produk_deskripsi, produk_image) 
                  VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("isiss", $kategori_id, $produk_judul, $produk_harga, $produk_deskripsi, $produk_image);

        if ($stmt->execute()) {
            sendResponse(201, ["message" => "Produk berhasil ditambahkan"]);
        } else {
            sendResponse(500, ["message" => "Gagal menambahkan produk", "error" => $stmt->error]);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$id || !$data) {
            sendResponse(400, ["message" => "ID produk dan data diperlukan untuk pembaruan"]);
            break;
        }

        $kategori_id = $data['kategori_id'] ?? null;
        $produk_judul = $data['produk_judul'] ?? null;
        $produk_harga = $data['produk_harga'] ?? null;
        $produk_deskripsi = $data['produk_deskripsi'] ?? null;
        $produk_image = $data['produk_image'] ?? null;

        if (!$kategori_id || !$produk_judul || !$produk_harga || !$produk_deskripsi) {
            sendResponse(400, ["message" => "Semua data produk diperlukan"]);
            break;
        }

        $query = "UPDATE produk SET kategori_id = ?, produk_judul = ?, produk_harga = ?, 
                  produk_deskripsi = ?, produk_image = ? WHERE produk_id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("isissi", $kategori_id, $produk_judul, $produk_harga, $produk_deskripsi, $produk_image, $id);

        if ($stmt->execute()) {
            sendResponse(200, ["message" => "Produk berhasil diperbarui"]);
        } else {
            sendResponse(500, ["message" => "Gagal memperbarui produk", "error" => $stmt->error]);
        }
        break;

    case 'DELETE':
        if (!$id) {
            sendResponse(400, ["message" => "ID produk diperlukan untuk penghapusan"]);
            break;
        }

        $query = "DELETE FROM produk WHERE produk_id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            sendResponse(200, ["message" => "Produk berhasil dihapus"]);
        } else {
            sendResponse(500, ["message" => "Gagal menghapus produk", "error" => $stmt->error]);
        }
        break;

    default:
        sendResponse(405, ["message" => "Metode tidak dikenali"]);
        break;
}

$conn->close();
?>
