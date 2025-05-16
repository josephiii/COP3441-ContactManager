
const urlBase = 'http://orbitcontacts.xyz';
const extension = 'php';

function doLogin(){

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    const loginError = validateLogin(username, password);

    if(loginError){
        document.getElementById('loginError').innerHTML = loginError;
        return;
    }

    //var hash = md5(password);         this is optional
    //change payload password to hash if used

    const payload = {
        'username': username,
        'password': password
    };

    
    //add fetch or XML

}

function validateLogin(username, password){

    if(!username || !password){
        return 'All fields required';
    }

    const regex = /^[a-zA-Z0-9_!@#$%^&*.-]+$/;
    if(!regex.test(username)){
        return 'Username can only contain letters, numbers, and symbols';
    }

    return null;
}