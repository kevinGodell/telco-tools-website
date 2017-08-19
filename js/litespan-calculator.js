const LOCAL_STORAGE_ITEM = "com.codedbykevin.telco_tools.litespan_calculator.pairNumber";

var bank;
var slot;
var position;
var pairNumber;
var error;

var bankOptions = [
    {text: "1", value: 0},
    {text: "2", value: 226},
    {text: "3", value: 450},
    {text: "4", value: 676},
    {text: "5", value: 900},
    {text: "6", value: 1126},
    {text: "7", value: 1350},
    {text: "8", value: 1576},
    {text: "9", value: 1800}
];

var slotOptions = [
    {text: "1", value: 0},
    {text: "2", value: 4},
    {text: "3", value: 8},
    {text: "4", value: 12},
    {text: "5", value: 16},
    {text: "6", value: 20},
    {text: "7", value: 24},
    {text: "8", value: 28},
    {text: "9", value: 32},
    {text: "10", value: 36},
    {text: "11", value: 40},
    {text: "12", value: 44},
    {text: "13", value: 48},
    {text: "14", value: 52},
    {text: "15", value: 56},
    {text: "16", value: 60},
    {text: "17", value: 64},
    {text: "18", value: 68},
    {text: "19", value: 72},
    {text: "20", value: 76},
    {text: "21", value: 80},
    {text: "22", value: 84},
    {text: "23", value: 88},
    {text: "24", value: 92},
    {text: "25", value: 96},
    {text: "26", value: 100},
    {text: "27", value: 104},
    {text: "28", value: 108},
    {text: "29", value: 112},
    {text: "30", value: 116},
    {text: "31", value: 120},
    {text: "32", value: 124},
    {text: "33", value: 128},
    {text: "34", value: 132},
    {text: "35", value: 136},
    {text: "36", value: 140},
    {text: "37", value: 144},
    {text: "38", value: 148},
    {text: "39", value: 152},
    {text: "40", value: 156},
    {text: "41", value: 160},
    {text: "42", value: 164},
    {text: "43", value: 168},
    {text: "44", value: 172},
    {text: "45", value: 176},
    {text: "46", value: 180},
    {text: "47", value: 184},
    {text: "48", value: 188},
    {text: "49", value: 192},
    {text: "50", value: 196},
    {text: "51", value: 200},
    {text: "52", value: 204},
    {text: "53", value: 208},
    {text: "54", value: 212},
    {text: "55", value: 216},
    {text: "56", value: 220}
];

var positionOptions = [
    {text: "1", value: 1},
    {text: "2", value: 2},
    {text: "3", value: 3},
    {text: "4", value: 4}
];

var invalidPairs = [225, 226, 675, 676, 1125, 1126, 1575, 1576];

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
    var reg = /^\d{1,4}$/;
    var result = reg.exec(pairNumber.value);
    var pairNumberValue;
    if (result === null || (pairNumberValue = parseInt(result[0]), pairNumberValue < 1 || pairNumberValue > 2024)) {
        pairNumber.className = "error";
        error.innerText = "Pair must range from 1 to 2024";
        error.className = "visible";
        return;
    }
    if (invalidPairs.indexOf(pairNumberValue) > -1) {
        pairNumber.className = "error";
        error.innerText = pairNumberValue + " is not a valid pair number";
        error.className = "visible";
        return;
    }
    var bankValue = Math.floor((pairNumberValue - 1) / 450) * 450;
    bankValue += Math.floor((pairNumberValue - bankValue - 1) / 226) * 226;
    bank.value = bankValue;
    var slotValue = pairNumberValue - bankValue;
    slotValue = Math.floor((slotValue - 1) / 4) * 4;
    slot.value = slotValue;
    position.value = pairNumberValue - bankValue - slotValue;
    pairNumber.className = null;
    error.innerText = "";
    error.className = null;
    localStorage.setItem(LOCAL_STORAGE_ITEM, pairNumberValue);
}