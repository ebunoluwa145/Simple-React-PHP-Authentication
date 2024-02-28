<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db.php';

// Assuming the incoming data is sent as JSON
$data = json_decode(file_get_contents("php://input"), true);

// Validate the data (you may want to perform more robust validation)
if ($data === null || !isset($data['username']) || !isset($data['password'])) {
    echo json_encode(["success" => false, "message" => "Invalid or missing data"]);
    exit;
}

// Ensure the database connection is established
if ($conn === null || $conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection error"]);
    exit;
}

// Check if the username already exists
$username = $conn->real_escape_string($data['username']);
$checkQuery = "SELECT * FROM user WHERE Username = '$username'";
$result = $conn->query($checkQuery);

if ($result->num_rows > 0) {
    // Username already exists, return an error message
    echo json_encode(["success" => false, "message" => "Username already exists", "errorCode" => "USERNAME_EXISTS"]);
    exit;
}

// Username is unique, proceed with registration
$password = password_hash($data['password'], PASSWORD_BCRYPT);  // Hash the password for security

// Insert data into the database
try {
    $insertQuery = "INSERT INTO user (Username, Password) VALUES ('$username','$password')";

    if ($conn->query($insertQuery) === TRUE) {
        echo json_encode(["success" => true, "message" => "User registered successfully"]);
    } else {
        throw new Exception("Error: " . $conn->error);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}

// Close the database connection
$conn->close();
?>
