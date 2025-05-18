
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