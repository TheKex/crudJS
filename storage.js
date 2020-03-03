var json;
var array=[];
//первоначальная загрузка
document.addEventListener('DOMContentLoaded', function(){
    if ( localStorage.getItem('data') != null && localStorage.getItem('data') !== undefined){
        json = JSON.parse(localStorage.getItem('data'));
        array = json.date;
        initialRecords(array);
    }
});

function refresh() {
    localStorage.setItem('data', JSON.stringify({"date": array}));
}

function storageAdd(full_name, address, phone){
    array.push({
        full_name: full_name ,
        address: address,
        phone: phone
    });
    refresh()
}
function storageDel(id){
    array.splice(id, 1);
    refresh();
}
function storageEdit(id, full_name, address, phone){
    array[id].full_name = full_name;
    array[id].address = address;
    array[id].phone = phone;
    refresh();
}
