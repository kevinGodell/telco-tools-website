const FEET_PER_METER = 3.28084;

const METERS_PER_FOOT = 0.3048;

const DMS = "degreesMinutesSeconds";//degrees minutes seconds

const D = "degrees";//degrees

const FT = "feet";

const M = "meters";

//const MILES_PER_METER = 0.000621371;
//const KILOMETERS_PER_METER = 0.001;
//const MILES_PER_FOOT = 0.000189394;
//const KILOMETERS_PER_FOOT = 0.0003048;
//const MI = "miles";
//const KM = "kilometers";

//geolocation accuracy is output in meters by device
function formatAccuracy(accuracyInMeters, units, prefix) {
    var accuracyFormatted;
    var pre = typeof prefix === "string" ? prefix : "Accuracy : ";
    switch (units) {
        case M :
            accuracyFormatted = pre + "\u00B1 " + Math.round(accuracyInMeters) + " m";
            break;
        case FT :
        default :
            accuracyFormatted = pre + "\u00B1 " + Math.round(accuracyInMeters * FEET_PER_METER) + " ft";
            break;
    }
    return accuracyFormatted;
}

function addCommas(value) {
    //todo create or find a formatter for adding commas
    return value;
}

//distance between coords is output in feet
function formatDistance(distanceInFeet, units, prefix) {
    var distanceFormatted;
    var pre = typeof prefix === "string" ? prefix : "Distance : ";//pass null for default value or ""(empty string) or string
    switch (units) {
        case M :
            distanceFormatted = pre + addCommas(Math.round(distanceInFeet * METERS_PER_FOOT)) + " m";
            break;
        case FT :
        default :
            distanceFormatted = pre + addCommas(Math.round(distanceInFeet)) + " ft";
            break;
    }
    return distanceFormatted;
}

function formatLatitude(latitudeInDecimal, coordsFormat, prefix) {
    var latitudeFormatted;
    var format = coordsFormat ? coordsFormat : DMS;
    var pre = typeof prefix === "string" ? prefix : "Latitude : ";
    switch (format) {
        case D ://degrees
            if (latitudeInDecimal > 0)
                latitudeFormatted = pre + "\u002B" + latitudeInDecimal.toFixed(5);
            else
                latitudeFormatted = pre + "\u2212" + (Math.abs(latitudeInDecimal)).toFixed(5);
            break;
        case DMS ://degrees minutes seconds
        default :
            var dir;//N,S
            var abs;
            var deg;
            var rem;
            var min;
            var sec;
            dir = latitudeInDecimal > 0 ? "N " : "S ";
            abs = Math.abs(latitudeInDecimal);//removes negative
            deg = parseInt(abs);
            rem = (abs - deg) * 60;
            min = parseInt(rem);
            sec = (Math.round(((rem - min) * 60) * 100) / 100).toFixed(2);//toFixed(2) adds 0's to end to ensure 2 digits after decimal point
            latitudeFormatted = pre + dir + deg + "\u00B0 " + min + "\u2019 " + sec + "\u201D";
            break;
    }
    return latitudeFormatted;
}

function formatLongitude(longitudeInDecimal, coordsFormat, prefix) {
    var format = coordsFormat ? coordsFormat : DMS;
    var pre = typeof prefix === "string" ? prefix : "Longitude : ";
    var longitudeFormatted;
    switch (format) {
        case D ://degrees
            if (longitudeInDecimal > 0)
                longitudeFormatted = pre + "\u002B" + longitudeInDecimal.toFixed(5);
            else
                longitudeFormatted = pre + "\u2212" + (Math.abs(longitudeInDecimal)).toFixed(5);
            break;
        case DMS ://degrees minutes seconds
        default :
            var dir;//E,W
            var abs;
            var deg;
            var rem;
            var min;
            var sec;
            dir = longitudeInDecimal > 0 ? "E " : "W ";
            abs = Math.abs(longitudeInDecimal);
            deg = parseInt(abs);
            rem = (abs - deg) * 60;
            min = parseInt(rem);
            sec = (Math.round(((rem - min) * 60) * 100) / 100).toFixed(2);
            longitudeFormatted = pre + dir + deg + "\u00B0 " + min + "\u2019 " + sec + "\u201D";
            break;
    }
    return longitudeFormatted;
}

function formatSpeed(speedInMetersPerSecond) {
    return Math.round(parseFloat(speedInMetersPerSecond) * 2.23694).toString() + " mph";
}

function formatTimestamp(timestamp, prefix) {
    var pre = typeof prefix === "string" ? prefix : "Timestamp : ";
    return pre + new Date(timestamp).toLocaleTimeString();
}
