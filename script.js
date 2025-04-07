const hospitals = [
  {
    name: "CityCare Hospital",
    location: "Hyderabad",
    specialties: ["Cardiology", "Neurology", "Orthopedics"],
    image: "https://source.unsplash.com/300x200/?hospital,building"
  },
  {
    name: "MediLife Clinic",
    location: "Bangalore",
    specialties: ["Dermatology", "Pediatrics", "General Medicine"],
    image: "https://source.unsplash.com/300x200/?clinic,healthcare"
  },
  {
    name: "Apollo Hospitals",
    location: "Chennai",
    specialties: ["Cancer", "Surgery", "ENT"],
    image: "https://source.unsplash.com/300x200/?apollo,hospital"
  }
];

const hospitalList = document.getElementById("hospitalList");

function renderHospitals(data) {
  hospitalList.innerHTML = "";
  data.forEach(hospital => {
    const card = document.createElement("div");
    card.className = "hospital-card";
    card.innerHTML = `
      <img src="${hospital.image}" alt="${hospital.name}">
      <div class="hospital-info">
        <h3>${hospital.name}</h3>
        <p><strong>Location:</strong> ${hospital.location}</p>
        <p><strong>Specialties:</strong> ${hospital.specialties.join(", ")}</p>
        <button onclick="bookHospital('${hospital.name}')">View Details</button>
      </div>
    `;
    hospitalList.appendChild(card);
  });
}

function bookHospital(name) {
  alert(`Redirecting to ${name}'s detail page...`);
  // Later: Redirect to detailed doctor view
}

document.getElementById("searchBar").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const filtered = hospitals.filter(h =>
    h.name.toLowerCase().includes(query) ||
    h.location.toLowerCase().includes(query) ||
    h.specialties.some(s => s.toLowerCase().includes(query))
  );
  renderHospitals(filtered);
});
function bookHospital(name) {
  window.location.href = `hospital.html?id=${encodeURIComponent(name)}`;
}


renderHospitals(hospitals);
