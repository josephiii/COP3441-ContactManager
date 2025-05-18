<?php
	$inData = getRequestInfo();
	
	$firstName = $inData["firstname"];
	$lastName = $inData["lastname"]
	$userId = $inData["userId"];

	$conn = new mysqli('localhost', 'TheBeast', 'COP4331root', 'COP4331');
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Users (UserId,Name) VALUES(?,?)");
		$stmt->bind_param("ss", $userId, $firstName, $lastName);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
