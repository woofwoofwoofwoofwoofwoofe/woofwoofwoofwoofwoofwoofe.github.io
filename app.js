// ----- Detailed Battery data -----
const batteries = {
  "Alkaline AA": {
    type: "Alkaline",
    recycling: "Recycle at designated collection points. Do not throw in regular trash.",
    hazards: "Contains small amounts of toxic metals like mercury and cadmium.",
    voltage: "1.50 Volts",
    capacity: "~2500 mAh",
    temp: "0°C – 60°C",
    tips: "Store in a cool, dry place before disposal."
  },
  "Lithium AA": {
    type: "Lithium",
    recycling: "Recycle at designated collection points. Avoid landfills.",
    hazards: "Contains small amounts of toxic metals.",
    voltage: "1.50 Volts",
    capacity: "~3000 mAh",
    temp: "0°C – 60°C",
    tips: "Store in a cool, dry place."
  },
  "AAA": {
    type: "Alkaline",
    recycling: "Recycle at designated collection points. Avoid landfills.",
    hazards: "Contains toxic metals.",
    voltage: "1.50 Volts",
    capacity: "~1200 mAh",
    temp: "0°C – 60°C",
    tips: "Keep away from children."
  },
  "C": {
    type: "Alkaline",
    recycling: "Take to hazardous waste or battery recycling center.",
    hazards: "Contains toxic metals.",
    voltage: "1.50 Volts",
    capacity: "~8000 mAh",
    temp: "0°C – 60°C",
    tips: "Do not throw in regular trash."
  },
  "D": {
    type: "Alkaline",
    recycling: "Dispose at local recycling center or hazardous waste facility.",
    hazards: "Toxic metals present.",
    voltage: "1.50 Volts",
    capacity: "~12000 mAh",
    temp: "0°C – 60°C",
    tips: "Keep away from children and pets."
  },
  "18650": {
    type: "Lithium-ion",
    recycling: "Special lithium-ion batteries. Take to authorized recycler.",
    hazards: "Can catch fire if damaged. Contains lithium and other metals.",
    voltage: "3.6 Volts",
    capacity: "2600 mAh",
    temp: "20°C – 50°C",
    tips: "Remove batteries from device before long-term storage."
  },
  "CR2032": {
    type: "Button Cell",
    recycling: "Small button cells. Drop off at battery recycling point.",
    hazards: "High risk if swallowed. Contains lithium or silver oxide.",
    voltage: "3 Volts",
    capacity: "235 mAh",
    temp: "0°C – 60°C",
    tips: "Keep out of reach of children."
  }
};

// ----- Map flexible user input to battery keys -----
const batteryMap = {
  "AA": "Alkaline AA",
  "Alkaline AA": "Alkaline AA",
  "Lithium AA": "Lithium AA",
  "AAA": "AAA",
  "C": "C",
  "D": "D",
  "18650": "18650",
  "CR2032": "CR2032"
};

// ----- Display battery info -----
function showBatteryInfo(battery) {
  const resultDiv = document.getElementById("result");

  if (!battery) {
    resultDiv.innerText = "Please enter or scan a battery type.";
    return;
  }

  const mappedKey = batteryMap[battery.trim()];
  const info = batteries[mappedKey];

  if (info) {
    resultDiv.innerHTML = `
      <b>${mappedKey} (${info.type})</b><br>
      <b>Recycling:</b> ${info.recycling}<br>
      <b>Hazards:</b> ${info.hazards}<br>
      <b>Voltage:</b> ${info.voltage}<br>
      <b>Capacity:</b> ${info.capacity}<br>
      <b>Operating Temperature:</b> ${info.temp}<br>
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

// ----- URL Parameter Handling (for QR code links) -----
function getBatteryFromURL() {
  const params = new URLSearchParams(window.location.search);
  const batteryType = params.get("battery");
  if (batteryType) {
    showBatteryInfo(batteryType.trim());
  }
}

// Run on page load
window.onload = getBatteryFromURL;

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
