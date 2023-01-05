const myModal = new bootstrap.Modal(document.getElementById('roomcalculate'))
var sumadult;
console.log(sumadult)
function callvalue(){
    console.log(sumadult)
}

checkin = localStorage.getItem("checkindate")
checkout = localStorage.getItem("checkoutdate")
document.getElementById('checkin').innerHTML = "วันเข้าพัก : " + checkin + ' ' + "วันออกห้องพัก : " + checkout;

function showroomprice(room_number,room_detail,room_price){
    // console.log(room_number ,room_detail , room_price)
    localStorage.setItem("roomid" , room_number);
    localStorage.setItem("roomprice", room_price);
    // localStorage.setItem("roomprice_static", room_price);
    roomprice = localStorage.getItem("roomprice")
    document.getElementById('roomnumber').innerHTML = room_number;
    document.getElementById('roomdetail').innerHTML = room_detail;
    document.getElementById('roomprice').innerHTML = 'ราคาห้อง : ' + roomprice;
    myModal.show()
}

function peopleprice(){
    let adult = document.getElementById("adultprice").value;
    let kid = document.getElementById("kidprice").value;
    if(adult >= 0 && kid >= 0){
        getprice = localStorage.getItem("roomprice");
        defaultprice = parseInt(getprice)
        console.log(defaultprice)
        sumadult = ((300 * adult) + (100 * kid)) + defaultprice;
        document.getElementById('roomprice').innerHTML = 'ราคาห้อง : ' + sumadult;
        // localStorage.setItem("roomprice", sumadult);
    }
    else{
        console.log("no match condition")
    }
    callvalue()
}

function cleardata(){
    localStorage.removeItem("adultcal")
    // localStorage.removeItem("roomprice_static")
    sumadult = 0;
}

function saveroom(){
    if(sumadult == undefined){
    }
    else if(sumadult != undefined){
        localStorage.setItem('roomprice', sumadult)
    }
}