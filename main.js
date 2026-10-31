// --- SUBMIT COMPLAINT LOGIC ---
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
async function checkStatus() {
    // 1. Get the hex code the user typed in the box
    const hexCode = document.getElementById("hexInput").value;
    const resultBox = document.getElementById("resultBox");

    // Clear previous results while loading
    resultBox.innerText = "Loading...";

    try {
        // 2. Send the GET request to your FastAPI server
        // (Assuming your Python server is running on localhost:8000)
        const response = await fetch(`http://localhost:8000/complaints/${hexCode}`);

        // 3. Check if the server found the complaint (Status 200 OK)
        if (response.ok) {
            // Convert the raw response into a usable JSON object
            const data = await response.json();
            
            // 4. Update the HTML with the data you received
            resultBox.innerHTML = `
                <p>Category: ${data.category}</p>
                <p>Current Status: <span style="color: blue;">${data.status}</span></p>
            `;
        } 
        // 5. Handle the 404 error if they typed the wrong hex code
        else if (response.status === 404) {
            resultBox.innerText = "Error: Complaint not found. Check your hex code.";
            resultBox.style.color = "red";
        } 
        else {
            resultBox.innerText = "An unexpected error occurred.";
        }
    } catch (error) {
        // This catches network errors (e.g., if your Python server is turned off)
        resultBox.innerText = "Failed to connect to the server.";
    }
}
function goToCheckStatus() {
    window.location.href = "status.html";
}
function goToSubmit() {
    window.location.href = "index.html";
}
