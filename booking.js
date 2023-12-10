//Variable in the room booking code
let loyaltyPoints = 0;
let roomBookingCost;
// constants for the room booking code
const singleRoomPrice = 25000;
const doubleRoomPrice = 35000;
const tripleRoomPrice = 40000;
const meals = 5000;
const extraBedPrice = 8000;




// get references to the interactive elements
const fullName = document.getElementById("namee");
const Email = document.getElementById("mail");
const telNum = document.getElementById("num");
const checkInDate = document.getElementById("indate");
const checkOutDate = document.getElementById("outdate");
const promoCode = document.getElementById("promoCode");
const adults = document.getElementById("Adults");
const NoOfextrabeds = document.getElementById("extrabeds");
const form = document.querySelectorAll('book-room');
const txtOutput = document.getElementById("currentcost");
const txtCost = document.getElementById("costroom");
const theForm = document.getElementById("roomsBook");
const singleRoom = document.getElementById("noOfsingle");
const doubleRoom = document.getElementById("noOfdouble");
const tripleRoom = document.getElementById("noOftriple");
const roomBook = document.querySelectorAll(".roomsBook"); 
const kidsAbv = document.getElementById("kids");
const theRoomInputs = document.querySelectorAll("#roomsBook input");

// Add Event Listner
roomBook.forEach(input => input.addEventListener('input', calcRoomTot)); 
theRoomInputs.forEach(input => input.addEventListener('input', calcRoomTot));


function calcRoomTot() {
    calculateRoomTotalCost();

    if (promoCode.value === "promo123") {
        let discountAmount = roomBookingCost * 0.05;
        roomBookingCost = roomBookingCost - discountAmount;
    }
    

    txtOutput.innerText =
        `Name: ${fullName.value}
    Contact: ${telNum.value}
    Email: ${Email.value}
    Check-in Date: ${checkInDate.value}
    Check-out Date: ${checkOutDate.value}
    Extra-for-the-Meals: ${kidsAbv.value}
    Total Cost: ${roomBookingCost}
    `;
    
}

function calculateRoomTotalCost() {
    let numSingle = parseInt(singleRoom.value);
    let numdouble = parseInt(doubleRoom.value);
    let numtripple = parseInt(tripleRoom.value);
    let kidsAbv5years = parseInt(kidsAbv.value);
    let extrabeds = parseInt(NoOfextrabeds.value);

    const totalRooms = numSingle + numdouble + numtripple;

    let daysForTheStay = (new Date(checkOutDate.value) - new Date(checkInDate.value)) / (24 * 60 * 60 * 1000);

    roomBookingCost = ((numSingle * singleRoomPrice * daysForTheStay) + (numdouble * doubleRoomPrice * daysForTheStay) + (numtripple * tripleRoomPrice * daysForTheStay)) + (kidsAbv5years * meals) + (extrabeds * extraBedPrice);

    //  promo code discount
    if (promoCode.value === "promo123") {
        let discountAmount = roomBookingCost * 0.05;
        roomBookingCost = roomBookingCost - discountAmount;
    }

    document.getElementById('costroom').innerHTML = roomBookingCost;
    
    

    // loyalty points
    loyaltyPoints = 0;

    if (totalRooms > 3) {
        loyaltyPoints = totalRooms * 20;
    }
    
}


// the button for room booking
const btnRoom = document.getElementById('bookroom');

btnRoom.addEventListener('click', function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Calculate and display room booking details
    calcRoomTot();

    // Update the table with the latest values
    updateTable();

    // Check if the form is valid
    if (theForm.checkValidity()) {
        // Reset the form
        theForm.reset();

        
        txtCost.innerText = "";
        txtOutput.innerText="";
    }
});



//validing the days 
function validateDatesDates() {
    const today = new Date().setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
    const checkInDateValue = new Date(checkInDate.value).setHours(0, 0, 0, 0);
    const checkOutDateValue = new Date(checkOutDate.value).setHours(0, 0, 0, 0);

    // check-in date against today's date
    if (checkInDate.value < today) {
        alert("Check-in date cannot be in the past. Please select a valid date.");
        return false; // Prevent form submission if check-in date is invalid
    }

    // V check-out date against today's date
    if (checkOutDate.value <= today) {
        alert("Check-out date must be in the future. Please select a valid date.");
        return false; // Prevent form submission if check-out date is invalid
    }

    //  check-out date against check-in date
    if (checkOutDate.value <= checkInDateValue) {
        alert("Check-out date must be after the check-in date. Please select a valid date range.");
        return false; // Prevent form submission if check-out date is invalid
    }

    
    return true;
}

//Overall Table


function updateTable() {
    
    const singleRoomCost = document.getElementById('singleRoomCost');
    const doubleRoomCost = document.getElementById('doubleRoomCost');
    const tripleRoomCost = document.getElementById('Triple');
    const kidsAbv5Cost = document.getElementById('abv5');
    const extraBedCost = document.getElementById('Extrabed');
    const totalCost = document.getElementById('totalCost');

    
    let numSingle = parseInt(singleRoom.value);
    let numdouble = parseInt(doubleRoom.value);
    let numtripple = parseInt(tripleRoom.value);
    let kidsAbv5years = parseInt(kidsAbv.value);
    let extrabeds = parseInt(NoOfextrabeds.value);

    
    const singleRoomCostValue = numSingle * singleRoomPrice;
    const doubleRoomCostValue = numdouble * doubleRoomPrice;
    const tripleRoomCostValue = numtripple * tripleRoomPrice;
    const kidsAbv5CostValue = kidsAbv5years * meals;
    const extraBedCostValue = extrabeds * extraBedPrice;

    
    singleRoomCost.innerText = singleRoomCostValue;
    doubleRoomCost.innerText = doubleRoomCostValue;
    tripleRoomCost.innerText = tripleRoomCostValue;
    kidsAbv5Cost.innerText = kidsAbv5CostValue;
    extraBedCost.innerText = extraBedCostValue;

    const totalRoomsCost = singleRoomCostValue + doubleRoomCostValue + tripleRoomCostValue;
    const roomBookingCostValue = totalRoomsCost + kidsAbv5CostValue + extraBedCostValue;
    totalCost.innerText = roomBookingCostValue;
    document.getElementById('costroom').innerText = roomBookingCostValue;
}


// event listener to the loyalty points
const btnLoyalPoints = document.getElementById('loyal');

btnLoyalPoints.addEventListener('click', displayLoyaltyPoints);

function displayLoyaltyPoints() {
    
    alert(`Loyalty Points: ${loyaltyPoints} loyalty points`);
    saveLoyaltyPoints();
}
function saveLoyaltyPoints() {
    
    localStorage.setItem('loyaltyPoints', loyaltyPoints.toString());
    alert('Loyalty Points saved to local storage!');
}
//Adventure booking

let guideCost = 0;
//constants
const slAdultInput = document.getElementById("sladult");
const slChildInput = document.getElementById("slchild");
const foreignAdultInput = document.getElementById("foreignadult");
const foreignKidtInput = document.getElementById("foreignKid");
const guideYesInput = document.getElementById("Adultguide");
const guideNoInput = document.getElementById("noguide"); 
const durationInput = document.getElementById("duration");
const advenBooks = document.querySelectorAll(".advenBook");
const advenbooksInputs = document.querySelectorAll("#advenBook input");
const costAdventureElement = document.getElementById("costadventure");
const adventureDetails = document.getElementById("currentcost1");
const fullNamee = document.getElementById("name");

const localAdultCharge = 5000;
const localkidCharge = 2000;
const foreignAdultCharge = 10000;
const foreignkidCharge = 5000;
const adultGuideCost = 1000;
const kidsGuideCost = 500;

// Calculate the cost of adventure 
function calculateAdventureCost() {
    let numofLocals = parseInt(slAdultInput.value) || 0;
    let numofForeigners = parseInt(foreignAdultInput.value) || 0;
    let numofLocalkids = parseInt(slChildInput.value) || 0;
    let numofForeignkids = parseInt(foreignKidtInput.value) || 0;

    let adultCost = (numofLocals * localAdultCharge) + (numofForeigners * foreignAdultCharge);
    let childrenCost = (numofLocalkids * localkidCharge) + (numofForeignkids * foreignkidCharge);

    let duration = parseInt(durationInput.value) || 0;
    let advCost = (adultCost + childrenCost) * duration;
    let guideCost = guideYesInput.checked ? adultGuideCost : 0;

    
    costAdventureElement.innerText = `Adventure Cost: Rs.${advCost + guideCost}.00`;
}

// Event listener for guide checkboxes
function guide() {
    if (this.id === "Adultguide") {
        guideCost = this.checked ? adultGuideCost : 0;
    } else if (this.id === "kidsguide") { // Corrected the id
        guideCost = this.checked ? kidsGuideCost : 0;
    }

    //  update the adventure cost
    calculateAdventureCost();
    updateCurrentAdventureBooking();
}
//  reset the adventure form
function resetAdventure() { 
    slAdultInput.value = 0;
    slChildInput.value = 0;
    foreignAdultInput.value = 0;
    foreignKidtInput.value = 0;
    durationInput.value = 0;
    costAdventureElement.innerText = "";
    adventureDetails.innerText = "";}

// Event listeners for adventure book inputs
advenbooksInputs.forEach(input => input.addEventListener('input', updateCurrentAdventureBooking));


// Event listener for the adventure booking button
const btnAdventure = document.getElementById("Advenbutton");
btnAdventure.addEventListener('click', function (event) {
    
    event.preventDefault();

 //alert
    alert(`${fullNamee.value}, Your reservations for Diving is successfully Done!!\n${adventureDetails.innerText}\nAdventure Cost: ${costAdventureElement.innerText}\nThank You`);

    
    resetAdventure();
});



// Function to update current adventure booking 
function updateCurrentAdventureBooking() {
    
    calculateAdventureCost();

    // Display or use other current adventure booking details as needed
    adventureDetails.innerText = `Adventure Details: 
        Number of Locals: ${slAdultInput.value}
        Number of Foreigners: ${foreignAdultInput.value}
        Number of Local Kids: ${slChildInput.value}
        Number of Foreign Kids: ${foreignKidtInput.value}
        Duration: ${durationInput.value} hours`;
}





//Add to favourite
const btnAddToFavourite = document.getElementById('btnAddToFavourite');
 btnAddToFavourite.addEventListener('click', addFavourite);
 function addFavourite(event) {
    
    event.preventDefault();

    localStorage.setItem('favouriteInfo', JSON.stringify(favouriteInfo));

    alert('Added to Favorites!');
}


function addFavourite() {
    const favouriteInfo = {
        fullName: fullName.value,
        contact: telNum.value,
        mail: Email.value,
        checkInDate: checkInDate.value,
        checkOutDate: checkOutDate.value,
        promoCode: promoCode.value,
        roomBookingCost: roomBookingCost,
        singleRoomCount: parseInt(singleRoom.value) || 0,
        doubleRoomCount: parseInt(doubleRoom.value) || 0,
        tripleRoomCount: parseInt(tripleRoom.value) || 0,
        kidsAbove5: parseInt(kidsAbv.value) || 0,
        extraBedsCount: parseInt(NoOfextrabeds.value) || 0,
        adventureDetails: {
         numLocals: parseInt(slAdultInput.value) || 0,
         numForeigners: parseInt(foreignAdultInput.value) || 0,
         numLocalKids: parseInt(slChildInput.value) || 0,
         numForeignKids: parseInt(foreignKidtInput.value) || 0,
         duration: parseInt(durationInput.value) || 0,
         guideIncluded: guideYesInput.checked
        
        }
    };
    resetAdventure();
    

    localStorage.setItem('favouriteInfo', JSON.stringify(favouriteInfo));

    alert('Added to Favorites!');
}


