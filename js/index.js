if (standalone === true) {
    loadLastPage();
}

function onPageShow() {
    adjustApp();
    //todo may dynamically load links from array
}

function loadLastPage() {
    //for multi-page mobile browser web app
    //for iOS, when web app is launched from home screen icon, it always load first page and does not remember last page visited
    //for Android, when web app is launched from home screen icon, it will remember last page visited and load it
    //for iOS and Android, if web app is removed from memory, neither will remember last page visited
    //iOS safari and Android chrome fix, 
    //cannot detect if windows mobile ie is launched from pinned home page link, assume standalone for now until ie adds property
    var lastPage = localStorage.getItem("com.codedbykevin.telco_tools.lastVisitedPage");
    if (lastPage !== null) {
        switch (lastPage) {
            case "pic_color_finder" :
                //window.location.href = "pic-color-finder.html";
                changeLocationHref("pic-color-finder.html");
                break;
            case "vrad_calculator" :
                //window.location.href = "vrad-calculator.html";
                changeLocationHref("vrad-calculator.html");
                break;
            case "litespan_calculator" :
                //window.location.href = "litespan-calculator.html";
                changeLocationHref("litespan-calculator.html");
                break;
            case "gps_measuring" :
                //window.location.href = "gps-measuring.html";
                changeLocationHref("gps-measuring.html");
                break;
            case "home" :
            default :
                //alert(window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search);
                //alert(window.location.protocol);
                //alert(window.location.pathname);
                //alert(window.location.href);
                /*if (window.location.href !== (window.location.protocol + "//" + window.location.host + window.location.pathname + params)) {
                    changeLocationHref("index.html");
                    //alert('changed');
                } else {
                    //alert('same');
                }*/
                break;
        }
    }
}