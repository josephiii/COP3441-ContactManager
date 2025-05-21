<?php

header('Content-type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

$firstName = $data['firstName'];
$lastName = $data['lastName'];
$userId = $data['userId'];
$phone = $data['phone'];
$email = $data['email'];

$conn = new mysqli('localhost', 'root', 'COP4331root', 'COP4331');

if ($conn->connect_error) {
    error('Connection Error: ' . $conn->connect_error);
} else {
    $stmt = $conn->prepare("INSERT INTO contacts (userId, firstName, lastName, phone, email) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("issss", $userId, $firstName, $lastName, $phone, $email);

    if ($stmt->execute()) {
        success('Contact added successfully', $conn->insert_id);
    } else {
        error('Failed to add contact: ' . $stmt->error);
    }

    $stmt->close();
    $conn->close();
}

function success($message, $contactId)
{
    echo json_encode([
        'success' => true,
        'message' => $message,
        'contactId' => $contactId
    ]);
    exit;
}

function error($errorMsg)
{
    echo json_encode([
        'success' => false,
        'errorMsg' => $errorMsg
    ]);
    exit;
}
