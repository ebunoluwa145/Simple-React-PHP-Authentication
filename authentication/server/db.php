<?php

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'wcg';

// Create a new mysqli connection
$conn = new mysqli($host, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// The $conn variable now represents a valid database connection

// (you can proceed with your database operations)

// Note: Do not close the connection here; close it after you finish your database operations in other files.
?>
