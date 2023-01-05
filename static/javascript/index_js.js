function storecheckindate(value){
    localStorage.setItem("checkindate" , value)
}
function storecheckoutdate(value){
    localStorage.setItem("checkoutdate" , value)
}
function roomtype(value){
    if(value == '1'){
        localStorage.setItem("roomtype" , "ห้องปกติ")
    }
    else if(value == '2'){
        localStorage.setItem("roomtype" , "ห้องพิเศษ")
    }
    else if(value == '3'){
        localStorage.setItem("roomtype" , "ห้องสุดหรู")
    }
}