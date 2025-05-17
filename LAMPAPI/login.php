<?PHP

header('Content-type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$username = $data['username'];
$password = $data['password'];

$conn = new mysqli('localhost', 'TheBeast', 'COP4331root', 'COP4331');

if ($conn->connect_error) {

    error('Connection Error:' . $conn->connect_error);
} else {

    $stmt = $conn->prepare("SELECT firstName, lastName, userId FROM users where (username=? AND password=?)");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();

    $user = ($stmt->get_result())->fetch_assoc();
    if ($user) {

        success($user['firstName'], $user['lastName'], $user['userId']);
    } else {

        error('Incorrect Username or Password');
    }

    $stmt->close();
    $conn->close();
}

function success($firstName, $lastName, $userId)
{
    $response = [
        'firstName' => $firstName,
        'lastName' => $lastName,
        'userId' => $userId,
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
