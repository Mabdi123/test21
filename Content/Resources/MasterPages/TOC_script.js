//The script is hiding irrelevant menu items from the main menu and side menu (by default, everything is displayed)
// It does it by checking what solutions the customer has (according to its customer id) and then hides the other solutions that he doesn't have
//if we don't find the customer id or the customer doesn't have any solution (shouldn't happen), then show everything
//v1.1
var customerSolutions = getCustomerSolutionsIds();
if(customerSolutions){
    var solutionsNamesUserDoesntHave = getSolutionsTextsUserDoesntHave(customerSolutions);
    hideSolutionsFromSideMenu();
    hideSolutionsFromHeaderMenu();
}
else{
    //no customer id or solutions for the customer;
}

//return array of customer solutions ids, e.g. SAM, WLF etc...
function getCustomerSolutionsIds(){
    var customerID = getCustomerId();
    if (!customerID){
        //no customer id
        alert("We didn't find customer id. Need to get here only from RCM.")
        return null;
    }

    var customerSolutions = null;

    //search for customer in customerSolutions json according to id
    $.each(customerSolutionsMapping, function(key, solutions) {
        if (key == customerID){
            customerSolutions = solutions;
        }
    });

    return customerSolutions;
}

//Check first for customer id on query string, if not, check in cookie.
//if customer id was not find, return null.
function getCustomerId(){
    var customerId = getParameterByName('customerId');
    if (customerId){
        //customerId exists in url param
        return customerId;
    }

    // return ($.cookie('customerId'));
    return getCookie('customerId');
    //return 99;
}

//by default, everything is displayed and we hide the irrelevant menu items
function hideSolutionsFromSideMenu() {

    $('.sideContent').find('a').each(function () {
        var menueText = $(this)[0].text;
        if(isNeedToHideText(menueText)){
            $(this).hide();
        }
    });
}

function hideSolutionsFromHeaderMenu() {

    $('.sub-menu').find('a').each(function () {
        var menueText = $(this)[0].text;
        if(isNeedToHideText(menueText)){
            $(this).hide();
        }
    });


    //hide menu items when mobile toggle button is clicked
    $('.left-off-canvas-toggle').click(hideMobileMenu);

    ////hide from mobile menu
    $('.left-off-canvas-menu').find('a').each(function () {
        var menueText = $(this)[0].text;
        if(isNeedToHideText(menueText)){
            $(this).hide();
        }
    });
}

//hide irrelevant links and add to each link an event to fire hide menu when it's clicked.
function hideMobileMenu(){
    //hide from mobile menu
    $('.left-off-canvas-menu').find('a').each(function () {
        var menueText = $(this)[0].text;
        $(this)[0].onclick = hideMobileMenu; //we need to add click event because the menu is built in javascript and menu items are added after every link
        if(isNeedToHideText(menueText)){
            $(this).parent().hide(); //hide the parent (li node), becausae when hiding only the a tag on the mobile menu, it doesn't look good
        }
    });

}


/**
 * Return true if one of the names of the solutions that the user doesn't (solutionsUserDoesntHave) have is part of the text
 */
function isNeedToHideText(text){
    return isArrayContainsText(solutionsNamesUserDoesntHave, text);
}

/**
 * Compare the solutions that the user have with the list of all solutions.
 * @param customerSolutions
 * @returns {Array} return array of display names that of the user has. If user doesn't have any solution, return empty array
 */
function getSolutionsTextsUserDoesntHave(customerSolutions){

    var userSolutionsTexts = [];

    $.each(listAllSolutions, function(key, solution) {
        if (customerSolutions.indexOf(solution.code) == -1) {
            //user doesn't have this solution
            userSolutionsTexts = userSolutionsTexts.concat(solution.displayNames);
        }
    });

    return userSolutionsTexts;
}

function isArrayContainsText(arr, text){
    var textExists = false;

    arr.forEach(function(elem){
        if (text.toLowerCase().indexOf(elem.toLowerCase()) >= 0){
            //text exists in arr
            textExists = true;
        }
    });

    return textExists;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}