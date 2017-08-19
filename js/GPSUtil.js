/**
 * Created by kevinGodell on 9/6/16.
 */
const RADIUS_OF_EARTH_IN_METERS = 637100;//6378000;

const RADIUS_OF_EARTH_IN_FEET = 20902231;

const TO_RADIANS = 0.017453292519943295;//Math.PI / 180

function distanceBetweenCoordinates(latitude1, longitude1, latitude2, longitude2, units) {
    if (isNaN(latitude1) || isNaN(longitude1) || isNaN(latitude2) || isNaN(longitude2))
        return NaN;
    var distance;
    var diffLatRadHalf = (latitude2 - latitude1) * TO_RADIANS / 2;
    var diffLonRadHalf = (longitude2 - longitude1) * TO_RADIANS / 2;
    var lat1Rad = latitude1 * TO_RADIANS;
    var lat2Rad = latitude2 * TO_RADIANS;
    var a = Math.sin(diffLatRadHalf) * Math.sin(diffLatRadHalf) + Math.sin(diffLonRadHalf) * Math.sin(diffLonRadHalf) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    switch (units) {
        case 'meters' :
            distance = RADIUS_OF_EARTH_IN_METERS * c;
            break;
        case 'feet' :
        default:
            distance = RADIUS_OF_EARTH_IN_FEET * c;
            break;
    }
    return distance;
}
//based on http://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates