const locate_btn = document.getElementById('geoLocate')
const location_field = document.getElementById('locateField')


locate_btn.addEventListener('click', (e) => {
    e.preventDefault()
    location_field.value = 'Locating...'

    function success(position){
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        location_field.value =`Latitude: ${latitude.toFixed(6)} Longitude: ${longitude.toFixed(6)}`

        const latlon = latitude + "," + longitude;


        const map_url = "https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=600x400&sensor=false&key=AIzaSyDb8u3PhTp_5VcFnRUhaA-fGLoOYqGyqQg";

        document.getElementById("map").innerHTML = `<img src=${map_url}>`;

    }

    function onError(err){
        switch(err.code) {
            case err.PERMISSION_DENIED:
                location_field.value = 'Denied request by User'
                break;
            case err.POSITION_UNAVAILABLE:
                location_field.value = 'Location unavailable'
                break;
            case err.TIMEOUT:
                location_field.value = 'Request timeout'
                break;
            case err.UNKNOWN_ERROR:
                location_field.value = 'An unknown error occurred'
                break;
        }
        
    }

    if (!navigator.geolocation){
        location_field.value = 'Geolocation not available'
    } else {
        navigator.geolocation.getCurrentPosition(success, onError);
    }

     
})
