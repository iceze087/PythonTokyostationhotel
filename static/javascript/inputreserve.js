function setprovince(province){
  console.log(province)
  province.forEach((junwat , index)=>{
    document.getElementById('province').options.add(new Option(junwat.name_th, junwat.id))
    //console.log("<option value='"+umper.id+"'>"+umper.name_th+"</option>")
  })
}

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://127.0.0.1:5000/selectprovinces", requestOptions)
  .then(response => response.json())
  .then(province => {
    setprovince(province)
  })
  .catch(error => console.log('error', error));

// -----------------------------------------------------------------------

function setamphures(value){
  selectjunwat = parseInt(value)

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://127.0.0.1:5000/selectamphures", requestOptions)
    .then(response => response.json())
    .then(amphures => {
      amphures.forEach((amphures , index)=>{
        console.log(amphures.province_id ,selectjunwat )
        if(amphures.province_id === selectjunwat){
          document.getElementById('amphures').options.add(new Option(amphures.name_th, amphures.id))
        }
        else{
          console.log('no match condition')
        }
      })
    })
    .catch(error => console.log('error', error));
}



