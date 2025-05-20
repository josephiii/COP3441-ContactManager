
const urlBase = 'http://orbitcontacts.xyz';

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

    const credentials = {
        'username': username,
        'password': password
    };

    let url = urlBase + '/login.php';

    let XMLRequest = new XMLHttpRequest();
    XMLRequest.open('POST', url, true);
    XMLRequest.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    try{
        XMLRequest.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){

                let response = JSON.parse(XMLRequest.responseText);
                let userId = response.userId;

                if(userId == -1){
                    document.getElementById('loginError').innerHTML = response.errorMsg;
                    return;
                }

                localStorage.setItem('firstName', response.firstName);
                localStorage.setItem('lastName', response.lastName);
                localStorage.setItem('isValid', 'true');

                window.location.href = 'userHomepage.html';
            }
        };

        let payload = JSON.stringify(credentials);
        XMLRequest.send(payload);

    } catch(error){
        document.getElementById('loginError').innerHTML = error.message;
    }
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