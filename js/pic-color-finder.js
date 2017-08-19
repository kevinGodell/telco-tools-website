const LOCAL_STORAGE_ITEM = "com.codedbykevin.telco_tools.pic_color_finder.pairNumber";

var superColor;
var binderColor;
var tipRingColor;
var pairNumber;
var error;

var superColorOptions = [
    {text: "White", value: 0},
    {text: "Red", value: 600},
    {text: "Black", value: 1200},
    {text: "Yellow", value: 1800},
    {text: "Violet", value: 2400},
    {text: "Blue", value: 3000},
    {text: "Orange", value: 3600}
];

var binderColorOptions = [
    {text: "Blue-White", value: 0},
    {text: "Orange-White", value: 25},
    {text: "Green-White", value: 50},
    {text: "Brown-White", value: 75},
    {text: "Slate-White", value: 100},
    {text: "Blue-Red", value: 125},
    {text: "Orange-Red", value: 150},
    {text: "Green-Red", value: 175},
    {text: "Brown-Red", value: 200},
    {text: "Slate-Red", value: 225},
    {text: "Blue-Black", value: 250},
    {text: "Orange-Black", value: 275},
    {text: "Green-Black", value: 300},
    {text: "Brown-Black", value: 325},
    {text: "Slate-Black", value: 350},
    {text: "Blue-Yellow", value: 375},
    {text: "Orange-Yellow", value: 400},
    {text: "Green-Yellow", value: 425},
    {text: "Brown-Yellow", value: 450},
    {text: "Slate-Yellow", value: 475},
    {text: "Blue-Violet", value: 500},
    {text: "Orange-Violet", value: 525},
    {text: "Green-Violet", value: 550},
    {text: "Brown-Violet", value: 575}
];

var tipRingColorOptions = [
    {text: "White-Blue", value: 1},
    {text: "White-Orange", value: 2},
    {text: "White-Green", value: 3},
    {text: "White-Brown", value: 4},
    {text: "White-Slate", value: 5},
    {text: "Red-Blue", value: 6},
    {text: "Red-Orange", value: 7},
    {text: "Red-Green", value: 8},
    {text: "Red-Brown", value: 9},
    {text: "Red-Slate", value: 10},
    {text: "Black-Blue", value: 11},
    {text: "Black-Orange", value: 12},
    {text: "Black-Green", value: 13},
    {text: "Black-Brown", value: 14},
    {text: "Black-Slate", value: 15},
    {text: "Yellow-Blue", value: 16},
    {text: "Yellow-Orange", value: 17},
    {text: "Yellow-Green", value: 18},
    {text: "Yellow-Brown", value: 19},
    {text: "Yellow-Slate", value: 20},
    {text: "Violet-Blue", value: 21},
    {text: "Violet-Orange", value: 22},
    {text: "Violet-Green", value: 23},
    {text: "Violet-Brown", value: 24},
    {text: "Violet-Slate", value: 25}
];

function onPageShow() {
    adjustApp();
    superColor = document.getElementById("superColor");
    binderColor = document.getElementById("binderColor");
    tipRingColor = document.getElementById("tipRingColor");
    pairNumber = document.getElementById("pairNumber");
    error = document.getElementById("error");
    populateSelect(superColor, superColorOptions);
    populateSelect(binderColor, binderColorOptions);
    populateSelect(tipRingColor, tipRingColorOptions);
    var pairNumberValue = localStorage.getItem(LOCAL_STORAGE_ITEM);
    if (pairNumberValue === null) {
        pairNumberValue = 1;
    }
    pairNumber.value = pairNumberValue;
    calculateColor();
}

function calculatePair() {
    var pairNumberValue = 0;
    pairNumberValue += parseInt(superColor.value);
    pairNumberValue += parseInt(binderColor.value);
    pairNumberValue += parseInt(tipRingColor.value);
    pairNumber.value = pairNumberValue;
    pairNumber.className = null;
    error.innerText = "";
    error.className = null;
    localStorage.setItem(LOCAL_STORAGE_ITEM, pairNumberValue);
}

function calculateColor() {
    var reg = /^\d{1,4}$/;
    var result = reg.exec(pairNumber.value);
    var pairNumberValue;
    if (result === null || (pairNumberValue = parseInt(result[0]), pairNumberValue < 1 || pairNumberValue > 4200)) {
        pairNumber.className = "error";
        error.innerText = "Pair must range from 1 to 4200";
        error.className = "visible";
        return;
    }
    var superColorValue = Math.floor((pairNumberValue - 1) / 600) * 600;
    superColor.value = superColorValue;
    var binderColorValue = Math.floor((pairNumberValue - superColorValue - 1) / 25) * 25;
    binderColor.value = binderColorValue;
    var tipRingColorValue = pairNumberValue - superColorValue - binderColorValue;
    tipRingColor.value = tipRingColorValue;
    pairNumber.className = null;
    error.innerText = "";
    error.className = null;
    localStorage.setItem(LOCAL_STORAGE_ITEM, pairNumberValue);
}