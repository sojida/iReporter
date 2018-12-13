const locate_btn = document.getElementById('geoLocate')
const location_field = document.getElementById('locateField')


locate_btn.addEventListener('click', (e) => {
    e.preventDefault()
    location_field.value = 'Locating...'

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        location_field.value = `${latitude.toFixed(6)},${longitude.toFixed(6)}`

        const latlon = latitude + "," + longitude;


        const map_url = "https://maps.googleapis.com/maps/api/staticmap?center=" + latlon + "&zoom=16&size=400x300&sensor=false&key=AIzaSyABDhT6kOJ31VVKeNgM4ByXbyhFdj-09TM";

        document.getElementById("map").innerHTML = `<img src=${map_url} alt='google map'>`;

    }

    function onError(err) {
        switch (err.code) {
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

    if (!navigator.geolocation) {
        location_field.value = 'Geolocation not available'
    } else {
        navigator.geolocation.getCurrentPosition(success, onError);
    }


})

    // google.maps.event.addDomListener(window, load, initialize)

    // function initialize () {
    //     const autocomplete = new google.maps.places.Autocomplete(location_field)

    //     google.maps.event.addListener(autocomplete, 'place_changed', function(){

    //         const places = autocomplete.getPlace();
    //         let location = `<b>${places.geometry.location}</b>`

    //         location_field.innerHTML = location
    //     })

    // }

   

