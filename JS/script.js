let count = 1;
document.getElementById("radio1").checked = true;

setInterval(function () {
    nextImage();
}, 9500)

function nextImage() {
    count++;
    if (count > 5) {
        count = 1;
    }

    document.getElementById("radio" + count).checked = true
}

function pagJogos(v) {
    // let valor = document.getElementById('HL').value;
    localStorage.setItem('valor', v);
    open('pagJogo.html');
}