// ----- Battery data -----
const batteries = {
  "AA": "Recycle at designated collection points. Do not throw in regular trash.",
  "AAA": "Recycle at designated collection points. Avoid landfills.",
  "C": "Take to hazardous waste or battery recycling center.",
  "D": "Dispose at local recycling center or hazardous waste facility.",
  "18650": "Special lithium-ion batteries. Take to authorized recycler.",
  "CR2032": "Small button cells. Drop off at battery recycling point."
};

// ----- Shared function to display battery info -----
function showBatteryInfo(battery) {
  const resultDiv = document.getElementById("result");

  if (!battery) {
    resultDiv.innerText = "Please enter or scan a battery type.";
    return;
  }

  if (batteries[battery]) {
    resultDiv.innerHTML = `<b>${battery}</b>: ${batteries[battery]}`;
  } else {
    resultDiv.innerHTML = `Battery type <b>${battery}</b> not found. Try another.`;
  }
}

// ----- Manual input -----
document.getElementById("check-battery").addEventListener("click", () => {
  const battery = document.getElementById("battery-input").value.trim();
  showBatteryInfo(battery);
});

// ----- QR Code Scanner -----
function onScanSuccess(decodedText, decodedResult) {
  // Pass scanned text into lookup
  showBatteryInfo(decodedText.trim());
}

function onScanFailure(error) {
  console.warn(`QR scan error: ${error}`);
}

// Create scanner instance
let html5QrCodeScanner = new Html5QrcodeScanner(
  "reader",
  { fps: 10, qrbox: 250 }
);
html5QrCodeScanner.render(onScanSuccess, onScanFailure);

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
