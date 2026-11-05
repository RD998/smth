function searchWebsite() {
    document.getElementById('recom').style.display = "none";
    let filter = document.getElementById('search').value.toUpperCase();

    let appcards = document.getElementById('appcards');
    let card = appcards.getElementsByTagName('div');

    for (var i = 0; i < card.length; i++) {
        let h = card[i].getElementsByTagName('h3')[0];

        let textValue = h.textContent || h.innerHTML;

        if (textValue.toUpperCase().indexOf(filter) > -1) {
            card[i].style.display = "block";
        }
        else {
            card[i].style.display = "none";
        }
    }
}

if (document.getElementById('search').value.length === 0){
    document.getElementById('recom').style.display = "block";
}

function showCustomPrompt() {
    var username = sessionStorage.getItem('username');
    if (!username) {
        var promptContainer = document.createElement('div');
        promptContainer.className = 'custom-prompt-container';

        var promptMessage = document.createElement('p');
        promptMessage.textContent = "What's Your Name ?";

        var inputField = document.createElement('input');
        inputField.type = 'text';

        var submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';

        submitButton.addEventListener('click', function() {
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

window.onload = showCustomPrompt;
