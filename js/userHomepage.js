const urlBase = 'http://orbitcontacts.xyz';

document.addEventListener('DOMContentLoaded', () => {

    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const userId = localStorage.getItem('userId');
    const isValid = localStorage.getItem('isValid') === 'true';

    if(!isValid){
        alert('Please login to view contacts');
        window.location.href = '../index.html'
    }

    document.getElementById('greeting').innerHTML = `Hello, ${firstName} ${lastName}`;

    // Searches for contacts with an empty search term
    // which will display all contacts
    searchContact();
});

// takes a list of contacts
function displayContacts(contacts) {
    //shows all contacts added in users contact table
    //shows nothing if user has no contacts
}

function addContactModal(){
    const addModal = document.getElementById('contact-modal');

    document.getElementById('modal-title').innerHTML = 'Add New Contact';
    document.getElementById('contact-form').reset();
    document.getElementById('contact-id').value = ''; 

    addModal.style.display = 'block';
}

function editContactModel(){
    const editModal = document.getElementById('contact-modal');

    document.getElementById('modal-title').innerHTML = 'Edit Contact';
    
    //display contact info

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

// display local cards for styling, delete later
document.getElementById('contact-form').addEventListener('submit', function(e) { 
    e.preventDefault(); 

    let firstName = document.getElementById('first-name').value;
    let lastName = document.getElementById('last-name').value;
    let email = document.getElementById('email').value;
    let phoneNumber = document.getElementById('phone').value;
    let address = document.getElementById('address').value;

    const template = document.getElementById('contact-card-template');
    const newCard = template.content.cloneNode(true);

    newCard.querySelector('.contact-name').innerText = firstName + " " + lastName;
    
    if(email.length > 0) {
        newCard.querySelector('.contact-email').innerHTML = 
        `<img src = "./images/Mail.png" class = "optional-icons"><div>${email}</div>`;
    }

    
    if(phoneNumber.length > 0) {
        newCard.querySelector('.contact-phone').innerHTML =
        `<img src = "./images/Phone.png" class = "optional-icons"><div>${phoneNumber}</div>`;
    }

    
    if(address.length > 0) {
        newCard.querySelector('.contact-address').innerHTML = 
        `<img src = "./images/Address.png" class = "optional-icons"><div>${address}</div>`;
    }

    document.getElementById('contacts-list').appendChild(newCard);

    closeModal();
});


// API PHP ENDPOINTS -------------------------

function createContact() {
    
}

function updateContact(){
    //connects to updateContact.php
}

// connects to searchContact.php
function searchContact() {
    const searchTerm = document.getElementById('search').value;

     const jsonPayload = JSON.stringify({
        'search': searchTerm,
        'userId': localStorage.getItem('userId')
    });

    const url = urlBase + '/searchContact.php';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    
    try {
        xhr.onreadystatechange = () => {
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

function deleteContact(event) {
    const contactId = document.getElementById('delete-modal').getAttribute('data-contact-id');

    const jsonPayload = JSON.stringify({
        'contactId': contactId,
        'userId': localStorage.getItem('userId')
    });

    const url = urlBase + '/deleteContact.php';
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    
    try {
        xhr.onreadystatechange = () => {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(xhr.responseText);
                if (!response.success) {
                    alert('Error deleting contact');
                }

                searchContact(); // Refresh the contact list
                closeModal(); 
            }
        };
        xhr.send(jsonPayload);
    } catch(error) {
        console.error('Error:', error);
    }
}