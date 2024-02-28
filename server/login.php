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

// Check if the username exists
$username = $conn->real_escape_string($data['username']);
$checkQuery = "SELECT * FROM user WHERE Username = '$username'";
$result = $conn->query($checkQuery);

if ($result->num_rows === 0) {
    // Username doesn't exist, return an error message
    echo json_encode(["success" => false, "message" => "Username not found"]);
    exit;
}

// Username exists, verify the password
$userData = $result->fetch_assoc();
$storedPassword = $userData['Password'];

if (password_verify($data['password'], $storedPassword)) {
    // Password is correct, consider the user logged in
    echo json_encode(["success" => true, "message" => "Login successful"]);
} else {
    // Password is incorrect, return an error message
    echo json_encode(["success" => false, "message" => "Incorrect password"]);
}

// Close the database connection
$conn->close();
?>
