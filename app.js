let selectedRow = null;

function onFormSubmit() {
    if (validate()) {
        let formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    let formData = {};
    formData["full_name"] = document.getElementById("fullName").value;
    formData["address"] = document.getElementById("address").value;
    formData["phone"] = document.getElementById("phone").value;
    return formData;
}

function initialRecords(data) {
    array = data;
    while(document.getElementById("outputTable").rows.length > 1){
        document.getElementById("outputTable").deleteRow(1);
    }
    for (let rec in data){
        renderRecord(data[rec]);
    }
}

function renderRecord(data) {
    let table = document.getElementById("outputTable").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.length);
    let cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.full_name;
    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.address;
    let cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.phone;
    let cell4 = newRow.insertCell(3);
    cell4.innerHTML = '<a href="#" class="stretched-link" onClick="onEdit(this)">Изменить</a> <a href="#" class="stretched-link" onClick="onDelete(this)">Удалить</a>';
}

function insertNewRecord(data) {
    storageAdd(data.full_name, data.address, data.phone);
    renderRecord(data);
}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("address").value = "";
    document.getElementById("phone").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("address").value = selectedRow.cells[1].innerHTML;
    document.getElementById("phone").value = selectedRow.cells[2].innerHTML;
}
function updateRecord(formData) {
    storageEdit(selectedRow.rowIndex - 1, formData.full_name, formData.address, formData.phone)
    selectedRow.cells[0].innerHTML = formData.full_name;
    selectedRow.cells[1].innerHTML = formData.address;
    selectedRow.cells[2].innerHTML = formData.phone;
}

function onDelete(td) {
    if (confirm('Вы уверены, что хотите удалить запись?')) {
        let row = td.parentElement.parentElement;
        storageDel(row.rowIndex - 1);
        document.getElementById("outputTable").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    let isValid = true;
    if (document.getElementById("fullName").value === "") {
        isValid = false;
    } else {
        isValid = true;
    }
    return isValid;
}
