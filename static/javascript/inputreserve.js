document.getElementById('roomid').value = localStorage.getItem('roomid')
document.getElementById('roomprice').value = localStorage.getItem('roomprice')
document.getElementById('reserve_checkindate').value = localStorage.getItem('checkindate')
document.getElementById('reserve_checkoutdate').value = localStorage.getItem('checkoutdate')

// carddata
var roomid = localStorage.getItem('roomid')
var chackin = localStorage.getItem('checkindate')
var chackout = localStorage.getItem('checkoutdate')
var roomtype = localStorage.getItem('roomtype')
var roomprice = localStorage.getItem('roomprice')
document.getElementById('showroomid').innerHTML = 'เลขที่ห้อง : ' + roomid;
document.getElementById('checkin-out').innerHTML = chackin + ' - ' + chackout;
document.getElementById('roomtype').innerHTML = 'ประเภทห้อง : ' + roomtype;
document.getElementById('showroomprice').innerHTML = roomprice + ' บาท'

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://127.0.0.1:5000/selectprovinces", requestOptions)
  .then(response => response.json())
  .then(province => {
    province.forEach((junwat , index)=>{
      document.getElementById('province').options.add(new Option(junwat.name_th, junwat.id))
    })
  })
  .catch(error => console.log('error', error));

// -----------------------------------------------------------------------

function setamphures(value){
  document.getElementById("amphures").innerHTML = "<select class='form-select' id='amphures' aria-label='Default select example'></select>"
  selectjunwat = parseInt(value)
  showamphures(selectjunwat)
}

function showamphures(selectjunwat){
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://127.0.0.1:5000/selectamphures", requestOptions)
    .then(response => response.json())
    .then(amphures => {
      amphures.forEach((amphures , index)=>{
        //console.log(amphures.province_id ,selectjunwat )
        if(amphures.province_id === selectjunwat){
          document.getElementById('amphures').options.add(new Option(amphures.name_th, amphures.id))
        }
        else{
          //console.log('no match condition')
        }
      })
    })
    .catch(error => console.log('error', error));
}

// -----------------------------------------------------------------------

function settumbon(value){
  document.getElementById("tumbon").innerHTML = "<select class='form-select' id='tumbon' aria-label='Default select example'></select>"
  selectamphur = parseInt(value)
  showtumbon(selectamphur)
}

function showtumbon(selectamphur){
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://127.0.0.1:5000/selectdistricts", requestOptions)
    .then(response => response.json())
    .then(tumbon => {
      tumbon.forEach((tumbon , index)=>{
        if(tumbon.amphure_id === selectamphur){
          document.getElementById('tumbon').options.add(new Option(tumbon.name_th, tumbon.id))
        }
        else{
          //console.log('no match condition')
        }
      })
    })
    .catch(error => console.log('error', error));
}

// ---------------------------------------------------------------------------

function setpostcode(value){
  selectombon = parseInt(value)
  showpostcode(selectombon)
}

function showpostcode(selectombon){
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  fetch("http://127.0.0.1:5000/selectdistricts", requestOptions)
    .then(response => response.json())
    .then(tumbon => {
      tumbon.forEach((tumbon , index)=>{
        if(tumbon.id == selectombon){
          document.getElementById('postcode').value = tumbon.zip_code
          document.getElementById('postcode').ariaPlaceholder = tumbon.zip_code
        }
        else{
          //console.log('no match condition')
        }
      })
    })
    .catch(error => console.log('error', error));
}

function savename(){
  namesave = document.getElementById('customer_name').value;
  localStorage.setItem('username' , namesave)
}