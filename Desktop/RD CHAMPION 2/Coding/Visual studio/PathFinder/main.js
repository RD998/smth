data = {};
async function Preferences() {
    const x0=document.getElementById('language1').value;
    const x1=document.querySelectorAll('input[name="accessibility"]');
    const x2=Array.from(x1).map(cb => cb.value);
    checkedlist={};
    x1.forEach(cb => {
        checkedlist[cb.value] = cb.checked;});

        console.log(checkedlist);
    
    console.log(x0);
        const lang=document.getElementById('language1').value;
        checkedlist["language"]=lang;
        const queryig=new URLSearchParams(checkedlist).toString();
        const response = await fetch(`https://pathfinder-backend-2u7u.onrender.com/facilities?${queryig}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                
            });
        if(response.ok) {
            const data = await response.json();
            console.log(data);
            

        
        }
        else{
            console.log("failed to fetch data");
        }
    }
function Display_Clinics() {
    
}
    /*
Sort=document.getElementById('Sort');
Sort.addEventListener('change', function() {
    const selectedOption = Sort.value;
    if(selectedOption === 'distance') {
        Dist_Sort();}
    else if(selectedOption === 'rating') {
        Rat_Sort();}
});*/





















//                            CUSTOM LOGIN
 function showCustomPrompt() {
            var username = sessionStorage.getItem('username');
            if (!username) {
                var promptContainer = document.createElement('form');
                promptContainer.className = 'custom-prompt-container';

                var promptMessage = document.createElement('p');
                promptMessage.textContent = "What's Your Name ?";

                var inputField = document.createElement('input');
                inputField.type = 'text';

                var submitButton = document.createElement('button');
                submitButton.type = 'submit';
                submitButton.textContent = 'Submit';

                submitButton.addEventListener('click', function () {
                    var name = inputField.value.trim();
                    if (name !== '') {
                        sessionStorage.setItem('username', name);
                        displayUsername(name);
                        promptContainer.remove();
                    }
                });

                promptContainer.appendChild(promptMessage);
                promptContainer.appendChild(inputField);
                promptContainer.appendChild(submitButton);

                document.body.appendChild(promptContainer);
                inputField.focus();
            } else {
                displayUsername(username);
            }
        }

        function displayUsername(name) {
            var usernameElement = document.getElementById('username');
            usernameElement.textContent = name;
        }
