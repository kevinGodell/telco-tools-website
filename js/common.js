var standalone = false;

function isMsPinnedSite() {
    if (typeof window.external !== "undefined" && Object.prototype.hasOwnProperty.call(window.external, "msPinnedSiteState") && window.external.msPinnedSiteState() > 0) {
        return true;
    } else {
        return false;
    }
}

if (window.navigator.standalone === true/*iOS*/ || window.matchMedia("(display-mode: standalone)").matches === true/*Android*/ || /iemobile/i.test(window.navigator.userAgent) === true/*Windows-Mobile ie*/) {
    /*
     isMsPinnedSite()
     will fail on all other pages because based on exact url with no params
    */
    standalone = true;
    document.ontouchmove = function (event) {/*prevent screen from being pulled*/
        event.preventDefault();
    };
    document.oncontextmenu = function (event) {/*Android fix for context menu on links*/
        event.preventDefault();
    };
}

function adjustApp() {
    //var top = document.getElementById("top");
    if (standalone === false) {
        //var container = document.getElementById("container");
        //container.style.height = "90vh";//to allow for chrome height
        //top.style.backgroundImage = "url('/telco-tools/images/background_grey.png')";
    } else {
        //top.style.backgroundImage = "url('/telco-tools/images/background_black.png')";
    }
}

function populateSelect(selectElement, dataArray) {
    if (selectElement instanceof HTMLSelectElement && dataArray instanceof Array && dataArray.length > 0) {
        var i = 0;
        var length = dataArray.length;
        for (i; i < length; i++) {
            var data = dataArray[i];
            var option = document.createElement("option");
            option.textContent = data["text"];
            option.value = data["value"];
            selectElement.appendChild(option);
        }
    }
}

function openLink(linkObj) {
    saveLastVisitedPage(linkObj.id);
    changeLocationHref(linkObj.href);
}

function saveLastVisitedPage(linkID) {
    localStorage.setItem("com.codedbykevin.telco_tools.lastVisitedPage", linkID);
}

function changeLocationHref(linkHref) {
    window.location.href = linkHref;
}

function trace(str) {
    console.log(new Date().toLocaleString() + " : " + str + "\n");
}