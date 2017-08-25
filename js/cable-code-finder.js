const LOCAL_STORAGE_ITEM = "com.codedbykevin.telco_tools.cable_codes.codeLetters";

var firstLetter;
var secondLetter;
var thirdLetter;
var fourthLetter;
var cableDetails;
var codeLetters;
var error;

var firstLetterOptions = [/*design*/
    {text: "A", value: "PIC Filled, PIC Riser, PULP Aircore"},
    {text: "B", value: "PIC Aircore"},
    {text: "C", value: "HIgh Potential Filled PIC, PULP Insulated MUP"},
    {text: "D", value: "Duct PIC, STEAMPETH"},
    {text: "K", value: "Screened Core"},
    {text: "L", value: "Low Capacitance"},
    {text: "M", value: "Low Capacitance Screened"},
    {text: "N", value: "PIC Limited Color Code"},
    {text: "Q", value: "Broadband"},
    {text: "T", value: "Terminating Cable Tinned Copper Conductors"}
];

var secondLetterOptions = [/*insulation*/
    {text: "A", value: "Future Code"},
    {text: "B", value: "Polyolefin, PVC"},
    {text: "C", value: "Foam Skin DEPIC Aircore"},
    {text: "D", value: "PULP"},
    {text: "E", value: "Foam Aircore"},
    {text: "F", value: "Foam Skin DEPIC with 65\u00B0 C Filling Compound"},
    {text: "G", value: "Solid Polyolefin with 65\u00B0 C Filling Compound"},
    {text: "H", value: "Solid Polyolefin Aircore(16 - 22 AWG)"},
    {text: "J", value: "Solid Polyolefin Petroleum Jelly Filled Core"},
    {text: "K", value: "Solid Polyolefin Aircore(24 - 28 AWG)"},
    {text: "L", value: "Foam Skin DEPIC Petroleum Jelly Filled Core"},
    {text: "M", value: "Solid Polyolefin/PIC with 80\u00B0 C Filling Compound"},
    {text: "N", value: "Foam Skin Insulation with 80°C filling compound"},
    {text: "R", value: "Expanded Polyolefin, PVC Skin"},
    {text: "S", value: ""}
];

var thirdLetterOptions = [/*gauge and conductor metal complete*/
    {text: "A", value: "22 AWG Copper"},
    {text: "B", value: "19 AWG Copper"},
    {text: "C", value: "17 AWG Aluminum"},
    {text: "D", value: "20 AWG Aluminum"},
    {text: "F", value: "22 AWG Aluminum"},
    {text: "H", value: "16 AWG Copper"},
    {text: "J", value: "13 AWG Copper"},
    {text: "K", value: "24 AWG Aluminum"},
    {text: "M", value: "24 AWG Copper"},
    {text: "R", value: "25 AWG Copper"},
    {text: "T", value: "26 AWG Copper"},
    {text: "W", value: "28 AWG Copper"}
];

var fourthLetterOptions = [/*sheath complete*/
    {text: "A", value: "ALPETH"},
    {text: "B", value: "CUPETH"},
    {text: "C", value: "STALPETH"},
    {text: "D", value: "ASP, LEPETH"},
    {text: "E", value: "Polyethylene Jacket Lead"},
    {text: "F", value: "Polyethylene Jacket LEPETH"},
    {text: "G", value: "PAP"},
    {text: "H", value: "PASP"},
    {text: "J", value: "TOLPETH Single Jacket"},
    {text: "K", value: "TOLPETH Double Jacket"},
    {text: "L", value: "Lead"},
    {text: "M", value: "ALVYN"},
    {text: "N", value: "Bonded ASP, STALVYN"},
    {text: "P", value: "Reinforced Self Support"},
    {text: "Q", value: "Gopher Resistant"},
    {text: "R", value: "Rodent Protection"},
    {text: "S", value: "ALPETH Self Support"},
    {text: "V", value: "STEAMPETH"},
    {text: "W", value: "Filled ASP"},
    {text: "X", value: "Special"},
    {text: "Y", value: "Filled Bonded ASP"},
    {text: "Z", value: "Aircore Bonded ASP"}
];

function onPageShow() {
    adjustApp();

    codeLetters = localStorage.getItem(LOCAL_STORAGE_ITEM);
    if (codeLetters === null) {
        codeLetters = "BKMA";
    }

    var codeLetter = codeLetters.split("");

    firstLetter = document.getElementById("firstLetter");
    secondLetter = document.getElementById("secondLetter");
    thirdLetter = document.getElementById("thirdLetter");
    fourthLetter = document.getElementById("fourthLetter");

    cableDetails = document.getElementById("cableDetails");

    error = document.getElementById("error");

    populateSelect(firstLetter, firstLetterOptions);
    populateSelect(secondLetter, secondLetterOptions);
    populateSelect(thirdLetter, thirdLetterOptions);
    populateSelect(fourthLetter, fourthLetterOptions);

    setSelectedItem(firstLetter, codeLetter[0]);
    setSelectedItem(secondLetter, codeLetter[1]);
    setSelectedItem(thirdLetter, codeLetter[2]);
    setSelectedItem(fourthLetter, codeLetter[3]);

    //cableDetails.innerHTML = "<span style=\"color:blue;font-weight: bold\">sdfsdfsfsfsfsdfsdfdfdfdfdfdfdfdfdf</span>" + codeLetters;
    //parseLetters();

    updateCableDetails();
}

function setSelectedItem(selectElement, text) {
    for (var i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].text === text) {
            selectElement.selectedIndex = i;
            break;
        }
    }
}

function updateCableDetails() {

    var htmlString = ""/*"<span style=\"color:blue;font-weight: bold;font-size: xx-large\">" + firstLetter.options[firstLetter.selectedIndex].text + "</span> : "*/;
    htmlString += firstLetter.value + "<hr/>";
    //htmlString += "<span style=\"color:blue;font-weight: bold;font-size: xx-large\">" + secondLetter.options[secondLetter.selectedIndex].text + "</span> : ";
    htmlString += secondLetter.value + "<hr/>";
    //htmlString += "<span style=\"color:blue;font-weight: bold;font-size: xx-large\">" + thirdLetter.options[thirdLetter.selectedIndex].text + "</span> : ";
    htmlString += thirdLetter.value + "<hr/>";
    //htmlString += "<span style=\"color:blue;font-weight: bold;font-size: xx-large\">" + fourthLetter.options[fourthLetter.selectedIndex].text + "</span> : ";
    htmlString += fourthLetter.value;
    cableDetails.innerHTML = htmlString;

    codeLetters = firstLetter.options[firstLetter.selectedIndex].text + secondLetter.options[secondLetter.selectedIndex].text + thirdLetter.options[thirdLetter.selectedIndex].text + fourthLetter.options[fourthLetter.selectedIndex].text;

    localStorage.setItem(LOCAL_STORAGE_ITEM, codeLetters)
}