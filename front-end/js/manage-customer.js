import {Customer} from './model.js'

const btnSave = $('#btn-save');
const txtId = $('#txt-id')
const txtName = $('#txt-name')
const txtAddress = $('#txt-address')
const txtContact = $('#txt-contact')
const modalElm = $('#customer-modal');


btnSave.on('click',()=>{
    if (!dataValid()) return;

    const id = null;
    const name = txtName.val().trim();
    const address = txtAddress.val().trim();
    const contact = txtContact.val().trim();

    const customer = new Customer(id, name, address, contact);


})

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


