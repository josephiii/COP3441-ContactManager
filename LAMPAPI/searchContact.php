<?php

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

$searchResults = [];
$searchTerm = "%" . $data["search"] . "%";
$userId = $data["userId"];

$conn = new mysqli('localhost', 'TheBeast', 'WeLoveCOP4331', 'COP4331');

if ($conn->connect_error) {
    returnWithError("Connection failed: " . $conn->connect_error);
} else {
    $stmt = $conn->prepare("SELECT ID, FirstName, LastName, phone, email FROM Contacts WHERE (FirstName LIKE ? OR LastName LIKE ? OR phone LIKE ? OR email LIKE ?) AND userId=?");
    $stmt->bind_param("ssssi", $searchTerm, $searchTerm, $searchTerm, $searchTerm, $userId);
    $stmt->execute();

    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        $searchResults[] = $row;
    }

    if (count($searchResults) === 0) {
        returnWithError("No Records Found");
    } else {
        returnWithInfo($searchResults);
    }

    $stmt->close();
    $conn->close();
}

function returnWithError($err)
{
    echo json_encode([
        "results" => [],
        "error" => $err
    ]);
    exit;
}

function returnWithInfo($results)
{
    echo json_encode([
        "results" => $results,
        "error" => ""
    ]);
    exit;
}
