/**********************HTML Templates**************************/
//student html template
function studentHtmlTemp({ id, name, ban }) {
    return `<div id=s${id} class="student ${ban ? 'ban' : ''}">
        <span id="profile">
        <i class="fa fa-user"></i>
        </span>
        <div>
            <h4>${name}</h4>
            <h5>${id}</h5>
        </div>
        
        <span class="${id}" onclick="manageStudent(event)">
            <i id="${ban ? 'unban' : 'ban'}"  class="fa fa-${ban ? 'ban' : 'circle-blank'}">${ban ? '' : '&nbsp;ban'}</i>
            <i  style="color: #f44336;font-weight:600" id="kick" class="fas fa-sign-out-alt">&nbsp;kick</i>
        </span>
    </div>`;
}

//modal html template
function modalHtmlTemp({ head, type, data, func }) {
    return ` <div>
    <h4>${head}</h4>
    <p class="popup-msg">Are you sure you want to ${type} ${data || 'this session'} ?</p>
    <div class="buttons">
        <button onclick="closePopup()">No</button>
        <button id="${data}" onclick="${func}(event)">Yes</button>
    </div>
</div>`
};

//request html temp
function reqHtmlTemp({ name, id }) {
    return `    <div class="request">
   <span id="profile">
   <i class="fa fa-user"></i>
   </span>
   <div>
       <h4>${name}</h4>
       <h5>${id}</h5>
   </div>
   
   <span>
       <i style="color: #f44336;" onclick="rejectRequest()" class="fa fa-remove"></i>
       <i style="color: green;" onclick="acceptRequest()" class="fas fa-check"></i>
   </span>
</div>`
}
