
const urlBase = 'http://orbitcontacts.xyz';

function doRegister(){

    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    const registerError = validateRegister(firstName, lastName, username, password, confirmPassword);

    if(registerError){
        document.getElementById('registerError').innerHTML = registerError;
        return;
    }
    
    //var passwordHash = md5(password);         this is optional
    //change payload password to passwordHash if used
    
    const userInfo = {
        'firstName': firstName,
        'lastName': lastName,
        'username': username,
        'password': password
    };

    let url = urlBase + '/register.php';

    let XMLRequest = new XMLHttpRequest();
    XMLRequest.open('POST', url, true);
    XMLRequest.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    try{
        XMLRequest.onreadystatechange = function(){
            if(this.readyState == 4){
                if(this.status == 200){

                    let response = JSON.parse(XMLRequest.responseText);
                    if(response.success == true){
                        //may want to notify successful account creation
                        window.location.href = 'index.html';
                    } else {
                        document.getElementById('registerError').innerHTML = response.errorMsg;
                    }

                } else {
                    document.getElementById('registerError').innerHTML = `Server Error: ${this.status}`;
                }
            }
        };

        let payload = JSON.stringify(userInfo);
        XMLRequest.send(payload);

    } catch(error){
        document.getElementById('registerError').innerHTML = error.message;
    }
}


function validateRegister(firstName, lastName, username, password, confirmPassword){

    if(!firstName || !lastName || !username || !password || !confirmPassword){
        return 'All fields required';
    }

    if(!pwdStrengthCheck(password)){
        return 'Passwords must have at least 8 characters, an uppercase letter, a lowercase letter, and a number';
    }

    if(password !== confirmPassword){
        return 'Passwords must match';
    }

    return null;
}


function pwdStrengthCheck(password){

    if(password.length < 8){
        return false;
    }

    var uppercase = false;
    var lowercase = false;
    var number = false;

    for(let i=0; i<password.length; i++){
        let char = password[i];

        if(/[A-Z]/.test(char)){
            uppercase = true;
        } else if (/[a-z]/.test(char)){
            lowercase = true;
        } else if (/[0-9]/.test(char)){
            number = true;
        } 
    }

    if(uppercase && lowercase && number){
        return true;
    }

    return false;
}