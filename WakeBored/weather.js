let lon;
let lat;
const kelvin = 273;
let ap = "AM"

window.addEventListener("load", () => {
    const element = document.getElementById('currentTime');

    setInterval(function () {
        
        var currentDate = new Date();
        let hour = currentDate.getHours();
        let min = currentDate.getMinutes();
        let sec = currentDate.getSeconds();
        let newHour =  currentDate.getHours()
       
        
        if (hour==0){
        
            hour = 24
 
        } else { 

           
      
        }
        
        if (hour < 12) {
            let ap = "AM"
        } else {
            ap = "PM"
        }
     if (hour >= 24) {
           ap = "AM"
     
     
     
        }
        hour = (hour < 10) ? "0" + hour : hour;
        min = (min < 10) ? "0" + min : min;
        sec = (sec < 10) ? "0" + sec : sec;
        let time = hour + ":" + min + ":" + sec + " " + ap;
        element.innerText = time
        
    }, 1000);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            lon = position.coords.longitude;
            lat = position.coords.latitude;

           
            const api = "19ae7f77479fc3ffddd650f64201e3c6";

            const base =
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
                `lon=${lon}&appid=6d055e39ee237af35ca066f35474e9df`;




            fetch(base)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);

                   var header = document.getElementById("weather") 
                    let icon1 = data.weather[0].icon;
                





                    header.innerText = data.name + " " + data.sys.country + " " + '\n' + Math.floor(data.main.temp - kelvin) + "°C " + '\n' + data.weather[0].description + " "
                    console.log(data.weather[0].description)
                    console.log(data.name + "," + data.sys.country)
                   




                });
        });
    }
});

