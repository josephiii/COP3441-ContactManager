<?PHP

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$username = $data['username'];
$password = $data['password'];

$conn = new mysqli('localhost', 'TheBeast', 'WeLoveCOP4331', 'COP4331');

if ($conn->connect_error) {

    error('Connection Error:' . $conn->connect_error);
} else {

    $stmt = $conn->prepare("SELECT FirstName, LastName, ID FROM Users where (Login=? AND Password=?)");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();

    $user = ($stmt->get_result())->fetch_assoc();
    if ($user) {

        success($user['FirstName'], $user['LastName'], $user['ID']);
    } else {

        error('Incorrect Username or Password');
    }

    $stmt->close();
    $conn->close();
}

function success($firstName, $lastName, $ID)
{
    $response = [
        'firstName' => $firstName,
        'lastName' => $lastName,
        'userId' => $ID,
        'errorMsg' => ''
    ];

    echo json_encode($response);
    exit;
}

function error($errorMsg)
{
    $response = [
        'firstName' => '',
        'lastName' => '',
        'userId' => -1,
        'errorMsg' => $errorMsg
    ];

    echo json_encode($response);
    exit;
}
