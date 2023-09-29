const keyStorage = "DataBuku";
let titleResult = document.querySelector("#titleResult");
let wraperResult = document.querySelector(".wraper-result");
let jumlahBuku = document.querySelector("#jumlahBuku");
let btnAll = document.querySelectorAll("#btnAll");
function cekStorage() {
    return typeof (Storage) !== 'undefined';
}

document.querySelector("#tambahBuku").addEventListener('click', () => {
    titleResult.textContent = "Tambah Buku";
    wraperResult.innerHTML =`
        <div class="container-form">
        <form action="">
        <input class="inputTambah" type="text" id="title" name="title" placeholder="Masukan judul buku"><br>
        <input class="inputTambah" type="text" id="author" name="author" placeholder="Masukan Author Buku"><br>
        <input class="inputTambah" type="text" id="tahun" name="tahun" placeholder="Masukan tahun buku Terbit"><br>
        <input class="checkbox" type="checkbox" id="checkbox" name="checkbox">
        <span>Selesai dibaca</span><br>
        <button onclick="inputData()" >Submit</button>
        </form>
        </div>
        `
})

function inputData() {
    let titleBuku = document.querySelector("#title").value;
    let authorBuku = document.querySelector("#author").value;
    let tahunBuku = document.querySelector("#tahun");
    let getValue = tahunBuku.value;
    let getInt = parseInt(getValue);
    let getcheckbox = document.querySelector("#checkbox");
    const valueOfCheckbox = getcheckbox.checked;
    const timestamp = new Date().getTime();

    let myBook = {
        id: timestamp,
        judul: titleBuku,
        author: authorBuku,
        tahun: getInt,
        isComplete: valueOfCheckbox
    };
    putDataOnStorage(myBook);
    renderShowData();
    alert(`Berhasil menambahkan Buku ${titleBuku}`)
    titleResult.innerHTML = "Semua Buku";
}

function putDataOnStorage(data) {
    if (cekStorage) {
        let dataBuku = [];
        if (localStorage.getItem(keyStorage) !== null) {
            dataBuku = JSON.parse(localStorage.getItem(keyStorage));
        }
        dataBuku.unshift(data);
        localStorage.setItem(keyStorage, JSON.stringify(dataBuku));
    }
}

function getDataBuku() {
    if (cekStorage) {
        return JSON.parse(localStorage.getItem(keyStorage)) || [];
    } else {
        return [];
    }
}

function renderShowData() {
    const dataBuku = getDataBuku();
    let content = "";
    content += `<div class="container-cards-books">`;
    dataBuku.forEach((object) => {
        if (object.isComplete === true) {
            object.isComplete = "Selesai dibaca";
        }
        if (object.isComplete === false) {
            object.isComplete = "Belum selesai dibaca";
        }
        content += `
        <div class="card-content">
            <ul>
                <li>ID : ${object.id}</li>
                <li>Title : ${object.judul}</li>
                <li>Author : ${object.author}</li>
                <li>Tahun : ${object.tahun}</li>
                <li class="status">Status : ${object.isComplete}</li>
                <button onclick="hapusBuku(${object.id})" class="btn-card">Hapus Buku</button>
            </ul>
        </div>
        `
    });
    content += `</div>`;
    wraperResult.innerHTML = content;
    jumlahBuku.innerHTML = "Jumlah Seluruh buku Anda : " + dataBuku.length;
}

function ubahBuku(i) {
    const dataBuku = getDataBuku();
    dataBuku.forEach((object) => {
        if (object.id === i) {
            if (object.isComplete === true) {
                const getIndex = dataBuku.indexOf(object);
                dataBuku[getIndex].isComplete = false;
                localStorage.setItem(keyStorage, JSON.stringify(dataBuku));
                document.querySelector(".btnSelesai").click();
            } else {
                const getIndex = dataBuku.indexOf(object);
                dataBuku[getIndex].isComplete = true;
                localStorage.setItem(keyStorage, JSON.stringify(dataBuku));
                document.querySelector(".btnBelumSelesai").click();
            }
        }
    })
}

function btnClassDitekan(data) {
    const dataBuku = getDataBuku();
    if (data.className == "btnSelesai") {
        let content = "";
        let count = 0;
        content += `<div class="container-cards-books">`;
        dataBuku.forEach((object) => {
            if (object.isComplete === true) {
                count++;
                if (object.isComplete === true) {
                    object.isComplete = "Selesai dibaca";
                }
                content += `
                <div class="card-content">
                    <ul>
                        <li>ID : ${object.id}</li>
                        <li>Title : ${object.judul}</li>
                        <li>Author : ${object.author}</li>
                        <li>Tahun : ${object.tahun}</li>
                        <li class="status">Status : ${object.isComplete}</li>
                        <button onclick="ubahBuku(${object.id}, event)" class="btn-card">
                        ${object.isComplete === "Selesai dibaca" ? "Belum Selesai Dibaca" : "Selesai Dibaca"}
                        </button>
                        <button onclick="hapusBuku(${object.id})" class="btn-card">Hapus Buku</button>
                    </ul>
                </div>
                `
            }
        })
        content += `</div>`;
        wraperResult.innerHTML = content;
        titleResult.innerHTML = "Selesai Dibaca";
        jumlahBuku.innerHTML = "Buku selesai dibaca : " + count;
    }

    if (data.className == "btnBelumSelesai") {
        let content = "";
        let count = 0;
        content += `<div class="container-cards-books">`;
        dataBuku.forEach((object) => {
            if (object.isComplete === false) {
                count++;
                if (object.isComplete === false) {
                    object.isComplete = "Belum selesai dibaca";
                }
                content += `
                <div class="card-content">
                    <ul>
                        <li>ID : ${object.id}</li>
                        <li>Title : ${object.judul}</li>
                        <li>Author : ${object.author}</li>
                        <li>Tahun : ${object.tahun}</li>
                        <li class="status">Status : ${object.isComplete}</li>
                        <button onclick="ubahBuku(${object.id})" class="btn-card">
                        ${object.isComplete === "Belum selesai dibaca" ? "Selesai Dibaca" : "Belum Selesai Dibaca"}
                        </button>
                        <button onclick="hapusBuku(${object.id})" class="btn-card">Hapus Buku</button>
                    </ul>
                </div>
                `
            }
        })
        content += `</div>`;
        wraperResult.innerHTML = content;
        titleResult.innerHTML = "Belum Selesai Dibaca";
        jumlahBuku
        jumlahBuku.innerHTML = "Buku Belum selesai dibaca : " + count;
    }

    if (data.className == "btnShowAll") {
        renderShowData();
        titleResult.innerHTML = "Semua Buku";
    }
}

btnAll.forEach((e) => {
    e.addEventListener("click", () => {
        btnClassDitekan(e);
    })
})

function hapusBuku(i) {
    const dataBuku = getDataBuku();
    dataBuku.forEach((object) => {
        if (object.id === i) {
            const getConfirms = confirm(`Anda yakin ingin menghapus Buku ${object.judul} ?`)
            if (getConfirms === true) {
                const getIndex = dataBuku.indexOf(object);
                dataBuku.splice(getIndex, 1);
                localStorage.setItem(keyStorage, JSON.stringify(dataBuku));
                renderShowData()
                titleResult.innerHTML = "Semua Buku";
            } else {
                alert(`Tidak jadi menghapus Buku ${object.judul}.`)
            }
        }
    })
}

document.querySelector("#cari").addEventListener("click", () => {
    let inputSearch = document.querySelector("#cariBuku");
    const dataBuku = getDataBuku();
    let content = "";
    let count = 0;
    content += `<div class="container-cards-books">`;
    let found = false;
    dataBuku.forEach(object => {
        if (object.judul === inputSearch.value) {
            count++;
            if (object.isComplete === true) {
                object.isComplete = "Selesai dibaca";
            }
            if (object.isComplete === false) {
                object.isComplete = "Belum selesai dibaca";
            }
            content += `
            <div class="card-content">
                <ul>
                    <li>ID : ${object.id}</li>
                    <li>Title : ${object.judul}</li>
                    <li>Author : ${object.author}</li>
                    <li>Tahun : ${object.tahun}</li>
                    <li class="status">Status : ${object.isComplete}</li>
                    <button onclick="ubahBuku(${object.id})" id="btnCardContent" class="btn-card">
                    ${object.isComplete === "Belum selesai dibaca" ? "Selesai Dibaca" : "Belum Selesai Dibaca"}
                    </button>
                    <button onclick="hapusBuku(${object.id})" class="btn-card">Hapus Buku</button>
                </ul>
            </div>
            `
            found = true;
        }
    })
    content += `</div>`;

    if (!found) {
        content = `<p style="text-align: center; margin-top: 90px; color: red; font-size: 30px; font-style: italic;">
        Tidak ada buku yang sesuai dengan ${inputSearch.value}
        </p>`;
    }
    wraperResult.innerHTML = content;
    jumlahBuku.innerHTML = "Jumlah Buku : " + count;
    inputSearch.value = "";
})

window.addEventListener('load', () => {
    if (localStorage.getItem(keyStorage) !== null) {
        renderShowData();
    }
})
