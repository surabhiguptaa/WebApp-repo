const button = document.getElementById("search-button");
const cityname = document.getElementById("city-name");
const citydetails = document.getElementById("city-details");
const temp = document.getElementById("temp");
const time = document.getElementById("time");
const userlocation = document.getElementById("location");


async function getdata(city) {
    const result = await fetch(`http://api.weatherapi.com/v1/current.json?key=8e115fcaa1e14570bda84658240609&q=${city}&aqi=yes`)
    return await result.json();
}

async function getlocation(lat, long) {
    const result1 = await fetch(`http://api.weatherapi.com/v1/current.json?key=8e115fcaa1e14570bda84658240609&q=${lat},${long}&aqi=yes`)
    return await result1.json();
}

button.addEventListener("click", async () => {
    const value = cityname.value;
    const result = await getdata(value);
    citydetails.innerText = `${result.location.name} - ${result.location.region} - ${result.location.country}`
    temp.innerText = `Temprature - ${result.current.temp_c}`
    time.innerText = ` Local Time - ${result.current.last_updated}`
});

async function gotlocation(position) {
    
    const result2 = await getlocation(
        position.coords.latitude, 
        position.coords.longitude
    )
    citydetails.innerText = `${result2.location.name} - ${result2.location.region} - ${result2.location.country}`
    temp.innerText = `Temprature - ${result2.current.temp_c}`
    time.innerText = ` Local Time - ${result2.current.last_updated}`
    // console.log(position)
     //console.log(result2)
    
}

function faildlocation() {
    console.log(" Error: location not found");
}

userlocation.addEventListener("click", async () => {
    
    navigator.geolocation.getCurrentPosition(gotlocation, faildlocation)
    
    
});