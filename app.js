// ----- Battery check -----
document.getElementById("check-battery").addEventListener("click", () => {
  const battery = document.getElementById("battery-input").value.trim();
  const resultDiv = document.getElementById("result");
  
  if (!battery) {
    resultDiv.innerText = "Please enter a battery type.";
    return;
  }

  // Simple example logic
  if (battery.toLowerCase().includes("lithium")) {
    resultDiv.innerText = "Lithium batteries must go to a certified recycler.";
  } else if (battery.toLowerCase().includes("alkaline")) {
    resultDiv.innerText = "Alkaline batteries can sometimes be placed in household trash, but recycling is better!";
  } else {
    resultDiv.innerText = `Info not available for "${battery}". Check your local guidelines.`;
  }
});

// ----- QR Code Scanner -----
function onScanSuccess(decodedText, decodedResult) {
  document.getElementById("result").innerText = `Scanned Result: ${decodedText}`;
}

function onScanFailure(error) {
  console.warn(`QR scan error: ${error}`);
}

let html5QrCodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
html5QrCodeScanner.render(onScanSuccess, onScanFailure);

// ----- Upload QR Code File -----
document.getElementById("qr-file").addEventListener("change", (e) => {
  if (e.target.files.length === 0) {
    return;
  }

  const file = e.target.files[0];
  const html5QrCode = new Html5Qrcode("reader");

  html5QrCode.scanFile(file, true)
    .then(decodedText => {
      document.getElementById("result").innerText = `Scanned from file: ${decodedText}`;
    })
    .catch(err => {
      document.getElementById("result").innerText = "Unable to read QR code from file.";
      console.error(err);
    });
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
