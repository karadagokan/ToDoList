function newElement() {
    try {
        let inputValue = document.getElementById('task').value;

        if (!inputValue.trim())
            throw Error('Eklemek istediğiniz görev boş olamaz!')

        if (document.getElementsByTagName('li').hasOwnProperty(inputValue))
            throw Error('Bu görev zaten  daha önce eklenmiş!');

        prepareItem(inputValue);
        showToastMessage('Listeye eklendi.', MesajToast.SUCCESS)
    } catch (e) {
        showToastMessage(e.message, MesajToast.WARN)
    } finally {
        document.getElementById('task').value = '';
    }
}

function showToastMessage(text, state) {
    let toastElement = document.getElementById('liveToast');
    toastElement.setAttribute('class', state);
    document.getElementById('toast-body').innerHTML = text;
    let bsAlert = new bootstrap.Toast(toastElement);
    bsAlert.show();
}

function prepareItem(inputValue) {
    let ul = document.getElementById('list');
    let liElement = document.createElement('li');
    liElement.id = inputValue.replace(/\s+/g, '');
    let text = document.createTextNode(inputValue); //Tag arasına değer koyar.
    liElement.appendChild(text);
    ul.appendChild(liElement);

    let span = document.createElement("SPAN");
    let closeText = document.createTextNode("\u00D7"); // Çarpı işareti
    span.className = 'close';
    span.appendChild(closeText);
    liElement.appendChild(span);

    span.onclick = function () {
        this.parentElement.remove(); //Elementi siler.
    }

    liElement.onclick = function () {
        this.classList.toggle('checked') //Class varsa kaldırır yoksa ekler.
    }
}

const MesajToast = {
    SUCCESS: 'toast success hide',
    WARN: 'toast error hide'
};