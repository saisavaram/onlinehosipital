const doctorsData = {
  "CityCare Hospital": [
    {
      name: "Dr. Asha Mehta",
      specialty: "Cardiologist",
      slots: ["10:00 AM", "11:30 AM", "3:00 PM"]
    },
    {
      name: "Dr. Rahul Singh",
      specialty: "Neurologist",
      slots: ["9:30 AM", "1:00 PM", "4:30 PM"]
    }
  ],
  "MediLife Clinic": [
    {
      name: "Dr. Priya Sharma",
      specialty: "Dermatologist",
      slots: ["10:00 AM", "1:00 PM", "5:00 PM"]
    },
    {
      name: "Dr. Arjun Das",
      specialty: "Pediatrician",
      slots: ["9:00 AM", "12:00 PM", "2:30 PM"]
    }
  ]
};

const hospitalName = new URLSearchParams(window.location.search).get('id');
const hospitalDetailDiv = document.getElementById("hospitalDetail");
const doctorListDiv = document.getElementById("doctorList");

if (!hospitalName) {
  hospitalDetailDiv.innerHTML = "<p>Hospital not found.</p>";
} else {
  hospitalDetailDiv.innerHTML = `
    <h1>${hospitalName}</h1>
    <p><strong>Address:</strong> Sample Address for ${hospitalName}</p>
    <p><strong>Specialties:</strong> ${
      (doctorsData[hospitalName] || []).map(d => d.specialty).join(", ")
    }</p>
  `;

  const doctors = doctorsData[hospitalName] || [];

  if (doctors.length === 0) {
    doctorListDiv.innerHTML = "<p>No doctors found.</p>";
  } else {
    doctors.forEach(doc => {
      const docCard = document.createElement("div");
      docCard.className = "hospital-card";
      docCard.innerHTML = `
        <div class="hospital-info">
          <h3>${doc.name}</h3>
          <p><strong>Specialty:</strong> ${doc.specialty}</p>
          <p><strong>Slots:</strong></p>
          <div class="slot-buttons">
            ${doc.slots.map(slot => `
              <button onclick="bookSlot('${hospitalName}', '${doc.name}', '${slot}')">${slot}</button>
            `).join("")}
          </div>
        </div>
      `;
      doctorListDiv.appendChild(docCard);
    });
  }
}

function bookSlot(hospital, doctorName, slot) {
  const doctors = doctorsData[hospital];
  const doctor = doctors.find(d => d.name === doctorName);

  const appointment = {
    hospital,
    doctor: doctor.name,
    specialty: doctor.specialty,
    slot,
    date: new Date().toLocaleDateString()
  };

  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  appointments.push(appointment);
  localStorage.setItem("appointments", JSON.stringify(appointments));

  alert(`Appointment booked with ${doctor.name} at ${slot}`);
}
