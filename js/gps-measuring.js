const LOCAL_STORAGE_ITEM = "com.codedbykevin.telco_tools.gps_measuring.locations";

var geoOptions = {enableHighAccuracy: true, maximumAge: 0, timeout: 2000};
var currentLocation;//{timestamp:, latitude:, longitude:, accuracy:, distance:}
var totalDistance = 0;
var totalAccuracy = 0;
var locations;//ArrayList
var locationsLength;//locations.getLength()
var wpid = null;

//html elements to be manipulated or populated
var addBtn;
//var replaceBtn;
var removeBtn;
var resetBtn;
var startStopBtn;
var locationStatus;
var savedLocations;

function onGeoSuccess(position) {
    var coords = position.coords;
    var distance = 0;
    addBtn.disabled = false;
    if (locationsLength > 0) {
        //replaceBtn.disabled = false;
        var lastLocation = locations.getItem();
        distance = distanceBetweenCoordinates(coords.latitude, coords.longitude, lastLocation.latitude, lastLocation.longitude);
    }
    currentLocation = {
        timestamp: position.timestamp,
        latitude: coords.latitude,/*in decimal*/
        longitude: coords.longitude,/*in decimal*/
        accuracy: coords.accuracy,/*in meters*/
        distance: distance/*distance from last saved location*/
        /*
         todo will use speed > 1 to render the app non interactive to prevent use while driving, and to ensure that gps loc has settled before being able to save
         speed: coords.speed, (meters per sec)
         heading: coords.heading( degress relative to true north, requires speed to have value
         */
    };

    processAllLocations(locations.getSource());

    locationStatus.innerHTML = '<span class="gps"><span class="gpsLabel">GPS Status</span> : Signal Acquired</span>' +
        '<span class="gps">' + formatTimestamp(position.timestamp, '<span class="gpsLabel">Timestamp</span> : ') + '</span>' +
        '<span class="gps">' + formatLatitude(coords.latitude, DMS, '<span class="gpsLabel">Latitude</span> : ') + '</span>' +
        '<span class="gps">' + formatLongitude(coords.longitude, DMS, '<span class="gpsLabel">Longitude</span> : ') + '</span>' +
        '<span class="gps">' + formatAccuracy(coords.accuracy, FT, '<span class="gpsLabel">Accuracy</span> : ') + '</span>' +
        '<span class="gps">' + formatDistance(distance, FT, '<span class="gpsLabel">Distance</span> : ') + '</span>' +
        '<hr/>'+
        '<span class="gps">' + formatAccuracy(totalAccuracy, FT, '<span class="gpsLabel">Total Accuracy</span> : ') + '</span>' +
        '<span class="gps">' + formatDistance(totalDistance, FT, '<span class="gpsLabel">Total Distance</span> : ') + '</span>';

        //speed.innerText =  formatSpeed(coords.speed);

}

function onGeoError(error) {
    locationStatus.innerHTML = '<span class="gps"><span class="gpsLabel">GPS Status</span> : <span class="statusRed">Error Code(' + error.code + '), ' + error.message + '</span></span>';
    addBtn.disabled = /*replaceBtn.disabled =*/ true;
}

function stopGeoWatch() {
    if (wpid !== null) {
        navigator.geolocation.clearWatch(wpid);
        wpid = null;
        locationStatus.innerHTML = '<span class="gps">GPS Status: Stopped</span>';
        //todo if currentLocation, then popuplate with that also
        addBtn.disabled = /*replaceBtn.disabled =*/ true;
        startStopBtn.innerText = "Start";
    }
}

function startGeoWatch() {
    stopGeoWatch();
    locationStatus.innerHTML = '<span class="gps">GPS Status: Starting...</span>';
    wpid = navigator.geolocation.watchPosition(onGeoSuccess, onGeoError, geoOptions);
    addBtn.disabled = /*replaceBtn.disabled =*/ true;
    startStopBtn.innerText = "Stop";
}

function onPageShow() {
    adjustApp();

    locationStatus = document.getElementById("locationStatus");
    savedLocations = document.getElementById("savedLocations");

    savedLocations.ontouchmove = function(e) {
        e.stopPropagation();
    };

    if (navigator.geolocation) {

        addBtn = document.getElementById("add");
        //replaceBtn = document.getElementById("replace");
        removeBtn = document.getElementById("remove");
        resetBtn = document.getElementById("reset");
        startStopBtn = document.getElementById("startStop");
        startStopBtn.disabled = false;

        //localStorage.clear();
        locations = new ArrayList(JSON.parse(localStorage.getItem("com.codedbykevin.gps_measuring.locations")), locationsCallback);

        startGeoWatch();

    } else {
        locationStatus.innerHTML = '<span class="gps">GPS Status: Unavailable</span>';
    }
}

function addClick() {
    locations.addItem(currentLocation);
}

function replaceClick() {
    if (locationsLength > 1) {
        var nextToLastLocation = locations.getItemAt(locationsLength - 2);
        currentLocation.distance = distanceBetweenCoordinates(currentLocation.latitude, currentLocation.longitude, nextToLastLocation.latitude, nextToLastLocation.longitude);
    } else if (locationsLength === 1) {
        currentLocation.distance = 0;
    }
    locations.replaceItem(currentLocation);
}

function removeClick() {
    locations.removeItem();
}

function resetClick() {
    locations.resetSource();
}

function startStopClick() {
    if (wpid !== null) {
        stopGeoWatch();
    } else {
        startGeoWatch();
    }
}

function locationsCallback(obj) {
    locationsLength = obj.length;
    var source = obj.source;
    switch(obj.action) {
        case "Initialized" :
            //todo - variable was just created and will still be undefined at this moment
            break;
        case "SourceSet" :
            break;
        case "ItemAdded" :
            addBtn.disabled = /*replaceBtn.disabled =*/ true;
            locationStatus.innerHTML = '<span class="gps"><span class="gpsLabel">GPS Status</span> : <span class="statusRed">Getting Update</span></span>';
            currentLocation = null;
            break;
        case "ItemRemoved" :
            break;
        case "ItemReplaced" :
            addBtn.disabled = /*replaceBtn.disabled =*/ true;
            locationStatus.innerHTML = '<span class="gps"><span class="gpsLabel">GPS Status</span> : <span class="statusRed">Getting Update</span></span>';
            currentLocation = null;
            break;
    }
    processAllLocations(source);

    savedLocations.scrollTop = 0;
    localStorage.setItem("com.codedbykevin.gps_measuring.locations", JSON.stringify(source));
}

function processAllLocations(source) {
    var sourceLength = source.length;
    totalAccuracy = 0;
    totalDistance = 0;
    if (currentLocation) {
        totalAccuracy += currentLocation.accuracy;
        totalDistance += currentLocation.distance;
    }
    if (sourceLength > 0) {
        var str = "";
        if (currentLocation) {
            str += "<span class='gpsLocation'>Current Location (" + formatAccuracy(currentLocation.accuracy, FT, "") + ")</span>";
            str += "<span class='gpsDistance'>&varr; " + formatDistance(currentLocation.distance) + "</span>";
        }
        var i = sourceLength;
        while(i--) {
            str += "<span class='gpsLocation'>Location: " + (i + 1) + " (" + formatAccuracy(source[i].accuracy, FT, "") + ")</span>";
            if (i > 0) {
                str += "<span class='gpsDistance'>&varr; " + formatDistance(source[i].distance) + "</span>";
            }
            totalAccuracy += source[i].accuracy;
            totalDistance += source[i].distance;
        }
        savedLocations.innerHTML = str;
        removeBtn.disabled = false;
        if (sourceLength > 1) {
            resetBtn.disabled = false;
        }/* else {
            resetBtn.disabled = true;
        }*/
    } else {
        savedLocations.innerHTML = '<p class="gpsWarning">Add location to start measuring.</p>';
        //todo add multi lines of text
        //Wait for low accuracy reading
        //add locations to start measuring
        //add multiple locations to get total distance
        /*replaceBtn.disabled = */removeBtn.disabled = resetBtn.disabled = true;
    }
}