<?php

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

$searchResults = [];
$conn = new mysqli('localhost', 'root', 'COP4331root', 'COP4331');

if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    $stmt = $conn->prepare("SELECT ID, firstName, lastName FROM contacts WHERE (firstName LIKE ? OR lastName LIKE ?) AND userId=?");

    $searchTerm = "%" . $inData["search"] . "%";
    $userId = $inData["userId"];
    $stmt->bind_param("sss", $searchTerm, $searchTerm, $userId);
    $stmt->execute();

    $result = $stmt->get_result();

    while ($user = $result->fetch_assoc()) {
        $searchResults[] = $user;
    }

    if (count($searchResults) === 0) {
        returnWithError("No Records Found");
    } else {
        returnWithInfo($searchResults);
    }

    $stmt->close();
    $conn->close();
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson($obj)
{
    header('Content-type: application/json');
    echo json_encode($obj);
}

function returnWithError($err)
{
    $retValue = [
        "results" => [],
        "error" => $err
    ];
    sendResultInfoAsJson($retValue);
}

function returnWithInfo($results)
{
    $retValue = [
        "results" => $results,
        "error" => ""
    ];
    sendResultInfoAsJson($retValue);
}
