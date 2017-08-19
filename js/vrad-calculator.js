const LOCAL_STORAGE_ITEM = "com.codedbykevin.telco_tools.vrad_calculator.pairNumber";

var bank;
var slot;
var position;
var pairNumber;
var error;

var bankOptions = [
    {text: "A", value: 0},
    {text: "B", value: 200},
    {text: "C", value: 400},
    {text: "D", value: 600}
];

var slotOptions = [
    {text: "1", value: 0},
    {text: "2", value: 48},
    {text: "3", value: 100},
    {text: "4", value: 148}
];

var positionOptions = [
    {text: "1", value: 1},
    {text: "2", value: 2},
    {text: "3", value: 3},
    {text: "4", value: 4},
    {text: "5", value: 5},
    {text: "6", value: 6},
    {text: "7", value: 7},
    {text: "8", value: 8},
    {text: "9", value: 9},
    {text: "10", value: 10},
    {text: "11", value: 11},
    {text: "12", value: 12},
    {text: "13", value: 13},
    {text: "14", value: 14},
    {text: "15", value: 15},
    {text: "16", value: 16},
    {text: "17", value: 17},
    {text: "18", value: 18},
    {text: "19", value: 19},
    {text: "20", value: 20},
    {text: "21", value: 21},
    {text: "22", value: 22},
    {text: "23", value: 23},
    {text: "24", value: 24},
    {text: "25", value: 25},
    {text: "26", value: 26},
    {text: "27", value: 27},
    {text: "28", value: 28},
    {text: "29", value: 29},
    {text: "30", value: 30},
    {text: "31", value: 31},
    {text: "32", value: 32},
    {text: "33", value: 33},
    {text: "34", value: 34},
    {text: "35", value: 35},
    {text: "36", value: 36},
    {text: "37", value: 37},
    {text: "38", value: 38},
    {text: "39", value: 39},
    {text: "40", value: 40},
    {text: "41", value: 41},
    {text: "42", value: 42},
    {text: "43", value: 43},
    {text: "44", value: 44},
    {text: "45", value: 45},
    {text: "46", value: 46},
    {text: "47", value: 47},
    {text: "48", value: 48}
];

var invalidPairs = [97, 98, 99, 100, 197, 198, 199, 200, 297, 298, 299, 300, 397, 398, 399, 400, 497, 498, 499, 500, 597, 598, 599, 600, 697, 698, 699, 700];

function onPageShow() {
    adjustApp();
    bank = document.getElementById("bank");
    slot = document.getElementById("slot");
    position = document.getElementById("position");
    pairNumber = document.getElementById("pairNumber");
    error = document.getElementById("error");
    populateSelect(bank, bankOptions);
    populateSelect(slot, slotOptions);
    populateSelect(position, positionOptions);
    var pairNumberValue = localStorage.getItem(LOCAL_STORAGE_ITEM);
    if (pairNumberValue === null) {
        pairNumberValue = 1;
    }
    pairNumber.value = pairNumberValue;
    calculatePort();
}

function calculatePair() {
    var pairNumberValue = 0;
    pairNumberValue += parseInt(bank.value);
    pairNumberValue += parseInt(slot.value);
    pairNumberValue += parseInt(position.value);
    pairNumber.value = pairNumberValue;
    pairNumber.className = null;
    error.innerText = "";
    error.className = null;
    localStorage.setItem(LOCAL_STORAGE_ITEM, pairNumberValue);
}

function calculatePort() {
    var reg = /^\d{1,3}$/;
    var result = reg.exec(pairNumber.value);
    var pairNumberValue;
    if (result === null || (pairNumberValue = parseInt(result[0]), pairNumberValue < 1 || pairNumberValue > 796)) {
        pairNumber.className = "error";
        error.innerText = "Pair must range from 1 to 796";
        error.className = "visible";
        return;
    }
    if (invalidPairs.indexOf(pairNumberValue) > -1) {
        pairNumber.className = "error";
        error.innerText = pairNumberValue + " is not a valid pair number";
        error.className = "visible";
        return;
    }
    var bankValue = Math.floor((pairNumberValue - 1) / 200) * 200;
    bank.value = bankValue;
    var slotValue = Math.floor((pairNumberValue - bankValue - 1) / 100) * 100;
    slotValue += Math.floor((pairNumberValue - bankValue - slotValue - 1) / 48) * 48;
    slot.value = slotValue;
    var positionValue = pairNumberValue - bankValue - slotValue;
    position.value = positionValue;
    pairNumber.className = null;
    error.innerText = "";
    error.className = null;
    localStorage.setItem(LOCAL_STORAGE_ITEM, pairNumberValue);
}