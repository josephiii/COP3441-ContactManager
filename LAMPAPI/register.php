<?PHP

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

$firstName = $data['firstName'];
$lastName = $data['lastName'];
$username = $data['username'];
$password = $data['password'];

$conn = new mysqli('localhost', 'root', 'COP4331root', 'COP4331');

if ($conn->connect_error) {

    error('Connection Error: ' . $conn->connect_error);
} else {

    $stmt = $conn->prepare("SELECT * FROM users WHERE (login=?)");
    $stmt->bind_param("s", $username);
    $stmt->execute();

    $usernameExists = $stmt->get_result()->num_rows;
    if ($usernameExists > 0) {

        error('Username already exists');
    } else {

        $stmt = $conn->prepare("INSERT INTO users (firstName, lastName, login, password) VALUES (?,?,?,?)");
        $stmt->bind_param("ssss", $firstName, $lastName, $username, $password);
        $stmt->execute();

        $userId = $conn->insert_id;
        success($userId);
    }

    $stmt->close();
    $conn->close();
}

function success($userId)
{
    $response = [
        'success' => true,
        'userId' => $userId
    ];

    echo json_encode($response);
    exit;
}

function error($errorMsg)
{
    $response = [
        'success' => false,
        'errorMsg' => $errorMsg
    ];

    echo json_encode($response);
    exit;
}
