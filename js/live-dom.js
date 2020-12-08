const nav = document.querySelector(".nav");
const popup = document.querySelector('.popup');
const [students, info, requests] = document.querySelectorAll('.sessions');

let prev = 0, modal = false, modalType = null;

/*navigation code*/
function navigateToPage(id) {
    //highlight opened section
    hnleColor(id)
    document.querySelector(".bg").style.marginLeft = 20 * id + "%";

    //section 
    if (!prev || !id) handleMessage();
    let m = 0 ? 0 : 5 - 100 * (id - 1);
    document.querySelector(".s1").style.marginLeft = m + "%";
    prev = id;
}

function hnleColor(id) {
    nav.children[prev].style.color = "#2c393f";
    nav.children[id].style.color = "white";
}

function handleMessage() {
    document.querySelector('.msg-block').classList.toggle('msg-block-close');
}

/**********************POPUP FUNCTIONS*************************/

function showPopup(data) {
    const htmlStr = modalHtmlStr(data);
    popup.appendChild(stringToHtml(htmlStr));
    popup.classList.remove('close-popup');
    modal = true;
    modalType = data['type'];
}

function closePopup() {
    popup.classList.add('close-popup');
    popup.innerHTML = "";
    modal = false;
    modalType = null;
}

/**********************HTML Templates**************************/
//student html template
function studentHtmlStr({ id, name, ban }) {
    return `<div id=${id} class="student ${ban ? 'ban' : ''}">
        <span id="profile">
        <i class="fa fa-user"></i>
        </span>
        <div>
            <h4>${name}</h4>
            <h5>${id}</h5>
        </div>
        
        <span>
            <i class="fa fa-${ban ? 'ban' : 'circle-blank'}">${ban ? '' : '&nbsp;ban'}</i>
            <i style="color: #f44336;font-weight:600" class="fas fa-sign-out-alt">&nbsp;kick</i>
        </span>
    </div>`;
}

//modal html template
function modalHtmlStr({ head, type, data, func }) {
    return ` <div>
    <h4>${head}</h4>
    <p class="popup-msg">Are you sure you want to ${type} ${data || 'this session'} ?</p>
    <div class="buttons">
        <button onclick="closePopup()">No</button>
        <button onclick="${func}()">Yes</button>
    </div>
</div>`
};

//request html temp
function reqHtmlTemplate(name) {

}


/**********************LIB FUNCTIONS**************************/
function stringToHtml(htmlStr) {
    const doc = new DOMParser();
    return doc.parseFromString(htmlStr, 'text/html').body.children[0]
}

function killChild(parentId, childId) {

}

/**********************manage room data in DOM**************************/
function buildStudents(students) {
    const stuEl = document.querySelector('.students');
    students.forEach(student => {
        stuEl.appendChild(stringToHtml(studentHtmlStr(student)))
    })
}

function kickStudent() {

}

function banStudent() {
    console.log("student banned");
}

function rejectRequest() {

}
function acceptRequest() {

}
function endSession() {
    closePopup();
}

/**********************Event LISTENERS**************************/
//navigation
nav.addEventListener("click", (e) => {
    const id = Number.parseInt(e.target.id);
    if (modal) return;
    if (e.target.id && prev !== id) {
        if (id !== 4) {
            navigateToPage(id);
        } else {
            showPopup({ head: 'End session', type: 'end', data: null, func: 'endSession' });
            modal = true;
        }
    }
});

//message


/**********************TEST FUNCTIONS**************************/
const stu = [
    { id: '19BCA031', name: 'Ayush Kumar' },
    { id: '19BCA028', name: 'Azhar' },
    { id: '19BCA041', name: 'Abhinav Bright' },
    { id: '19BCA028', name: 'Mohammed Shakir', ban: true },
    { id: '19BCA029', name: 'Prashant' },
    { id: '19BCA043', name: 'Aamish' }
]

buildStudents(stu)