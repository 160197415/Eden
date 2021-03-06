

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
    apiKey: "AIzaSyAqyzzi9TOJqdVT56JoEImOEIMkNygTBHY",
    authDomain: "endless-science-333617.firebaseapp.com",
    databaseURL: "https://endless-science-333617-default-rtdb.firebaseio.com/",
    projectId: "endless-science-333617",
    storageBucket: "endless-science-333617.appspot.com",
    messagingSenderId: "845878768858",
    appId: "1:845878768858:web:8696ba58e19a4b8427a1e3",
};
firebase.initializeApp(firebaseConfig);


//--- Now to get all the data ---//

function selectAllData() {
    firebase.database().ref('concernForm').once('value',
        function (allRecords) {
            allRecords.forEach(
                function (currentRecord) {
                    var name = currentRecord.val().userName;
                    var environmentCoordinates = currentRecord.val().environmentCoordinates;
                    var environmentalConcernType = currentRecord.val().environmentalConcernType;
                    var details = currentRecord.val().details;
                    addItemsToTable(name, environmentCoordinates, environmentalConcernType, details);
                }
            );
        });
}

window.onload = selectAllData;


//--Filling out the table ----//

function addItemsToTable(name, enviromentCoordinates, environmentalConcernType, details) {
    var tbody = document.getElementById('tbody1');
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    td1.innerHTML = name;
    td2.innerHTML = enviromentCoordinates;
    td2.onclick=(() =>displayMap(enviromentCoordinates));
    td3.innerHTML = environmentalConcernType;
    td4.innerHTML = details;
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    tbody.appendChild(trow);

}
var map;

function displayMap(enviromentCoordinates) {
    var coordinate = enviromentCoordinates.split(' ') ;
    console.log(coordinate[2] +", "+ coordinate[4]);
    var coordinates = { lat: parseFloat(coordinate[2]), lng:  parseFloat(coordinate[4]) };
    initMap(coordinates);
}
/** Coordinates*/
//const coordinates = { lat: 52.4862, lng: -1.8904 };


/** Initialising the map */
function initMap(coordinates) {
    console.log(coordinates)
    let mapOptions = {
        center: coordinates,
        zoom: 16
    }

    let map = new google.maps.Map(document.getElementById('map'), mapOptions);


    /**The marker will always start from a set coordinate */
    let marker = new google.maps.Marker({
        position: coordinates,
        map: map,
        draggable: true,
        animation: google.maps.Animation.BOUNCE
    })




    const infoWindowOptions = {
        content: infoWiwndowOptionsContent,
        position: { lat: 52.4862, lng: -1.8904 },
        anchor: marker,
        maxWidth: 200,
        maxHeight: 20


    }

    const infoWindow = new google.maps.InfoWindow(infoWindowOptions)

    marker.addListener('click', (googleMapsEvent) => {
        document.getElementsByClassName("position")[0].value = ("Latitude: " + googleMapsEvent.latLng.lat().toString() + " Longitude: " + googleMapsEvent.latLng.lng().toString());

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

    // marker.addListener('click', (latLngTableEvent) =>{
    //     document.getElementById("coordinates")[td].value = 
    // })

    // const locationButton = document.createElement("button");

    // locationButton.textContent = "Pan to Current Location";
    // locationButton.classList.add("custom-map-control-button");
    // map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    // locationButton.addEventListener("click", () => {
    //     // Try HTML5 geolocation.
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 const pos = {
    //                     lat: position.coords.latitude,
    //                     lng: position.coords.longitude,
    //                 };
    //                 marker.setPosition(pos);
    //                 newinfoWindow.setPosition(marker);

    //                 newinfoWindow.setContent("Location found. Click to find your Latitude and Longitudinal Position");
    //                 newinfoWindow.open(map);
    //                 map.setCenter(pos);
    //             },
    //             () => {
    //                 handleLocationError(true, newinfoWindow, map.getCenter());
    //             }
    //         );
    //     } else {
    //         // Browser doesn't support Geolocation
    //         handleLocationError(false, newinfoWindow, map.getCenter());
    //     }
    // });
}
