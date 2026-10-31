async function submitComplaint(event) {
    // 1. Prevent the form from refreshing the page
    event.preventDefault();

    // 2. Grab the data the user typed in
    const category = document.getElementById("categoryInput").value;
    const description = document.getElementById("descInput").value;
    const url = document.getElementById("urlInput").value;

    // 3. Package it into a JavaScript object exactly as FastAPI expects
    const payload = {
        category: category,
        description: description,
        url: url === "" ? null : url  // FastAPI wants null if it's empty, not an empty string
    };

    try {
        // 4. Send the POST request
        const response = await fetch("http://localhost:8000/complaints", {
            method: "POST", // Tell the server we are creating new data
            headers: {
                "Content-Type": "application/json" // Tell the server to expect JSON
            },
            body: JSON.stringify(payload) // Convert the JS object into a raw JSON string
        });

        const data = await response.json();

        // 5. Handle the response
        if (response.ok) {
            // Display the hex code so the user can save it
            document.getElementById("submissionResult").innerText = 
                `Success! Your tracking hex code is: ${data.hex_code}. Please save this somewhere safe.`;
            
            // Clear the form for the next user
            document.getElementById("complaintForm").reset();
        } else {
            document.getElementById("submissionResult").innerText = "Error submitting complaint.";
            document.getElementById("submissionResult").style.color = "red";
        }
    } catch (error) {
        document.getElementById("submissionResult").innerText = "Failed to connect to the server.";
        document.getElementById("submissionResult").style.color = "red";
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