 
document.addEventListener("DOMContentLoaded", function() {
    const bankSelect = document.getElementById('bank');
    const accountNumberInput = document.getElementById('account-number');
    const accountHolderLabel = document.getElementById('account-holder');
    const accountHolderinput = document.getElementById('account-holder-input');
    

    let bankNumberChanged = false; 
    accountNumberInput.addEventListener('input', function() {
        bankNumberChanged = true;     });

    accountNumberInput.addEventListener('blur', function() {
        if (bankNumberChanged) {
            updateAccountHolderLabel(); 
            bankNumberChanged = false; 
        }
    });
    
 

    function updateAccountHolderLabel() {
        const selectedBank = bankSelect.options[bankSelect.selectedIndex].text;
        const bin = selectedBank.split('(')[1].split(')')[0].trim(); 
        const bankNumber = accountNumberInput.value;
        var data = JSON.stringify({
            "bin": bin,
            "accountNumber": bankNumber
            });
            var config = {
                  method: 'post',
                  url: 'https://api.vietqr.io/v2/lookup',
                  headers: { 
                    'x-client-id': '7cf6e9ff-b41e-441f-a73e-7e5db0daac55', 
                    'x-api-key': '6a2a1f78-66dc-4f95-bd72-4497e53f5b3f', 
                    'Content-Type': 'application/json',
                  },
                  data : data
                };
                
                axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    const accountName = response.data.data.accountName; 
                    accountHolderLabel.textContent = accountName; 
                    accountHolderinput.value = accountName; 
                })
                .catch(function (error) {
                    console.log(error);
                    accountHolderLabel.textContent = error;
                });            

            console.log(data);
    }
});