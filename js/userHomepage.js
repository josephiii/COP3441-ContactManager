const urlBase = 'http://orbitcontacts.xyz';

// let userId = 0;

document.addEventListener('DOMContentLoaded', () => {

    const firstName = localStorage.getItem('firstName'); 
    const lastName = localStorage.getItem('lastName');
    const isValid = localStorage.getItem('isValid') === 'true';

    if(!isValid){
        alert('Please login to view contacts');
        window.location.href = '../index.html'
    }

    document.getElementById('greeting').innerHTML = `Hello, ${firstName} ${lastName}`;

    //phone format
    document.getElementById('phone').addEventListener('input', function(event) {
        let value = event.target.value.replace(/\D/g, '');
        if (value.length >= 6) {
            value = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6,10)}`;
        } else if (value.length >= 3) {
            value = `(${value.slice(0,3)}) ${value.slice(3)}`; 
        } else if (value.length > 0) {
            value = `(${value}`;
        }
        event.target.value = value;
    });

    searchContact();

    //form submit
    document.getElementById('contact-form').addEventListener('submit', function(e) { 
        e.preventDefault(); 

        let firstName = document.getElementById('first-name').value;
        let lastName = document.getElementById('last-name').value;
        let email = document.getElementById('email').value;
        let phoneNumber = document.getElementById('phone').value;

        const contactError = validateContact(firstName, lastName, email, phoneNumber);  
        if(contactError){
            document.getElementById('contactError').innerHTML = contactError;
            return;
        }

        const contactModal = document.getElementById('contact-modal');
        const isEdit = contactModal.getAttribute('data-is-edit');
        if(isEdit == 'true') {
            const contactId = contactModal.getAttribute('data-contact-id');
            updateContact(contactId, firstName, lastName, email, phoneNumber);
        } else {
            createContact(firstName, lastName, email, phoneNumber);
        }

        closeModal();
    });
});

// takes a list of contacts
function displayContacts(contacts) {
    const refresh = document.getElementById('contacts-list');
    refresh.innerHTML = '';
    document.getElementById('no-contacts-message').innerText = '';

    //shows nothing if user has no contacts
    if(contacts.length == 0) {
        document.getElementById('no-contacts-message').innerText = 'No contacts found.';
        return;
    }

    //shows all contacts added in users contact table
    contacts.forEach(contact =>  {
        const template = document.getElementById('contact-card-template');
        const newCard = template.content.cloneNode(true);

        newCard.querySelector('.contact-card').setAttribute('data-contact-id', contact.ID);
        newCard.querySelector('.contact-name').textContent = contact.FirstName + " " + contact.LastName;
        
        const initials = contact.FirstName.charAt(0).toUpperCase() + contact.LastName.charAt(0).toUpperCase();
        newCard.getElementById('contact-initials').innerText = initials;

        if(contact.email) {
            newCard.querySelector('.contact-email').innerHTML = 
            `<img src = "./images/Mail.png" class = "optional-icons" alt = "Email Icon"><div>${contact.email}</div>`;
        }

        if(contact.phone) {
            newCard.querySelector('.contact-phone').innerHTML =
            `<img src = "./images/Phone.png" class = "optional-icons" alt = "Phone Icon"><div>${contact.phone}</div>`;
        }

        document.getElementById('contacts-list').appendChild(newCard);    
    });
}

function addContactModal(){
    const addModal = document.getElementById('contact-modal');
    addModal.setAttribute('data-is-edit', 'false');

    document.getElementById('modal-title').innerHTML = 'Add New Contact';
    document.getElementById('contact-form').reset();
    document.getElementById('contact-id').value = ''; 

    addModal.style.display = 'block';
}

function editContactModal(event){
    const editModal = document.getElementById('contact-modal');
    editModal.setAttribute('data-is-edit', 'true');
    document.getElementById('modal-title').innerHTML = 'Edit Contact';

    const contactCard = event.target.closest('.contact-card');
    const contactId = contactCard.getAttribute('data-contact-id');
    editModal.setAttribute('data-contact-id', contactId);
    
    // Prepopulate the form with existing contact data
    const contactName = contactCard.querySelector('.contact-name').innerText.split(' ');
    const firstName = contactName[0];
    const lastName = contactName[1];
    const contactEmail = contactCard.querySelector('.contact-email').innerText;
    const contactPhone = contactCard.querySelector('.contact-phone').innerText;

    document.getElementById('first-name').value = firstName;
    document.getElementById('last-name').value = lastName;
    document.getElementById('email').value = contactEmail;

    //phone format
    let phone = contactPhone.replace(/\D/g, ''); 
    if (phone.length >= 6) {
        phone = `(${phone.slice(0,3)}) ${phone.slice(3,6)}-${phone.slice(6,10)}`;
    } else if (phone.length >= 3) {
        phone = `(${phone.slice(0,3)}) ${phone.slice(3)}`;
    } else if (phone.length > 0) {
        phone = `(${phone}`;
    }
    document.getElementById('phone').value = phone;

    editModal.style.display = 'block';
}

function deleteContactModal(event) {
    const contactCard = event.target.closest('.contact-card');
    const contactId = contactCard.getAttribute('data-contact-id');

    const deleteModal = document.getElementById('delete-modal');
    deleteModal.setAttribute('data-contact-id', contactId);
    deleteModal.style.display = 'block';
}

function closeModal(){
    const contactModal = document.getElementById('contact-modal');
    const deleteModal = document.getElementById('delete-modal');

    contactModal.style.display = 'none';
    deleteModal.style.display = 'none';
}

// API PHP ENDPOINTS -------------------------

function createContact(firstName, lastName, email, phoneNumber) {
    const userId = localStorage.getItem('userId');
    const contactInfo = {
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'phone': phoneNumber,
        'userId': userId
    };

    let url = urlBase + '/LAMPAPI/addContact.php';

    let XMLRequest = new XMLHttpRequest();
    XMLRequest.open('POST', url, true);
    XMLRequest.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    try{
        XMLRequest.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                searchContact();
            }
        };

        let payload = JSON.stringify(contactInfo);
        XMLRequest.send(payload);

    } catch(error){
        console.log('Create Contact Error: ', error);
    }
}

function updateContact(contactId, firstName, lastName, email, phoneNumber) {
    const userId = localStorage.getItem('userId');

    const jsonPayload = JSON.stringify({
        'contactId': contactId,
        'userId': userId,
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'phone': phoneNumber
    });

    const url = urlBase + '/LAMPAPI/updateContact.php';
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    
    try {
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(xhr.responseText);
                if (!response.success) {
                    alert('Error updating contact');
                }

                closeModal();
                searchContact(); // Refresh the contact list 
            }
        };
        xhr.send(jsonPayload);
    } catch(error) {
        console.error('Error:', error);
    }
}

function searchContact() {
    const searchTerm = document.getElementById('search').value;
    const userId = localStorage.getItem('userId');
    const jsonPayload = JSON.stringify({
        'search': searchTerm,
        'userId': userId
    });

    const url = urlBase + '/LAMPAPI/searchContact.php';
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    
    try {
        xhr.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(xhr.responseText);
                displayContacts(response.results);
            }
        };
        xhr.send(jsonPayload);
    } catch(error) {
        console.error('Error:', error);
    }

}

function deleteContact() {
    const contactId = document.getElementById('delete-modal').getAttribute('data-contact-id');
    const userId = localStorage.getItem('userId');

    const jsonPayload = JSON.stringify({
        'contactId': contactId,
        'userId': userId
    });

    const url = urlBase + '/LAMPAPI/deleteContact.php';
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    
    try {
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(xhr.responseText);
                if (!response.success) {
                    alert('Error deleting contact');
                }

                closeModal();
                searchContact(); // Refresh the contact list 
            }
        };
        xhr.send(jsonPayload);
    } catch(error) {
        console.error('Error:', error);
    }
}

function validateContact(firstName, lastName, email, phoneNumber){
    if(!firstName || !lastName || !email || !phoneNumber){
        return 'All fields Required';
    }

    if(firstName.length > 50 || lastName.length > 50){
        return 'First or Last name cannot exceed 50 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){
        return 'Please enter a valid email';
    }

    return null;
}

function logOut(){
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('userId');
    localStorage.removeItem('isValid');

    window.location.href = '../index.html';
}