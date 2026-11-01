async function submitComplaint(event) {
    event.preventDefault();

    const resultBox = document.getElementById("submissionResult");
    const form = document.getElementById("complaintForm");

    resultBox.innerText = "Submitting (this may take a few seconds)...";
    resultBox.style.color = "black";

    // Grab the URL and remove any accidental spaces
    let urlValue = document.getElementById("urlInput").value.trim();

    const payload = {
        category: document.getElementById("categoryInput").value,
        description: document.getElementById("descInput").value,
        url: urlValue === "" ? null : urlValue
    };

    try {
        const response = await fetch("https://whistle-drop-api.onrender.com/complaints", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        // 1. If it was successful
        if (response.ok) {
            const data = await response.json();
            resultBox.innerHTML = `
                <span style="color: green;">Success! Your tracking code is:</span><br>
                <span style="font-size: 24px; color: #0056b3; letter-spacing: 2px;">${data.hex_code}</span><br>
                <span style="color: red; font-size: 14px;">Save this code! You cannot recover it later.</span>
            `;
            form.reset();
        } 
        // 2. IF FASTAPI REJECTS THE DATA (Bad Request)
        else {
            // Read the raw text of the error so JS doesn't crash
            const errorText = await response.text(); 
            console.error("Server Error:", errorText);
            
            // Print the exact error to the screen
            resultBox.innerText = `Backend rejected data (Status ${response.status}): ${errorText}`;
            resultBox.style.color = "red";
        }
    } catch (error) {
        // 3. If the network completely fails
        resultBox.innerText = `Browser/Code Error: ${error.message}`;
        resultBox.style.color = "red";
    }
}
// --- CHECK STATUS LOGIC ---
async function checkStatus() {
    const hexCode = document.getElementById("hexInput").value.trim();
    const resultBox = document.getElementById("resultBox");

    if (!hexCode) {
        resultBox.innerText = "Please enter a hex code.";
        resultBox.style.color = "red";
        return;
    }

    resultBox.innerText = "Searching (this may take a few seconds)...";
    resultBox.style.color = "black";

    try {
        // Ensure this is exactly your Render URL
        const response = await fetch(`https://whistle-drop-api.onrender.com/complaints/${hexCode}`);
        
        // 1. If it was successful
        if (response.ok) {
            const data = await response.json();
            resultBox.innerHTML = `
                <p>Category: <strong>${data.category}</strong></p>
                <p>Status: <span style="color: #0056b3; font-size: 18px;">${data.status}</span></p>
            `;
        } 
        // 2. If the hex code is just wrong
        else if (response.status === 404) {
            resultBox.innerText = "Complaint not found. Check your hex code.";
            resultBox.style.color = "red";
        } 
        // 3. IF FASTAPI REJECTS IT (e.g., 422 Validation Error)
        else {
            const errorText = await response.text(); 
            resultBox.innerText = `Backend Error (${response.status}): ${errorText}`;
            resultBox.style.color = "red";
        }
    } catch (error) {
        // 4. Print the exact browser error instead of a generic message
        resultBox.innerText = `Browser/Code Error: ${error.message}`;
        resultBox.style.color = "red";
    }
}
function goToCheckStatus() {
    window.location.href = "status.html";
}
function goToSubmit() {
    window.location.href = "index.html";
}
function BTH(){
    window.location.href = "index.html";
}
async function Login(){
    pwd=document.getElementById("dd").value;
    response=fetch("https://whistle-drop-api.onrender.com/complaints/",{
        method:"GET",
        headers:{
            "X-Mod-Password":pwd
        }
    })
    if(response.ok){
         data = await response.json();
        window.location.href = "admin.html";
        document.getElementById("complaint1").innerText=data.complaints;
        
    }
    else{
        alert("Invalid password..Your session is terminated");
        xq=document.getElementById("Login1").value;
        xq2=document.getElementById("Login2").value;
        xq2.style.display="none";
        xq.disabled=true;

    }
}