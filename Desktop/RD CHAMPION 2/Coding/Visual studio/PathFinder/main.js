let data = {};
let selectedSlotId = null;
const targetDateStr = "2026-11-07";

async function Preferences() {
    const x0 = document.getElementById('language1').value;
    const x1 = document.querySelectorAll('input[name="accessibility"]');
    const x2 = Array.from(x1).map(cb => cb.value);
    let checkedlist = {};
    
    x1.forEach(cb => {
        if (cb.checked) {
            checkedlist[cb.value] = true;
        }
    });
    
    console.log(checkedlist);
    console.log(x0);
    
    const lang = document.getElementById('language1').value;
    checkedlist["language"] = lang;
    const queryig = new URLSearchParams(checkedlist).toString();
    const response = await fetch(`https://pathfinder-backend-2u7u.onrender.com/facilities?${queryig}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    
    if (response.ok) {
        const resData = await response.json();
        console.log(resData);
        localStorage.setItem('data', JSON.stringify(resData));
        window.location.href = "hospitals.html";
    } else {
        console.log("failed to fetch data");
    }
}

function Display_Clinics() {
    const clinicData = JSON.parse(localStorage.getItem('data'));
    if (!clinicData) return;
    console.log(clinicData[0]);
    let ListHospital = ``;
    
    for (let i in clinicData) {
        const name = clinicData[i]["name"];
        const id = clinicData[i]["id"];
        const latitude = clinicData[i]["latitude"];
        const longitude = clinicData[i]["longitude"];
        const rating = clinicData[i]["rating"];
        
        ListHospital += `
            <div class="card" data-aos="fade-in">
                <center>
                    <img src="image2.png" alt="Medical facility">
                </center>
                <h3>${name}</h3>
                <div class="tags">
                    <span class="tag">⭐ ${rating}</span>
                </div>
                <p>Bring your idea to life in no time. The prototyping solution for all your needs.</p>
                <center>
                    <a class="btn btn-info" href="https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}" target="_blank">Navigate</a>
                    <a onclick="Book(${id})" class="btn btn-success" target="">Book</a>
                </center>
            </div>`;
    }
    
    const hospitalListEl = document.getElementById("Hospitals_list");
    if (hospitalListEl) {
        hospitalListEl.innerHTML = ListHospital;
    }
}

function Book(x) {
    localStorage.setItem('nameig', x);
    window.location.href = "Doctor_Selection.html";
}

function goBack() {
    window.location.href = "Preferences.html";
}

function Slots(x) {
    localStorage.setItem('doc_id', x);
    window.location.href = "Slot_booking.html";
}

const dateInput = document.getElementById('appointment-date');
const slotsContainer = document.getElementById('slots-container');
const bookedContainer = document.getElementById('booked-container');
const confirmBtn = document.getElementById('confirm-btn');

if (dateInput) {
    dateInput.value = targetDateStr;
    dateInput.min = targetDateStr;
    dateInput.max = targetDateStr;
}

if (confirmBtn) {
    confirmBtn.addEventListener('click', Book_Slots);
}

async function Book_Slots() {
    if (!selectedSlotId) return;
    
    const user_id = localStorage.getItem("user_id") || 1;
    localStorage.setItem("user_id", user_id);

    const response = await fetch(`https://pathfinder-backend-2u7u.onrender.com/slots/${selectedSlotId}/book?user_id=${user_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        const bookedData = await response.json();
        console.log(bookedData);
        alert("Booking Successful!");
        if (confirmBtn) confirmBtn.disabled = true;
        Show_slot();
    } else {
        console.log("Failed to book slot");
    }
}

async function Load_Dashboard() {
    if (!bookedContainer) return;

    const user_id = localStorage.getItem("user_id") || 1;
    localStorage.setItem("user_id", user_id);

    const response = await fetch(`https://pathfinder-backend-2u7u.onrender.com/appointments?user_id=${user_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        const myAppointments = await response.json();
        localStorage.setItem("my_appointments", JSON.stringify(myAppointments));
        bookedContainer.innerHTML = '';

        if (myAppointments.length === 0) {
            bookedContainer.innerHTML = '<p style="text-align: center; color: var(--text-muted); margin: 0;">No booked appointments found.</p>';
            return;
        }

        myAppointments.forEach(slot => {
            const datePart = slot.start_time.split('T')[0];
            const timeString = new Date(slot.start_time).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });

            const item = document.createElement('div');
            item.className = 'booked-item';
            item.innerHTML = `
                <div class="booked-info">
                    <span class="booked-time">${datePart} at ${timeString}</span>
                    <span class="booked-meta">Doctor ID: ${slot.doctor_id} | Slot #${slot.id}</span>
                </div>
                <button class="cancel-btn" onclick="Cancel_Slot(${slot.id})">Cancel Appointment</button>
            `;
            bookedContainer.appendChild(item);
        });
    } else {
        console.log("Failed to load appointments");
    }
}

async function Cancel_Slot(slotId) {
    const user_id = localStorage.getItem("user_id") || 1;

    const response = await fetch(`https://pathfinder-backend-2u7u.onrender.com/appointments/${slotId}/cancel?user_id=${user_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        const cancelledData = await response.json();
        console.log(cancelledData);
        alert("Appointment Cancelled!");
        Load_Dashboard();
        Show_slot();
    } else {
        console.log("Failed to cancel appointment");
    }
}

async function Show_slot() {
    if (!slotsContainer) return;
    
    const x = localStorage.getItem("doc_id");
    const checkedlist = {
        "doctor_id": x,
        "only_available": "true"
    };

    const queryig = new URLSearchParams(checkedlist).toString();
    const response = await fetch(`https://pathfinder-backend-2u7u.onrender.com/slots?${queryig}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    
    if (response.ok) {
        const slotData = await response.json();
        selectedSlotId = null;
        slotsContainer.innerHTML = '';

        const filteredData = slotData.filter(slot => slot.start_time.startsWith(targetDateStr));

        if (filteredData.length === 0) {
            slotsContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">No slots available.</p>';
            return;
        }

        filteredData.forEach(slot => {
            const timeString = new Date(slot.start_time).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });

            const btn = document.createElement('button');
            btn.className = 'slot-btn';
            btn.innerText = timeString;

            if (!slot.is_available) {
                btn.disabled = true;
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed';
            } else {
                btn.onclick = () => {
                    document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    selectedSlotId = slot.id;
                    if (confirmBtn) confirmBtn.disabled = false;
                };
            }

            slotsContainer.appendChild(btn);
        });
    }
}

const Inp = document.getElementById('department-select');

if (Inp) {
    Inp.addEventListener('change', async function() {
        const option = Inp.value;
        const namo = localStorage.getItem('nameig');
        console.log(namo);
        
        const checkedlist = {
            "department": option,
            "fac_id": namo
        };
        
        const queryig = new URLSearchParams(checkedlist).toString();
        const response = await fetch(`https://pathfinder-backend-2u7u.onrender.com/doctors?${queryig}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        if (response.ok) {
            const docData = await response.json();
            console.log(docData);
            
            let Docotor = ``;
            
            for (let i in docData) {
                const name = docData[i]["name"];
                const id = docData[i]["id"];
                const department = docData[i]["department"];
                
                Docotor += `
                    <div class="card" data-aos="fade-in">
                        <img src="image.png" alt="Doctor Image">
                        <h3>${name}</h3>
                        <p class="specialty">${department}</p>
                        <center>
                            <a onclick="Slots('${id}')" class="button">Check slots</a>
                        </center>
                    </div>`;
            }
            document.getElementById("doctor-results").innerHTML = Docotor;

        } else {
            console.log("failed to fetch data");
        }
    });
}
function Start_Booking(){
    window.location.href="Preferences.html";
}