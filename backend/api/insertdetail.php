<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Include database connection
include 'db_connection.php';

// Handle OPTIONS request for CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Parse JSON input
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Get data from the JSON payload
    $detail_penjualan_id = $data['detail_penjualan_id'] ?? null;
    $penjualan_id = $data['penjualan_id'] ?? null;
    $product_id = $data['product_id'] ?? null;
    $jumlah = $data['jumlah'] ?? null;
    $subtotal = $data['subtotal'] ?? null;

    // Validate input data
    if ($detail_penjualan_id && $penjualan_id && $product_id && $jumlah !== null && $subtotal !== null) {
        // Prepare the SQL query using placeholders
        $query = "
            INSERT INTO `Detail` (`detail_penjualan_id`, `penjualan_id`, `product_id`, `jumlah`, `subtotal`)
            VALUES (?, ?, ?, ?, ?)
        ";

        // Prepare the statement
        if ($stmt = $conn->prepare($query)) {
            // Bind parameters to the prepared statement
            $stmt->bind_param("iiidd", $detail_penjualan_id, $penjualan_id, $product_id, $jumlah, $subtotal);

            // Execute the statement
            if ($stmt->execute()) {
                // If successful
                http_response_code(201); // HTTP Status 201 Created
                echo json_encode(["message" => "Detail added successfully."]);
            } else {
                // If execution fails
                http_response_code(500); // Internal Server Error
                echo json_encode(["error" => "Failed to add detail.", "details" => $stmt->error]);
            }

            // Close the prepared statement
            $stmt->close();
        } else {
            // If preparing the query fails
            http_response_code(500); // Internal Server Error
            echo json_encode(["error" => "Failed to prepare SQL query.", "details" => $conn->error]);
        }
    } else {
        // If input data is incomplete
        http_response_code(400); // Bad Request
        echo json_encode(["error" => "Incomplete data."]);
    }
} else {
    // If the request method is not POST
    http_response_code(405); // Method Not Allowed
    echo json_encode(["error" => "Method not allowed."]);
}

// Close the database connection
$conn->close();
?>

