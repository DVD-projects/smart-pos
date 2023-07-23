import {Customer} from './model.js'

const btnSave = $('#btn-save');
const txtId = $('#txt-id')
const txtName = $('#txt-name')
const txtAddress = $('#txt-address')
const txtContact = $('#txt-contact')
const modalElm = $('#customer-modal');
const tbodyElm = $('#table-body');
const tfootElm = $('#table-foot')
const API_BASE_URL = "http://localhost:8080/pos/customers"


btnSave.on('click',()=>{
    if (!dataValid()) return;

    const id = null;
    const name = txtName.val().trim();
    const address = txtAddress.val().trim();
    const contactNumber = txtContact.val().trim();

    let customer = {name,address,contactNumber}
    console.log(customer)

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange',()=>{
        if (xhr.readyState===4){
            if (xhr.status===201){
                customer = JSON.parse(xhr.responseText)
                resetForm(true);
                txtName.trigger('focus');
                getCustomers();
            }else{
                const errorObject = JSON.parse(xhr.responseText);
            }
        }
    });

    const txtSearch = $('#txt-search').val().trim();
    const query = (txtSearch!=null)? txtSearch : "";

    xhr.open('POST',API_BASE_URL+query);

    xhr.setRequestHeader("Content-Type","application/json");

    xhr.send(JSON.stringify(customer));
});

getCustomers();

function getCustomers() {
    tbodyElm.empty();
    // const jqxhr = $.ajax(API_BASE_URL)
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange',()=>{
        if (xhr.readyState===4){
            if (xhr.status===200){
                const customerList = JSON.parse(xhr.responseText);
                if (!customerList) return;
                customerList.forEach(elm=>{
                    const tblElm = $(`<tr>
                            <td>${elm.id}</td>
                            <td>${elm.name}</td>
                            <td>${elm.address}</td>
                            <td>${elm.contactNumber}</td>
                            <td>
                                <div className="actions d-flex gap-3 justify-content-center">
                                    <svg data-bs-toggle="tooltip" data-bs-title="Edit Customer"
                                         xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                         className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path
                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fill-rule="evenodd"
                                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                    <svg data-bs-toggle="tooltip" data-bs-title="Delete Customer"
                                         xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                         className="bi bi-trash" viewBox="0 0 16 16">
                                        <path
                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                        <path
                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                    </svg>
                                </div>
                            </td>
                        </tr>`);
                    tbodyElm.append(tblElm);
                    tfootElm.remove();
                });
            }
        }
    });

    xhr.open('GET',API_BASE_URL,true);

    xhr.send();
}

function dataValid() {
    const name = txtName.val().trim();
    const address = txtAddress.val().trim();
    const contact = txtContact.val().trim();
    let valid = true;
    resetForm();

    if (!contact){
        valid = validate(txtContact, "Contact number can not be empty");
    }else if(!/^\d{3}-\d{7}$/.test(contact)){
        valid = validate(txtContact, "Invalid Contact");
    }

    if (!address){
        valid = validate(txtAddress, "Address can not be empty");
    }else if(!/.{3,}/.test(address)){
        valid = validate(txtAddress,"Invalid Address");
    }

    if (!name){
        valid = validate(txtName,"Name can not be empty");
    }else if (!/^[A-Za-z]{3,}$/.test(name)){
        valid = validate(txtName,"Invalid Name");
    }
    return valid;
}

function validate(txt,msg){
    setTimeout(()=>txt.addClass("is-invalid animate__shakeX"),0);
    txt.trigger('select');
    txt.next().text(msg);
    return false;
}

function resetForm(clear) {
    [txtName,txtAddress,txtContact].forEach(txtElm=>{
        txtElm.removeClass("is-invalid animate__shakeX");
        if (clear) txtElm.val("");
    });
}

modalElm.on('show.bs.modal',()=>{
    resetForm(true);
    txtId.parent().hide();
    setTimeout(()=>txtName.trigger('focus'),500);
})


