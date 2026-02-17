let medicines = [];
let historyData = [];

function showSection(id, element) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
    element.classList.add('active');
}

function addMedicine() {
    const input = document.getElementById("medicineName");
    const name = input.value.trim();

    if (name === "") {
        alert("Please enter medicine name");
        return;
    }

    medicines.push(name);

    const li = document.createElement("li");
    li.textContent = name;
    document.getElementById("medicineList").appendChild(li);

    input.value = "";
}

async function checkInteractions() {

    if (medicines.length < 2) {
        alert("Add at least two medicines");
        return;
    }

    const resultBox = document.getElementById("resultBox");
    resultBox.style.display = "block";
    resultBox.innerHTML = "Checking...";
    resultBox.className = "";

    try {
        const response = await fetch("http://127.0.0.1:8000/check-interaction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ drugs: medicines })
        });

        if (!response.ok) {
            throw new Error("Server error");
        }

        const data = await response.json();

        resultBox.innerHTML = `
            <strong>Severity:</strong> ${data.severity}<br>
            ${data.message}
        `;

        if (data.severity === "Severe") {
            resultBox.classList.add("severe");
        } else if (data.severity === "Moderate") {
            resultBox.classList.add("moderate");
        } else {
            resultBox.classList.add("minor");
        }

        // Save to history
        historyData.push({
            medicines: medicines.join(", "),
            severity: data.severity
        });

        updateReport();

        // Reset medicines
        medicines = [];
        document.getElementById("medicineList").innerHTML = "";

    } catch (error) {
        resultBox.innerHTML = "❌ Cannot connect to backend.";
        resultBox.classList.add("severe");
    }
}

function updateReport() {
    const tbody = document.querySelector("#reportTable tbody");
    tbody.innerHTML = "";

    let severeCount = 0;

    historyData.forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.medicines}</td>
            <td>${item.severity}</td>
        `;

        if (item.severity === "Severe") severeCount++;

        tbody.appendChild(row);
    });

    document.getElementById("totalChecks").textContent = historyData.length;
    document.getElementById("severeCount").textContent = severeCount;
}
