//  Fetch User's Current Timezone
//When client visit webpage it ask for location permission and get longitude and latitude of user's location
let userLatitude, userLongitude;
let test = document.querySelector(".test")
document.addEventListener("DOMContentLoaded", () => {
    navigator.geolocation.getCurrentPosition((position) => {
        userLatitude = position.coords.latitude;
        userLongitude = position.coords.longitude;
        
        console.log(`Latitude: ${userLatitude}, Longitude: ${userLongitude}`);
        findAddress(userLatitude, userLongitude)
        
        // Now you can use these variables anywhere in your code
    }, (error) => {
        console.error("Error getting location:", error);
    });
})

// Find the address of user from latitude and longitude
async function findAddress(lat, lon) {
    let response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=1b4a5c03bab44671bc8f4956e2549d3f`)
    let result = await response.json();
    console.log(result);
    if(result.results){
        let current = document.querySelector(".current");
        current.innerHTML += `
        <div class="container">
            <label>Name of the Time Zone : <span>${result.results[0].timezone.name}</span></label><br><br>
            <div style="display: flex; justify-content: start; gap: 10px;">
                <label>Lat: <span>${result.results[0].lat}</span></label>
                <label>Long: <span>${result.results[0].lon}</span></label>
            </div><br>

            <label>Offset STD: <span>${result.results[0].timezone.offset_STD}</span></label><br><br>
            
            <label>Offset STD Seconds: <span>${result.results[0].timezone.offset_STD_seconds}</span></label><br><br>
            <label>Offset DST: <span>${result.results[0].timezone.offset_DST}</span></label><br><br>
            <label>Offset DST seconds: <span>${result.results[0].timezone.offset_DST_seconds}</span></label><br><br>
            <label>Country: <span>${result.results[0].country}</span></label><br><br>
            <label>Postcode: <span>${result.results[0].postcode}</span></label><br><br>
            <label>City: <span>${result.results[0].city}</span></label><br>
        </div>
        `
    }else{
        console.log("No location found")
    }
}

//Retrieve Timezone by Address
document.getElementById("btn").addEventListener("click", async () => {
    let userInput = document.getElementById("address");
    let address = userInput.value;
    if(address === "") {
        let clientResult =  document.querySelector(".userInfo");
        clientResult.innerHTML = `<span style="color: #E84444;">Please enter an address!</span>`
    }
    console.log(address)

    let response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=a67e4c83aa08430f8e671d90fc607c95`)
    let result = await response.json();
    if(result) {
        console.log(result)
        renderUserDetail(result.features[0].properties)
    } else {
        console.log("Address not found...")
    }
})


function renderUserDetail(data) {
    let clientResult =  document.querySelector(".userInfo");
    clientResult.innerHTML = `
            <h1>Your Result</h1>
            <div class="clientResult">
                <label>Name of the Time Zone : <span>${data.timezone.name}</span></label><br><br>
                <div style="display: flex; justify-content: start; gap: 10px;">
                    <label>Lat: <span>${data.lat}</span></label>
                    <label>Long: <span>${data.lon}</span></label>
                </div><br>

                <label>Offset STD: <span>${data.timezone.offset_STD}</span></label><br><br>
                
                <label>Offset STD Seconds: <span>${data.timezone.offset_STD_seconds}</span></label><br><br>
                <label>Offset DST: <span>${data.timezone.offset_DST}</span></label><br><br>
                <label>Offset DST seconds: <span>${data.timezone.offset_DST_seconds}</span></label><br><br>
                <label>Country: <span>${data.country}</span></label><br><br>
                <label>State: <span>${data.state}</span></label><br><br>
                <label>City: <span>${data.city}</span></label><br>
            </div>
            `
}