<?php

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

$contactId = $data['contactId'];
$userId = $data['userId'];
$firstName = $data['firstName'];
$lastName = $data['lastName'];
$phone = $data['phone'];
$email = $data['email'];

$conn = new mysqli('localhost', 'root', 'COP4331root', 'COP4331');

if ($conn->connect_error) {
    returnWithError("Connection failed: " . $conn->connect_error);
} else {
    $stmt = $conn->prepare("UPDATE contacts SET firstName=?, lastName=?, phone=?, email=? WHERE ID=? AND userId=?");
    $stmt->bind_param("ssssii", $firstName, $lastName, $phone, $email, $contactId, $userId);

    if ($stmt->execute() && $stmt->affected_rows > 0) {
        returnWithSuccess("Contact updated successfully.");
    } else {
        returnWithError("Contact not found or no changes made.");
    }

    $stmt->close();
    $conn->close();
}

function returnWithError($err)
{
    echo json_encode([
        "success" => false,
        "errorMsg" => $err
    ]);
    exit;
}

function returnWithSuccess($msg)
{
    echo json_encode([
        "success" => true,
        "message" => $msg
    ]);
    exit;
}
