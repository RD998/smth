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
            localStorage.setItem('data', JSON.stringify(data));
            window.location.href = "hospitals.html";
            

        
        }
        else{
            console.log("failed to fetch data");
        }
    }

function Display_Clinics() {
    const data = JSON.parse(localStorage.getItem('data'));
    console.log(data[0]);
    ListHospital=``;
    for(i in data){
         const name=data[i]["name"];
         const id=data[i]["id"];
        ListHospital +=`
            <div class="card" data-aos="fade-in">
                <img src="assets/img/apps/proto.png" alt="Proto.io">
                <h3>${name}</h3>
                <p>Bring your idea to life in no time. The prototyping solution for all your needs.</p>
                <center><a class="button" href="https://proto.io/" target="">Open</a>
                <a onclick="Book(${id})" class="btn btn-success"  target="">Book</a></center>
            </div>`
    }
    document.getElementById("Hospitals_list").innerHTML=ListHospital;
  
    
    
}
function Book(x){
    localStorage.setItem('nameig', x);
    window.location.href="Doctor_Selection.html";
}
function goBack(){
    window.location.href="Preferences.html";
}

Inp=document.getElementById('department-select');
Inp.addEventListener('change', async function() {
    const option=Inp.value;
    const namo=localStorage.getItem('nameig');
    console.log(namo);
    checkedlist={
        "department":option,
        "fac_id":namo
    };
    const queryig=new URLSearchParams(checkedlist).toString();
    const response = await fetch(`https://pathfinder-backend-2u7u.onrender.com/doctors?${queryig}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                
            });
        if(response.ok) {
            const data = await response.json();
            console.log(data);
            Docotor=``;
        for(i in data){
            const name=data[i]["name"];
            const id=data[i]["id"];
            const department=data[i]["department"];
            const rating=4.5;
            Docotor +=`
                <div class="card" data-aos="fade-in">
    <img src="assets/img/apps/proto.png" alt="Doctor Image">
    <h3>${name}</h3>
    <p class="specialty">${department}</p>
    
    <div class="tags">
        <span class="tag">⭐ ${rating}</span>
        
    </div>
    
    <center>
        <a class="button" href="https://proto.io/" target="">Open</a>
        <a onclick="Slots('${id}')" class="button">Check slots</a>
    </center>
</div>`
        }
        document.getElementById("doctor-results").innerHTML=Docotor;

            
            

        
        }
        else{
            console.log("failed to fetch data");
        }
})
const enTranslations = {
    "select_dept": "Select a Department",
    "filter_desc": "Filter by specialty to see available doctors at this facility.",
    "choose_dept": "Select a Department...",
    "ortho": "Orthopedics",
    "book_btn": "Book",
    "open_btn": "Open"
};

let targetTranslations = {
    "select_dept": "Seleccione un Departamento",
    "book_btn": "Reservar"
};

function applyTranslations(useTargetLanguage) {
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        if (useTargetLanguage) {
            element.innerText = targetTranslations[key] || enTranslations[key];
        } else {
            element.innerText = enTranslations[key];
        }
    });
}
    /*
Sort=document.getElementById('Sort');
Sort.addEventListener('change', function() {
    const selectedOption = Sort.value;
    if(selectedOption === 'distance') {x
        Dist_Sort();}
    else if(selectedOption === 'rating') {
        Rat_Sort();}
});





















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
*/