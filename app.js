// -------------------------
// Battery Data
// -------------------------
let batteries = {
  "AA": "Recycle at designated collection points. Do not throw in regular trash.",
  "AAA": "Recycle at designated collection points. Avoid landfills.",
  "C": "Take to hazardous waste or battery recycling center.",
  "D": "Dispose at local recycling center or hazardous waste facility.",
  "18650": "Special lithium-ion batteries. Take to authorized recycler.",
  "CR2032": "Small button cells. Drop off at battery recycling point."
};

// -------------------------
// Battery Lookup (Text Input)
// -------------------------
const input = document.getElementById('battery-input');
const button = document.getElementById('check-battery');
const resultDiv = document.getElementById('result');

button.addEventListener('click', () => {
  const battery = input.value.trim().toUpperCase();
  if (batteries[battery]) {
    resultDiv.textContent = batteries[battery];
  } else {
    resultDiv.textContent = "Battery type not found. Try another.";
  }
});

// -------------------------
// QR Scan (Camera)
// -------------------------
const scanButton = document.getElementById('scan-qr');
const qrReaderDiv = document.getElementById("qr-reader");

scanButton.addEventListener('click', () => {
  qrReaderDiv.style.display = "block"; // show camera

  const html5QrCode = new Html5Qrcode("qr-reader");

  Html5QrCode.getCameras().then(cameras => {
    if (cameras && cameras.length) {
      const cameraId = cameras[0].id;
      html5QrCode.start(
        cameraId,
        { fps: 10, qrbox: 250 },
        qrCodeMessage => {
          const cleanedText = qrCodeMessage.trim().toUpperCase();
          if (batteries[cleanedText]) {
            resultDiv.textContent = batteries[cleanedText];
          } else {
            resultDiv.textContent = `Battery type "${cleanedText}" not found.`;
          }
          html5QrCode.stop(); // stop scanning
          qrReaderDiv.style.display = "none"; // hide camera
        },
        errorMessage => {
          // optional: console.log(`QR scan error: ${errorMessage}`);
        }
      );
    } else {
      resultDiv.textContent = "No camera found. Try using your phone.";
    }
  }).catch(err => {
    console.error("Camera error:", err);
    resultDiv.textContent = "Camera not accessible. Try using your phone.";
    qrReaderDiv.style.display = "none";
  });
});

// -------------------------
// City-Based Recycling
// -------------------------
const citySelect = document.getElementById("city-select");
const recyclingResultDiv = document.getElementById("recycling-result");

const recyclingCenters = {
  phoenix: [
    "Phoenix Household Hazardous Waste Facility, 2519 S 7th Ave",
    "Ace Hardware - Phoenix, 2031 W Bell Rd"
  ],
  tucson: [
    "Tucson Recycles - 1200 W 6th St",
    "Tucson Hazardous Waste Center, 4455 S Alvernon Way"
  ],
  mesa: [
    "Mesa Recycling Center, 640 N Mesa Dr",
    "Home Depot - Mesa, 1670 S Alma School Rd"
  ],
  scottsdale: [
    "Scottsdale Environmental Services, 9191 E San Salvador Dr",
    "Battery World - Scottsdale, 7111 E Mayo Blvd"
  ],
  flagstaff: [
    "Flagstaff Waste Management, 3000 N 4th St",
    "Lowes - Flagstaff, 1450 S Milton Rd"
  ]
};

citySelect.addEventListener("change", () => {
  const city = citySelect.value;
  if (city && recyclingCenters[city]) {
    const centers = recyclingCenters[city].map(center => `<li>${center}</li>`).join("");
    recyclingResultDiv.innerHTML = `<ul>${centers}</ul>`;
  } else {
    recyclingResultDiv.innerHTML = "";
  }
});
