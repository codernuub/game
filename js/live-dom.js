const nav = document.querySelector(".nav");
const form = document.querySelector("form");
const popup = document.querySelector('.popup');
const [students, requests] = document.querySelectorAll('.sessions');
let prev = window.innerWidth >= 900 ? 1 : 0, modal = false;

/**********************LIB FUNCTIONS**************************/
function stringToHtml(htmlStr) {
    const doc = new DOMParser();
    return doc.parseFromString(htmlStr, 'text/html').body.children[0]
}

function handleEmptySection(element, len, msg) {
    element.classList.toggle('no-sessions');
    element.innerHTML = msg ? `<p>${msg}</p>` : '';
}

function killChild(parent, childId) {
    parent.removeChild(parent.querySelector(`#s${childId}`))
}


/**********************NAV CODE**************************/
hnleColor(prev);
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
    const htmlStr = modalHtmlTemp(data);
    popup.appendChild(stringToHtml(htmlStr));
    popup.classList.remove('close-popup');
    modal = true;
}

function closePopup() {
    popup.classList.add('close-popup');
    popup.innerHTML = "";
    modal = false;
}


/**********************manage room data in DOM**************************/
function buildData(parent, data, template) {
    handleEmptySection(parent, true, null);
    data.forEach(d => {
        const child = stringToHtml(template(d))
        parent.appendChild(child)
    })
}
//handle kick or ban request
function manageStudent(event) {
    const action = event.target.id || null;
    if(!action) return;
    showPopup({
        head: `${action} student`,
        type: action,
        data: event.path[1].className,
        func: `${action}Student`
    })
}

/*socket related functions*/
function kickStudent(event) {
    console.log("kicked " + event.target.id);
    killChild(students, event.target.id);
    closePopup();
}
function banStudent(event) {
    console.log("banned " + event.target.id);
    closePopup();
}
function rejectRequest() {
    console.log('request rejected');
}
function acceptRequest() {
    console.log('request accepted');
}
function endSession() {
    closePopup();
}
/*socket related functions*/

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
const reqs = [
    { id: '19BCA031', name: 'Ayush Kumar' },
    { id: '19BCA028', name: 'Azhar' },
    { id: '19BCA041', name: 'Abhinav Bright' },
    { id: '19BCA028', name: 'Mohammed Shakir' },
    { id: '19BCA029', name: 'Prashant' },
    { id: '19BCA043', name: 'Aamish' }
]

buildData(students, stu, studentHtmlTemp);
buildData(requests, reqs, reqHtmlTemp)