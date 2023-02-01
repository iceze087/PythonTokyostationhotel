var roomprice = localStorage.getItem('roomprice')
paypal.Buttons({
    // Sets up the transaction when a payment button is clicked
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: roomprice // Can also reference a variable or function
          }
        }]
      });
    },
    // Finalize the transaction after payer approval
    onApprove: (data, actions) => {
      return actions.order.capture().then(function(orderData) {
        // Successful capture! For dev/demo purposes:
        console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
        const transaction = orderData.purchase_units[0].payments.captures[0];
        Swal.fire(
          'จ่ายเงินเสร็จสิ้น',
          `Transaction ${transaction.status}: ${transaction.id}`,
          'success'
        ).then(() => {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          var customername = localStorage.getItem('username')
          var name = JSON.stringify([
              customername
          ]);

          var updatepayment = {
            method: 'PUT',
            headers: myHeaders,
            body: name,
            redirect: 'follow'
          };

          fetch("http://127.0.0.1:5000/updatepayment", updatepayment)
            .then(response => response.text())
            .then(result => {
              console.log(result)
              window.location.href = 'thankforpay';
            })
            .catch(error => console.log('error', error));
      })
         
      });
    }
  }).render('#paypal-button-container');
  