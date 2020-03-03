
function loadFile(elementID) {
    let input, file, fr;

    if (typeof window.FileReader !== 'function') {
        alert("Ваш браузер не поддерживает загрузку файлов.");
        return;
    }

    input = document.getElementById(elementID);
    if (!input) {
        alert("Элемент загрузки файла не найден.");
    }
    else if (!input.files) {
        alert("Этот брайзер не поддерживает загрузек файлов.");
    }
    else if (!input.files[0]) {
        alert("Файл не выбран");
    }
    else {
        file = input.files[0];
        fr = new FileReader();
        fr.onload = receivedText;
        fr.readAsText(file);
    }

    function receivedText(e) {
        let lines = e.target.result;
        let newArr = JSON.parse(lines);
        array = newArr;
        initialRecords(newArr);
        refresh();
    }
}
