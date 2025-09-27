// ----- Detailed Battery data -----
const batteries = {
  "AA": {
    type: "Alkaline",
    recycling: "Recycle at designated collection points. Do not throw in regular trash.",
    hazards: "Contains small amounts of toxic metals like mercury and cadmium.",
    lifespan: "Typically lasts 1–2 years in household devices.",
    tips: "Store in a cool, dry place before disposal."
  },
  "AAA": {
    type: "Alkaline",
    recycling: "Recycle at designated collection points. Avoid landfills.",
    hazards: "Contains small amounts of toxic metals.",
    lifespan: "1–2 years depending on usage.",
    tips: "Tape terminals before disposal if storing multiple batteries."
  },
  "C": {
    type: "Alkaline",
    recycling: "Take to hazardous waste or battery recycling center.",
    hazards: "Contains toxic metals.",
    lifespan: "2–3 years.",
    tips: "Do not throw in regular trash."
  },
  "D": {
    type: "Alkaline",
    recycling: "Dispose at local recycling center or hazardous waste facility.",
    hazards: "Toxic metals present.",
    lifespan: "3–5 years.",
    tips: "Keep away from children and pets."
  },
  "18650": {
    type: "Lithium-ion",
    recycling: "Special lithium-ion batteries. Take to authorized recycler.",
    hazards: "Can catch fire if damaged. Contains lithium and other metals.",
    lifespan: "2–4 years.",
    tips: "Do not short-circuit terminals."
  },
  "CR2032": {
    type: "Button Cell",
    recycling: "Small button cells. Drop off at battery recycling point.",
    hazards: "High risk if swallowed. Contains lithium or silver oxide.",
    lifespan: "3–5 years.",
    tips: "Keep out of reach of children."
  }
};

// ----- Display battery info -----
function showBatteryInfo(battery) {
  const resultDiv = document.getElementById("result");

  if (!battery) {
    resultDiv.innerText = "Please enter or scan a battery type.";
    return;
  }

  const info = batteries[battery];
  if (info) {
    resultDiv.innerHTML = `
      <b>${battery} (${info.type})</b><br>
      <b>Recycling:</b> ${info.recycling}<br>
      <b>Hazards:</b> ${info.hazards}<br>
      <b>Lifespan:</b> ${info.lifespan}<br>
      <b>Tips:</b> ${info.tips}
    `;
  } else {
    resultDiv.innerHTML = `Battery type <b>${battery}</b> not found. Try another.`;
  }
}

// ----- Manual input -----
document.getElementById("check-battery").addEventListener("click", () => {
  const battery = document.getElementById("battery-input").value.trim();
  showBatteryInfo(battery);
});

// ----- QR Scanner with Camera Picker -----
let html5QrCode;
let cameraOn = false;
const cameraSelect = document.getElementById("camera-select");
const cameraToggle = document.getElementById("camera-toggle");

// Populate camera dropdown
Html5Qrcode.getCameras().then(cameras => {
  cameras.forEach(cam => {
    const option = document.createElement("option");
    option.value = cam.id;
    option.text = cam.label;
    cameraSelect.appendChild(option);
  });
}).catch(err => console.error("Could not get cameras:", err));

function onScanSuccess(decodedText) {
  showBatteryInfo(decodedText.trim());
}

function onScanFailure(error) {
  console.warn(`QR scan error: ${error}`);
}

// Toggle camera on/off
cameraToggle.addEventListener("click", () => {
  if (!cameraOn) {
    const selectedCameraId = cameraSelect.value;
    if (!selectedCameraId) {
      alert("Please select a camera first.");
      return;
    }

    html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
      selectedCameraId,
      { fps: 10, qrbox: 250 },
      onScanSuccess,
      onScanFailure
    ).then(() => {
      cameraOn = true;
      cameraToggle.innerText = "Stop Camera";
    }).catch(err => console.error("Failed to start camera:", err));

  } else {
    html5QrCode.stop().then(() => {
      html5QrCode.clear();
      cameraOn = false;
      cameraToggle.innerText = "Start Camera";
    }).catch(err => console.error("Failed to stop camera:", err));
  }
});

// ----- Recycling Centers -----
const centers = {
  "Phoenix": "City of Phoenix Household Hazardous Waste Facility",
  "Tucson": "Los Reales Landfill - HHW Program",
  "Mesa": "Mesa Household Hazardous Materials Facility",
  "Tempe": "Tempe Household Products Collection Center",
  "Flagstaff": "Flagstaff Hazardous Products Center"
};

document.getElementById("find-location").addEventListener("click", () => {
  const city = document.getElementById("city").value;
  const locationDiv = document.getElementById("location-result");

  if (!city) {
    locationDiv.innerText = "Please select a city.";
    return;
  }

  locationDiv.innerText = `Nearest Recycling Center: ${centers[city]}`;
});
