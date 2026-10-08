"use strict"
let contactModal = document.querySelector('#contactModal');
let addContactBtn = document.querySelector('#addContactBtn');
let closeModalBtn = document.querySelector('#closeModalBtn');
let avatarInput = document.querySelector('#avatarInput');
let contactNameInput = document.querySelector('#contactName');
let contactPhoneInput = document.querySelector('#contactPhone');
let contactEmailInput = document.querySelector('#contactEmail');
let contactAddressInput = document.querySelector('#contactAddress');
let contactGroupInput = document.querySelector('#contactGroup');
let contactNotesInput = document.querySelector('#contactNotes');
let contactFavoriteCheckBox = document.querySelector('#contactFavorite');
let contactEmergencyCheckBox = document.querySelector('#contactEmergency');
let submitModalBtn = document.querySelector('#submitModalBtn');
let cancelModalBtn = document.querySelector('#cancelModalBtn');
let contactForm = document.querySelector('#contactForm');
let contactCardContainer = document.querySelector('#contactCardContainer');
let updateModalBtn = document.querySelector('#updateModalBtn');
let totalContacts = document.querySelector('#totalContacts');
let totalFavContacts = document.querySelector('#totalFavContacts');
let totalEmergencyContacts = document.querySelector('#totalEmergencyContacts');
let totalContactsSpan = document.querySelector('#totalContactsSpan');
let bigEmergencyItem = document.querySelector('#bigEmergencyItem');
let searchInput = document.querySelector('#searchInput');
let contactList = 'contactList'
let contactsMap = new Map();
// let favorites = 0;
// let emergencies = 0;
// let contactsNumber = 0;
// let favoritesList = 'favoritesList';
// let favoritesMap = new Map();
// let emergencyList = 'emergencyList';
// let emergencyMap = new Map();
// if(localStorage.getItem(emergencyList)){
//     emergencyMap = new Map(JSON.parse(localStorage.getItem(emergencyList)));
// }
// if(localStorage.getItem(favoritesList)){
//     favoritesMap = new Map (JSON.parse(localStorage.getItem(favoritesList)));
// }
if(localStorage.getItem(contactList)){
    contactsMap = new Map(JSON.parse(localStorage.getItem(contactList)));
}

// (function(){
//     let contacts = [...contactsMap];
//     contactsNumber = contacts.length;
//     contacts.forEach(contact=>{
//         favorites += contact[1].favorite? 1 : 0;
//         emergencies += contact[1].emergency? 1 : 0;
//     })
// })();

function fillFormInputs(contact){
    contactNameInput.value = contact? contact.name:'';
    contactPhoneInput.value = contact? contact.phone:'';
    contactEmailInput.value = contact? contact.email:'';
    contactAddressInput.value = contact? contact.address:'';
    contactGroupInput.value = contact? contact.group:'';
    contactNotesInput.value = contact? contact.notes:'';
    contactFavoriteCheckBox.checked = contact? contact.favorite: false;
    contactEmergencyCheckBox.checked = contact? contact.emergency: false;
}

function generateId(){
    let id;
    do{
        id = Math.floor(Math.random() * 9000) + 1000;
    }while(contactsMap.has(id))
    return id;
}

addContactBtn.addEventListener('click',function(){
    fillFormInputs();
    contactModal.classList.replace('d-none','d-block');
});

cancelModalBtn.addEventListener('click',function(){
    
    contactModal.classList.replace('d-block','d-none');
});

closeModalBtn.addEventListener('click',function(){
    fillFormInputs();
    contactModal.classList.replace('d-block','d-none');
});



function validateInput(obj){
    let regex = {
        contactName: /^[a-zA-Z\s]{2,50}$/gm,
        contactPhone: /^(\+201|01)[0-25][0-9]{8}$/gm,
        contactEmail: /^$|^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/gm,
        contactGroup: /^$|^(family|friends|work|school|other)$/gmi
    }
    let isValid = regex[obj.id].test(obj.value.trim());
    if(obj.id !== 'contactGroup'){
        if(!isValid){
            obj.nextElementSibling.classList.replace('d-none','d-block');
        }
        else{
            obj.nextElementSibling.classList.replace('d-block','d-none');
        }
    }
    return isValid;
}

contactNameInput.addEventListener('input',function(e){
    validateInput(e.target);
});

contactPhoneInput.addEventListener('input',function(e){
    validateInput(e.target);
});

contactEmailInput.addEventListener('input',function(e){
    validateInput(e.target);
});

function addFavorite(obj){
    obj.favorite = true;
    localStorage.setItem(contactList,JSON.stringify([...contactsMap]));
    // favorites++;
}

function removeFavorite(obj){
    obj.favorite = false;
    localStorage.setItem(contactList,JSON.stringify([...contactsMap]));
    // favorites--;
}

function addEmergency(obj){
    obj.emergency = true;
    localStorage.setItem(contactList,JSON.stringify([...contactsMap]));
    // emergencies++;
}

function removeEmergency(obj){
    obj.emergency = false;
    localStorage.setItem(contactList,JSON.stringify([...contactsMap]));
    // emergencies--;
}

let updatedContact;
function displayContacts(searchedContacts){
    let content = '';
    let contacts = searchedContacts !== undefined? searchedContacts : [...contactsMap];
    let contactsNumber = contacts.length;
    for(let i = 0;i<contactsNumber;i++){
        content += `<div  class="col-md-6 col-lg-12 col-xl-6 mb-4">
                            <div class="contact-card">
                               
                                <div class="contact-card-header">
                                    <div class="d-flex align-items-start justify-content-start gap-3">
                                        <div class="position-relative flex-shrink-0  ">
                                            <img src="./img/${contacts[i][1].avatar}" alt="${contacts[i][1].name}"
                                                class="contact-card-avatar object-fit-cover">
                                            
                                                ${contacts[i][1].emergency? `<div
                                                class="badge-icon badge-heart d-flex justify-content-center align-items-center rounded-circle">
                                                <i class="fas fa-heart-pulse"></i>
                                            </div>`:''}
                                            
                                            
                                                ${contacts[i][1].favorite? `<div
                                                class="badge-icon badge-star d-flex justify-content-center align-items-center rounded-circle">
                                                <i class="fas fa-star"></i>
                                            </div>`:''}
                                            
                                        </div>
                                        <div class="flex-1 min-w-0 pt-1">
                                            <h3 class="contact-card-name truncate m-0 ">${contacts[i][1].name}</h3>
                                            <div class="d-flex align-items-center gap-2 mt-1">
                                                <div class="contact-card-phone-container flex-shrink-0">
                                                    <i class="contact-card-phone-icon fas fa-phone"></i>
                                                </div>
                                                <span class="contact-card-phone truncate">${contacts[i][1].phone}</span>
                                            </div>
                                        </div>
                                    </div>

                                   
                                    <div class="contact-details">
                                        <div class="contact-detail-item">
                                        ${contacts[i][1].email? `<div
                                                class="contact-detail-icon-container d-flex align-items-center justify-content-center violet">
                                                <i class="contact-detail-icon violet fas fa-envelope"></i>
                                            </div>
                                            <span class="contact-detail-text truncate">${contacts[i][1].email}</span>`:''}
                                            
                                        </div>

                                        <div class="contact-detail-item">
                                        ${contacts[i][1].address? `<div
                                                class="contact-detail-icon-container d-flex align-items-center justify-content-center emerald">
                                                <i class="contact-detail-icon emerald fas fa-location-dot"></i>
                                            </div>
                                            <span class="contact-detail-text truncate">${contacts[i][1].address}</span>` : ''}
                                            
                                        </div>
                                    </div>

                               
                                    <div class="contact-tags">
                                    ${contacts[i][1].group !== ''? `
                                        <span class="contact-tag d-inline-flex align-items-center">${contacts[i][1].group}</span>` : ''}
                                    </div>
                                </div>

                             
                                <div class="contact-card-actions">
                                    <div class="action-buttons-left">
                                        <a href="tel:${contacts[i][1].phone}" class="action-button call callBtn" title="Call">
                                            <i class="fas fa-phone"></i>
                                        </a>
                                        ${contacts[i][1].email? `<a href="mailto:${contacts[i][1].email}" class="action-button email emailBtn" title="Email">
                                            <i class="fas fa-envelope"></i>
                                        </a>`:''}
                                        
                                    </div>
                                    <div class="action-buttons-right">
                                        ${
                                            contacts[i][1].favorite? 
                                            `<button class="action-button text-warning removeFavBtn" data-contact-id="${contacts[i][1].id}" title="Favorite">
                                                <i class="fa-solid fa-star"></i>
                                            </button>`:`<button class="action-button favorite addFavBtn" data-contact-id="${contacts[i][1].id}" title="Favorite">
                                                <i class="far fa-star"></i>
                                            </button>`
                                        }
                                        ${
                                            contacts[i][1].emergency? 
                                            `<button class="action-button removeEmergncyBtn text-danger" data-contact-id="${contacts[i][1].id}" title="Emergency">
                                            <i class="fa-solid fa-heart"></i>
                                            </button>`:`<button class="action-button emergency addEmergncyBtn" data-contact-id="${contacts[i][1].id}" title="Emergency">
                                                <i class="far fa-heart"></i>
                                            </button>`
                                        }
                                        <button class="action-button edit editBtn" data-contact-id="${contacts[i][1].id}" title="Edit">
                                            <i class="fas fa-pen"></i>
                                        </button>
                                        <button class="action-button delete deleteBtn" data-contact-id="${contacts[i][1].id}" title="Delete">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>`;  
    }
    contactsNumber? contactCardContainer.innerHTML = content : contactCardContainer.innerHTML = 
                        `<div class="col-12 text-center py-5">
                            <div class="d-flex align-items-center justify-content-center mx-auto mb-4 bg-secondary-subtle
                                     rounded-4" style="width: 80px; height: 80px;">
                                <i class="fas fa-address-book text-secondary fs-4"></i>
                            </div>
                            <p class="text-muted fw-semibold mb-1">No contacts found</p>
                            <p class="text-secondary small">
                                Click <strong>"Add Contact"</strong> to get started
                            </p>
                        </div>`;
    document.querySelectorAll('.editBtn').forEach(btn =>{
        btn.addEventListener('click',function(e){
            let id = Number(e.currentTarget.getAttribute('data-contact-id'));
            let contact = contactsMap.get(id);
            fillFormInputs(contact);
            contactModal.classList.replace('d-none','d-block');
            submitModalBtn.classList.replace('d-block','d-none');
            updateModalBtn.classList.replace('d-none','d-block');
            updatedContact = contact;
        });
    });

    document.querySelectorAll('.deleteBtn').forEach(btn=>{
        btn.addEventListener('click',function(e){
            let id = Number(e.currentTarget.getAttribute('data-contact-id'));
            let contact = contactsMap.get(id);
            deleteContact(contact);
        });
    });

    document.querySelectorAll('.addFavBtn').forEach(btn=>{
        btn.addEventListener('click',function(e){
            let id = Number(e.currentTarget.getAttribute('data-contact-id'));
            let contact = contactsMap.get(id);
            addFavorite(contact);
            displayContacts(contacts);
            displayContactsInfo();
        });
    });

    document.querySelectorAll('.removeFavBtn').forEach(btn=>{
        btn.addEventListener('click',function(e){
            let id = Number(e.currentTarget.getAttribute('data-contact-id'));
            let contact = contactsMap.get(id);
            removeFavorite(contact);
            displayContacts(contacts)
            displayContactsInfo();
        });
    });

    document.querySelectorAll('.addEmergncyBtn').forEach(btn => {
        btn.addEventListener('click',function(e){
            let id = Number(e.currentTarget.getAttribute('data-contact-id'));
            let contact = contactsMap.get(id);
            addEmergency(contact);
            displayContacts(contacts)
            displayContactsInfo();
        })
    });

    document.querySelectorAll('.removeEmergncyBtn').forEach(btn => {
        btn.addEventListener('click',function(e){
            let id = Number(e.currentTarget.getAttribute('data-contact-id'));
            let contact = contactsMap.get(id);
            removeEmergency(contact);
            displayContacts(contacts);
            displayContactsInfo();
        })
    });
    // deleteBtn = document.querySelectorAll('.deleteBtn');
}
function displayTotal(contacts){
    let contactsNumber = contacts.length;
    totalContacts.innerText = contactsNumber;
    totalContactsSpan.innerText = contactsNumber;
}
function displayFavorites(contacts){
    let favorites = 0;
    let favoritesContent = '';
    contacts.forEach(contact=>{
        favorites += contact[1].favorite? 1 : 0;
        favoritesContent += contact[1].favorite?
                            `<div
                                class="contact-item d-flex justify-content-between align-items-center gap-3 p-2 rounded-3 mb-3">
                                <div class="flex-shrink-0">
                                    <img src="./img/${contact[1].avatar}" alt="${contact[1].name}" class="contact-avatar" />
                                </div>
                                <div class="flex-grow-1 text-truncate">
                                    <h4 class="mb-0 fw-medium text-dark small text-truncate">${contact[1].name}</h4>
                                    <p class="mb-0 text-muted small text-truncate">${contact[1].phone}</p>
                                </div>
                                <a href="tel:${contact[1].phone}"
                                    class="call-btn d-flex align-items-center justify-content-center flex-shrink-0">
                                    <i class="fas fa-phone"></i>
                                </a>
                            </div>`:'';
    });
    favorites? bigFavItem.innerHTML = favoritesContent : bigFavItem.innerHTML = 
                                `<div class="col-12">
                                    <div id="emptyStateEmergency" class="empty-state">
                                        <p class="text-muted mb-0">No favorites yet</p>
                                    </div>
                                </div>`;
    totalFavContacts.innerText = favorites;
}
function displayEmergencies(contacts){
    let emergencies = 0;
    let emergencyContent = '';
    contacts.forEach(contact=>{
        emergencies += contact[1].emergency? 1: 0;
        emergencyContent += contact[1].emergency? 
                            `<div
                                class="contact-item-emergency  d-flex align-items-center gap-3 p-2 rounded-3">
                                <div class="flex-shrink-0">
                                    <img src="./img/${contact[1].avatar}" alt="${contact[1].name}" class="contact-avatar" />
                                </div>
                                <div class="flex-grow-1 text-truncate">
                                    <h4 class="mb-0 fw-medium text-dark small text-truncate">${contact[1].name}</h4>
                                    <p class="mb-0 text-muted small text-truncate">${contact[1].phone}</p>
                                </div>
                                <a href="tel:${contact[1].phone}"
                                    class="call-btn-emergency call-btn-rose d-flex align-items-center justify-content-center flex-shrink-0">
                                    <i class="fas fa-phone"></i>
                                </a>
                            </div>`:'';
    });
    emergencies? bigEmergencyItem.innerHTML = emergencyContent : bigEmergencyItem.innerHTML = 
                                `<div class="col-12">
                                    <div id="emptyStateEmergency" class="empty-state">
                                        <p class="text-muted mb-0">No emergency contacts</p>
                                    </div>
                                </div>`;
    totalEmergencyContacts.innerText = emergencies;
}
function displayContactsInfo(){
    let contacts = [...contactsMap];
    displayTotal(contacts);
    displayFavorites(contacts);
    displayEmergencies(contacts);
}
displayContacts();
displayContactsInfo();

submitModalBtn.addEventListener('click',function(e){
    let isValid = validateInput(contactNameInput) 
    && validateInput(contactPhoneInput) && 
    validateInput(contactEmailInput) &&
    validateInput(contactGroupInput);
    if(isValid){
        let contact = {
            id: generateId(),
            name: contactNameInput.value,
            phone: contactPhoneInput.value,
            email: contactEmailInput.value,
            address: contactAddressInput.value,
            group: contactGroupInput.value,
            notes: contactNotesInput.value,
            favorite: contactFavoriteCheckBox.checked,
            emergency: contactEmergencyCheckBox.checked,
            avatar: avatarInput.files[0]?.name || 'phone-book.png',
        }
        contactsMap.set(contact.id,contact);
        localStorage.setItem(contactList,JSON.stringify([...contactsMap]));
        contactModal.classList.replace('d-block','d-none');
        displayContactsInfo();
        displayContacts();
        fillFormInputs();
        Swal.fire({
            position: "center center",
            icon: "success",
            title: "Added!",
            text: "Contact has been added successfully.",
            showConfirmButton: false,
            timer: 1500
        });
    }
});

updateModalBtn.addEventListener('click',function(){
    let isValid = validateInput(contactNameInput) 
    && validateInput(contactPhoneInput) && 
    validateInput(contactEmailInput) &&
    validateInput(contactGroupInput);

    if(isValid){
        updatedContact.name = contactNameInput.value;
        updatedContact.phone = contactPhoneInput.value;
        updatedContact.email = contactEmailInput.value;
        updatedContact.address = contactAddressInput.value;
        updatedContact.group = contactGroupInput.value;
        updatedContact.notes = contactNotesInput.value;
        updatedContact.favorite = contactFavoriteCheckBox.checked;
        updatedContact.emergency = contactEmergencyCheckBox.checked;
        updatedContact.avatar = avatarInput.files[0]?.name || updatedContact.avatar
        submitModalBtn.classList.replace('d-none','d-block');
        updateModalBtn.classList.replace('d-block','d-none');
        contactModal.classList.replace('d-block','d-none');
        displayContactsInfo();
        displayContacts();
        fillFormInputs();
        localStorage.setItem(contactList,JSON.stringify([...contactsMap]));
    }
})

function deleteContact(obj){
    Swal.fire({
        title: "Delete Contact?",
        text: `Are you sure you want to delete ${obj.name.split(' ')[0]}? This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#606773",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
    if (result.isConfirmed) {
        Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
        });
        // favorites += obj.favorite? -1 : 0;
        // emergencies += obj.emergency? -1: 0;
        contactsMap.delete(obj.id);
        localStorage.setItem(contactList,JSON.stringify([...contactsMap]));
        displayContacts();
        displayContactsInfo();
    }
    });
}

searchInput.addEventListener('change',function(e){
    searchContact(e.currentTarget.value.trim());
})

function searchContact(keyword){
    let searchedContacts = [];
    let contacts = [...contactsMap];
    let searchedKeyword = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i');
    contacts.forEach(contact=>{
        let info = contact[1].name + contact[1].phone + contact[1].email;
        console.log(info);
        console.log(searchedKeyword.test(info));
        if(searchedKeyword.test(info)){
            searchedContacts.push(contact);
        }
    });
    if(searchedContacts.length){
        displayContacts(searchedContacts);
    }else{
        contactCardContainer.innerHTML = 
                        `<div class="col-12 text-center py-5">
                            <div class="d-flex align-items-center justify-content-center mx-auto mb-4 bg-secondary-subtle
                                     rounded-4" style="width: 80px; height: 80px;">
                                <i class="fas fa-address-book text-secondary fs-4"></i>
                            </div>
                            <p class="text-muted fw-semibold mb-1">No contacts found</p>
                            <p class="text-secondary small">
                                Click <strong>"Add Contact"</strong> to get started
                            </p>
                        </div>`;
    }
}