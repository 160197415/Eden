/**Created the Map as a variable, 
     * it will be edited so i dont make it a constant unlike birminghams coordinates */
var map;


/** Coordinates of Birmingham*/
const Birmingham = { lat: 52.4862, lng: -1.8904 };


/** Initialising the map */
function initMap() {

    let mapOptions = {
        center: Birmingham,
        zoom: 16
    }

    let map = new google.maps.Map(document.getElementById('map'), mapOptions);


    /**The marker will always start from a set coordinate */
    let marker = new google.maps.Marker({
        position: Birmingham,
        map: map,
        draggable: true,
        animation: google.maps.Animation.BOUNCE



    })

   

    const infoWiwndowOptionsContent = '<h5>When you drag me to a location click me to find the coordinates!</h5>';
    const infoWindowOptions = {
        content: infoWiwndowOptionsContent,
        position: { lat: 52.4862, lng: -1.8904 },
        anchor: marker,
        maxWidth: 200,
        maxHeight: 20


    }

    const infoWindow = new google.maps.InfoWindow(infoWindowOptions)

    marker.addListener('click', (googleMapsEvent) => {
       document.getElementsByClassName("position")[0].value =  ("Latitude:  " + googleMapsEvent.latLng.lat().toString() +  " Longitude: " + googleMapsEvent.latLng.lng().toString());

    })

    const infoWindowOpenOptions = {
        map: map,
        anchor: marker,
        shouldFocus: false,


    }

    setTimeout(() => {
        infoWindow.setMap(null);
    }, 5000);


    infoWindow.open(infoWindowOpenOptions);

    infoWindow.addListener('closeclick', () => {
        infoWindow.close();
    })
    let newinfoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    marker.setPosition(pos);
                    newinfoWindow.setPosition(marker);

                    newinfoWindow.setContent("Location found. Click to find your Latitude and Longitudinal Position");
                    newinfoWindow.open(map);
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, newinfoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, newinfoWindow, map.getCenter());
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}
