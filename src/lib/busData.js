
import React from "react";

// --- City & Town List ---
export const indianCitiesAndTowns = [
  // Major Metros
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur",
  // Tier 2 Cities
  "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Patna", "Vadodara", "Ghaziabad",
  "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad",
  "Amritsar", "Navi Mumbai", "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur", "Gwalior", "Vijayawada",
  "Jodhpur", "Madurai", "Raipur", "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubli-Dharwad", "Mysore",
  "Tiruchirappalli", "Bareilly", "Aligarh", "Tiruppur", "Gurgaon", "Moradabad", "Jalandhar", "Bhubaneswar",
  "Salem", "Warangal", "Guntur", "Bhiwandi", "Saharanpur", "Gorakhpur", "Bikaner", "Amravati", "Noida", "Jamshedpur",
  "Bhilai", "Cuttack", "Firozabad", "Kochi", "Nellore", "Bhavnagar", "Dehradun", "Durgapur", "Asansol", "Rourkela",
  "Nanded", "Kolhapur", "Ajmer", "Gulbarga", "Jamnagar", "Ujjain", "Loni", "Siliguri", "Jhansi", "Ulhasnagar",
  "Jammu", "Sangli-Miraj & Kupwad", "Mangalore", "Erode", "Belgaum", "Ambattur", "Tirunelveli", "Malegaon", "Gaya",
  "Jalgaon", "Udaipur", "Maheshtana",
  // Smaller Towns & Important Locations (Sample)
  "Shimla", "Manali", "Dharamshala", "Rishikesh", "Haridwar", "Mussoorie", "Nainital", "Mount Abu",
  "Lonavala", "Mahabaleshwar", "Panchgani", "Matheran", "Alibag", "Shirdi", "Nashik", "Aurangabad",
  "Ajanta", "Ellora", "Hampi", "Gokarna", "Pondicherry", "Ooty", "Kodaikanal", "Munnar", "Thekkady",
  "Alleppey", "Varkala", "Kanyakumari", "Rameswaram", "Tirupati", "Srisailam", "Puri", "Konark",
  "Darjeeling", "Gangtok", "Shillong", "Tawang", "Leh", "Ladakh", "Goa", "Panjim", "Madgaon", "Vasco",
  "Ratnagiri", "Chiplun", "Satara", "Karad", "Sangli", "Ichalkaranji", "Baramati", "Ahmednagar", "Beed",
  "Latur", "Osmanabad", "Solapur", "Pandharpur", "Akola", "Buldhana", "Washim", "Yavatmal", "Wardha",
  "Chandrapur", "Gadchiroli", "Gondia", "Bhandara", "Dhule", "Nandurbar", "Anand", "Nadiad", "Bharuch",
  "Ankleshwar", "Valsad", "Vapi", "Navsari", "Godhra", "Dahod", "Palanpur", "Patan", "Bhuj", "Gandhidham",
  "Porbandar", "Veraval", "Junagadh", "Amreli", "Surendranagar", "Bharatpur", "Alwar", "Sikar", "Pali",
  "Tonk", "Kishangarh", "Beawar", "Hanumangarh", "Ganganagar", "Hisar", "Rohtak", "Panipat", "Sonipat",
  "Karnal", "Ambala", "Yamunanagar", "Panchkula", "Bathinda", "Patiala", "Mohali", "Pathankot", "Hoshiarpur",
  "Batala", "Moga", "Khanna", "Phagwara", "Saharanpur", "Muzaffarnagar", "Hapur", "Rampur", "Budaun",
  "Etawah", "Sitapur", "Unnao", "Rae Bareli", "Faizabad", "Ayodhya", "Basti", "Gonda", "Mirzapur",
  "Mathura", "Vrindavan", "Firozabad", "Mainpuri", "Hathras", "Sambhal", "Chandausi", "Azamgarh", "Jaunpur",
  "Ghazipur", "Ballia", "Deoria", "Motihari", "Bettiah", "Bagaha", "Siwan", "Chhapra", "Hajipur", "Muzaffarpur",
  "Darbhanga", "Samastipur", "Begusarai", "Munger", "Bhagalpur", "Katihar", "Purnia", "Arrah", "Buxar",
  "Sasaram", "Dehri", "Aurangabad (Bihar)", "Jehanabad", "Nawada", "Giridih", "Bokaro Steel City", "Deoghar",
  "Hazaribagh", "Daltonganj", "Chaibasa", "Sambalpur", "Balasore", "Bhadrak", "Baripada", "Berhampur",
  "Koraput", "Jeypore", "Bilaspur", "Korba", "Raigarh", "Ambikapur", "Jagdalpur", "Chhindwara", "Satna",
  "Rewa", "Sagar", "Ratlam", "Burhanpur", "Khandwa", "Bhimavaram", "Eluru", "Ongole", "Nandyal", "Machilipatnam",
  "Tenali", "Proddatur", "Adoni", "Madanapalle", "Chittoor", "Tirupati", "Kadapa", "Anantapur", "Hindupur",
  "Karimnagar", "Ramagundam", "Nizamabad", "Khammam", "Mahbubnagar", "Mancherial", "Adilabad", "Siddipet",
  "Bellary", "Davangere", "Shimoga", "Tumkur", "Bijapur", "Raichur", "Bidar", "Hospet", "Gadag-Betageri",
  "Hassan", "Udupi", "Chitradurga", "Kolar", "Mandya", "Chikmagalur", "Gangavati", "Bagalkot", "Ranibennur",
  "Thrissur", "Kollam", "Alappuzha", "Palakkad", "Malappuram", "Kannur", "Kottayam", "Kasaragod", "Thanjavur",
  "Dindigul", "Vellore", "Cuddalore", "Kanchipuram", "Tiruvannamalai", "Kumbakonam", "Rajapalayam",
  "Pudukkottai", "Hosur", "Nagercoil", "Karaikudi",
];

// --- Bus Operators (Sample) ---
const operators = [
  "Prasanna Purple", "Neeta Travels", "VRL Travels", "SRS Travels", "KPN Travels",
  "Orange Tours", "Sharma Transports", "Paulo Travels", "Zingbus", "IntrCity SmartBus",
  "GSRTC", "MSRTC", "KSRTC (Karnataka)", "SETC (Tamil Nadu)", "APSRTC", "TSRTC",
  "UPSRTC", "RSRTC", "HRTC", "UTC", "WBTC", "OSRTC", "ASTC", "JKRTC",
  "Raj National Express", "Seabird Tourists", "SVR Travels", "Morning Star Travels",
  "Parveen Travels", "Kallada Travels", "Shatabdi Travels", "Hans Travels", "Verma Travels",
  "Citylink Travels", "Intercity Travels", "National Travels", "Sugama Tourists",
  "Canara Pinto", "Southern Tourist", "Universal Travels", "Sri Krishna Travels",
  "Kesineni Travels", "Dhanunjaya Travels", "SVKDT Travels", "AR & BC Travels",
  "Go Tour Travels", "Apple Travels", "Gujarat Travels", "Eagle Travels", "Patel Tours & Travels",
  "Shrinath Travel Agency", "Mahasagar Travels", "Ashok Travels", "Choudhary Travels",
  "Jakhar Travels", "Rishabh Travels", "Vikas Travels", "Kalpana Travels", "Sangita Travels",
  "Pawan Travels", "Mahalaxmi Travels", "Khurana Travels", "Baba Travels", "Royal Cruiser",
  "Shyamoli Paribahan", "Greenline", "Volvo Bus Service", "Luxury Coach", "Night Rider",
  // Add more diverse operators
];

// --- Bus Types ---
const busTypes = [
  "AC Seater (2+2)", "AC Sleeper (2+1)", "Non-AC Seater (2+2)", "Non-AC Sleeper (2+1)",
  "AC Seater/Sleeper (2+1)", "Volvo Multi-Axle AC Semi Sleeper (2+2)", "Scania Multi-Axle AC Semi Sleeper (2+2)",
  "Mercedes-Benz Multi-Axle AC Semi Sleeper (2+2)", "AC Seater Push Back (2+2)", "Non-AC Seater Push Back (2+2)",
  "Ordinary / Express", "Deluxe / Semi-Deluxe", "Air Suspension AC Seater", "Bharat Benz AC Seater (2+2)",
  "AC Sleeper (1+1)", "Non-AC Seater (3+2)", // Less common but exist
];

// --- Amenities ---
const amenitiesList = [
  ['AC'], ['AC', 'Charging'], ['AC', 'WiFi'], ['AC', 'Sleeper'], ['AC', 'Sleeper', 'Charging'],
  ['AC', 'Sleeper', 'WiFi'], ['AC', 'Sleeper', 'Charging', 'WiFi'], ['AC', 'Charging', 'WiFi'],
  ['Non-AC'], ['Non-AC', 'Charging'], ['Non-AC', 'Sleeper'], ['Charging'], ['WiFi'], ['Sleeper'],
  ['AC', 'Blanket'], ['AC', 'Water Bottle'], ['AC', 'Snacks'], ['AC', 'Live Tracking'],
  ['AC', 'Sleeper', 'Charging', 'WiFi', 'Blanket', 'Water Bottle', 'Live Tracking'],
  [], // No amenities
];

// --- Seat Layouts (Sample Structures) ---
const layouts = [
  [[1, 1, 0, 1, 1], [1, 1, 0, 1, 1], [1, 1, 0, 1, 1], [1, 1, 0, 1, 1], [1, 1, 0, 1, 1], [1, 1, 0, 1, 1], [1, 1, 0, 1, 1], [1, 1, 0, 1, 1], [1, 1, 0, 1, 1], [1, 1, 0, 1, 1]], // 2+2 Seater
  [[1, 3, 0, 3, 1], [2, 1, 0, 1, 4], [1, 1, 0, 1, 1], [3, 1, 0, 1, 3], [1, 4, 0, 3, 1], [3, 1, 0, 1, 3], [1, 1, 0, 1, 1]], // 2+1 Sleeper Mix
  [[1, 1, 0, 1, 1], [1, 2, 0, 1, 1], [1, 1, 0, 2, 1], [1, 1, 0, 1, 1], [1, 1, 0, 1, 1], [1, 1, 0, 1, 1], [1, 1, 0, 1, 1]], // 2+2 Seater with some booked
  [[3, 1, 0, 1, 3], [1, 4, 0, 3, 1], [3, 1, 0, 1, 3], [1, 4, 0, 3, 1], [3, 1, 0, 1, 3]], // 2+1 Sleeper
  [[1, 1, 0, 1, 1, 1], [1, 1, 0, 1, 1, 1], [1, 1, 0, 1, 1, 1], [1, 1, 0, 1, 1, 1], [1, 1, 0, 1, 1, 1]], // 3+2 Seater (less common)
];

// --- Helper Functions ---
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomTime = () => `${String(getRandomInt(0, 23)).padStart(2, '0')}:${String(getRandomInt(0, 59)).padStart(2, '0')}`;

const calculateArrivalTime = (departureTime, durationHours) => {
  const [depH, depM] = departureTime.split(':').map(Number);
  const depMinutes = depH * 60 + depM;
  const arrMinutes = (depMinutes + durationHours * 60) % (24 * 60);
  const arrH = Math.floor(arrMinutes / 60);
  const arrM = arrMinutes % 60;
  return `${String(arrH).padStart(2, '0')}:${String(arrM).padStart(2, '0')}`;
};

const formatDuration = (durationHours) => {
  const hours = Math.floor(durationHours);
  const minutes = Math.round((durationHours - hours) * 60);
  return `${hours}h ${minutes}m`;
};

// --- Generate Bus Data ---
let busIdCounter = 1;
const generatedBuses = [];
const routePairs = new Set(); // To avoid duplicate routes in the same direction

// Generate ~150-200 routes
while (generatedBuses.length < 150) {
  let origin = getRandomElement(indianCitiesAndTowns);
  let destination = getRandomElement(indianCitiesAndTowns);

  // Ensure origin and destination are different
  if (origin === destination) continue;

  const routeKey = `${origin}-${destination}`;
  const reverseRouteKey = `${destination}-${origin}`;

  // Limit duplicate routes (allow some reverse routes)
  if (routePairs.has(routeKey) && Math.random() > 0.3) continue; // 70% chance to skip if route exists
  if (routePairs.has(reverseRouteKey) && Math.random() > 0.6) continue; // 40% chance to skip if reverse route exists

  routePairs.add(routeKey);

  // Simulate multiple buses per route
  const busesPerRoute = getRandomInt(1, 4);
  for (let i = 0; i < busesPerRoute; i++) {
    const departureTime = getRandomTime();
    const durationHours = getRandomInt(2, 18) + Math.random(); // Duration between 2 and 18 hours
    const arrivalTime = calculateArrivalTime(departureTime, durationHours);
    const price = getRandomInt(300, 2500); // Price range INR 300 - 2500
    const seatsAvailable = getRandomInt(5, 45);
    const operator = getRandomElement(operators);
    const type = getRandomElement(busTypes);
    const amenities = getRandomElement(amenitiesList);
    const layout = getRandomElement(layouts);
    const busNumber = `${getRandomElement(['MH', 'DL', 'KA', 'TN', 'AP', 'TS', 'GJ', 'RJ', 'UP', 'WB'])}${getRandomInt(1, 50)}-${String.fromCharCode(65 + getRandomInt(0, 25))}${String.fromCharCode(65 + getRandomInt(0, 25))}${getRandomInt(1000, 9999)}`;

    generatedBuses.push({
      id: busIdCounter++,
      operator,
      type,
      busNumber,
      origin,
      destination,
      departureTime,
      arrivalTime,
      duration: formatDuration(durationHours),
      price,
      seatsAvailable,
      amenities,
      layout,
      pricePerSeat: price, // Keep pricePerSeat consistent
    });
  }
}

// Add some specific important routes if missing
const ensureRoute = (origin, destination) => {
  if (!generatedBuses.some(b => b.origin === origin && b.destination === destination)) {
     const departureTime = getRandomTime();
     const durationHours = getRandomInt(4, 12) + Math.random();
     const arrivalTime = calculateArrivalTime(departureTime, durationHours);
     const price = getRandomInt(500, 1500);
     generatedBuses.push({
       id: busIdCounter++,
       operator: getRandomElement(operators),
       type: getRandomElement(busTypes),
       busNumber: `${getRandomElement(['MH', 'DL', 'KA'])}${getRandomInt(1, 50)}-AA${getRandomInt(1000, 9999)}`,
       origin,
       destination,
       departureTime,
       arrivalTime,
       duration: formatDuration(durationHours),
       price,
       seatsAvailable: getRandomInt(10, 30),
       amenities: getRandomElement(amenitiesList),
       layout: getRandomElement(layouts),
       pricePerSeat: price,
     });
     console.log(`Ensured route: ${origin} -> ${destination}`);
  }
};

ensureRoute("Mumbai", "Pune");
ensureRoute("Pune", "Mumbai");
ensureRoute("Delhi", "Jaipur");
ensureRoute("Jaipur", "Delhi");
ensureRoute("Bangalore", "Chennai");
ensureRoute("Chennai", "Bangalore");
ensureRoute("Hyderabad", "Bangalore");
ensureRoute("Bangalore", "Hyderabad");
ensureRoute("Delhi", "Chandigarh");
ensureRoute("Chandigarh", "Delhi");
ensureRoute("Mumbai", "Ahmedabad");
ensureRoute("Ahmedabad", "Mumbai");
ensureRoute("Kolkata", "Siliguri");
ensureRoute("Siliguri", "Kolkata");
ensureRoute("Pune", "Shirdi");
ensureRoute("Mumbai", "Goa");
ensureRoute("Bangalore", "Goa");


export const sampleBuses = generatedBuses;

export const getBusDetails = (busId) => {
   return sampleBuses.find(bus => bus.id.toString() === busId);
};

// Function to find potential alternative routes
export const findAlternativeRoutes = (origin, destination) => {
  const originLower = origin.toLowerCase();
  const destLower = destination.toLowerCase();

  const routesFromOrigin = sampleBuses.filter(bus => bus.origin.toLowerCase() === originLower);
  const routesToDestination = sampleBuses.filter(bus => bus.destination.toLowerCase() === destLower);

  // Simple suggestion: Find common intermediate cities (hubs)
  const hubs = new Set();
  routesFromOrigin.forEach(r1 => {
    routesToDestination.forEach(r2 => {
      if (r1.destination.toLowerCase() === r2.origin.toLowerCase()) {
        hubs.add(r1.destination);
      }
    });
  });

  // Suggest routes from origin and to destination separately
  const suggestions = {
    fromOrigin: routesFromOrigin.slice(0, 5).map(r => `${r.origin} -> ${r.destination}`), // Limit suggestions
    toDestination: routesToDestination.slice(0, 5).map(r => `${r.origin} -> ${r.destination}`),
    viaHubs: Array.from(hubs).slice(0, 3).map(hub => `${origin} -> ${hub} -> ${destination}`),
  };

  return suggestions;
};
  