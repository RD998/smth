async function Preferences() {
    x0=document.getElementById('language1').value;
    x1=document.querySelectorAll('input[name="accessibility"]:checked');
    x2=Array.from(x1).map(cb => cb.value);

    console.log(x0,x2);
/*const response = await fetch('/api/preferences');
method: 'Post',
x= await response.json();
}*/}

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
