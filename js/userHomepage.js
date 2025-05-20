
document.addEventListener('DOMContentLoaded', () => {

    //verify user ID with localstorage or cookies
    if(!isValidUser){
        alert('Please login to view contacts');
        window.location.href = '../index.html'
    }

    //pull firstname and display to page

    displayContacts();
});

function displayContacts(){
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

function deleteContactModal(){
    const deleteModal = document.getElementById('delete-modal');
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

function createContact(){
    //connects to addContact.php
}

function updateContact(){
    //connects to updateContact.php
}

function searchContact(){
    //connects to searchContact.php
}

function deleteContact(){
    //connects to deleteContact.php
}