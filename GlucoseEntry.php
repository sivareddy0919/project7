<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decode JSON data from the request body
    $data = json_decode(file_get_contents('php://input'), true);

    // Extract data from the decoded JSON
    $date = isset($data['date']) ? $data['date'] : '';
    $time = isset($data['time']) ? $data['time'] : '';
    $sugarConcentration = isset($data['sugarConcentration']) ? $data['sugarConcentration'] : '';
    $note = isset($data['note']) ? $data['note'] : '';
    $unit = isset($data['unit']) ? $data['unit'] : ''; // Unit can be 'mmol/L' or 'mg/dL'
    $username = isset($data['username']) ? $data['username'] : ''; // Get the username from the request

    // Convert sugar concentration to mmol/L if unit is 'mg/dL'
    if ($unit === 'mg/dL') {
        $sugarConcentration = round($sugarConcentration / 18.016, 2); // Conversion factor for mg/dL to mmol/L
    }

    // Combine date and time into a single datetime string
    $datetime = $date . ' ' . $time;

    // Perform any validation here if needed

    // Example: Insert data into a database (you need to adjust this based on your actual database structure)
    $servername = "localhost";
    $username_db = "root";
    $password_db = "";
    $dbname = "mobile";

    $conn = new mysqli($servername, $username_db, $password_db, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare SQL statement
    $sql = "INSERT INTO GlucoseEntry (datetime, sugar_concentration, note, unit, username) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    // Bind parameters and execute statement
    $stmt->bind_param("sdsss", $datetime, $sugarConcentration, $note, $unit, $username); // 'd' for double (decimal numbers), 's' for string
    $stmt->execute();

    // Check if insertion was successful
    if ($stmt->affected_rows > 0) {
        $response = array(
            "status" => "success",
            "message" => "Submitted successfully"
        );
    } else {
        $response = array(
            "status" => "error",
            "message" => "Failed to insert data"
        );
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();

    // Return JSON response
    echo json_encode($response);
} else {
    // Handle other HTTP methods or invalid requests
    $response = array(
        "status" => "error",
        "message" => "Invalid request method"
    );
    echo json_encode($response);
}
?>
