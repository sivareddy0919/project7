<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

// Database connection details
$servername = "localhost"; // Your database host
$db_username = "root"; // Your database username
$db_password = ""; // Your database password
$dbname = "mobile"; // Your database name

$response = array();

try {
    // Start session
    session_start();

    // Debug: Check session status
    if (session_status() !== PHP_SESSION_ACTIVE) {
        throw new Exception("Session not active");
    }

    // Debug: Print session variables
    if (empty($_SESSION)) {
        throw new Exception("Session is empty");
    }

    // Check if user is logged in
    if (!isset($_SESSION['username'])) {
        throw new Exception("User not logged in");
    }

    // Get username from session
    $username = $_SESSION['username'];

    // Create a new mysqli connection
    $conn = new mysqli($servername, $db_username, $db_password, $dbname);

    // Check database connection
    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    // Fetch user data
    $sql = "SELECT pname AS patientName, mob AS contactNumber, mail AS email, gender, age, bloodgroup AS bloodGroup, imagePath FROM patsignup WHERE username = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        throw new Exception("SQL statement preparation failed: " . $conn->error);
    }

    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // User data found
        $user = $result->fetch_assoc();
        $response['status'] = "success";
        $response['data'] = $user;
    } else {
        throw new Exception("User not found");
    }

    // Close statement
    $stmt->close();
} catch (Exception $e) {
    // Error handling
    $response['status'] = "error";
    $response['message'] = $e->getMessage();
} finally {
    // Close the database connection
    if (isset($conn) && $conn->ping()) {
        $conn->close();
    }
}

// Respond with JSON
echo json_encode($response);
?>
