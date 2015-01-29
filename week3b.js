/* blatantly copied from: */
/* jwolford OSU CS290 video on Local Storage */
/* https://developer.mozilla.org/en-US/docs/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces */
/* https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started */
/* includes code from OSU CS290 Canvas Discussion */

/* outline of requirements */
/* 1) Provide user input boxes to enter the search parameters */
/*     a) Pick 1 to 5 pages       */
/*     b) Select Gist language from checkbox (Python, JSON, JavaScript, SQL) */
/*        Results are post filtered */
/* 2)   Header to Favorites List */
/*    Lists descriptions that are also a link to html version */
/*    Lists checkbox button that removes item from favorites and storage */
/* 3) Generate a list of Favorites on page load */
/* 4) Provide user a button that saves search parameters to local storage */
/* 5) Provide user a button that sends Gist request */
/* 6) Generate a table from returned response with Gist request */
/*    Lists descriptions that are also a link to html version */
/*    Lists checkbox button that grays out link and sends item to favorites */
/* 7) When checkbox on gist is checked, put item in favorites list */ 
/* 8) Automate saving local storage from search parameters */


window.onload = function() {
/* load local storage into object */
  document.getElementById('output').innerHTML
  var settingsStr = localStorage.getItem('userSettings');
  if( settingsStr === null) {
    settings = {'sports':[]};
    localStorage.setItem('userSettings',JSON.stringify(settings));
  }
  /* Update search parameters */
  
  /* Update Favorites list */
  
}
  function saveDemoInput() {
    localStorage.setItem('demoText',document.getElementsByName('demo-input')[0].value);
    }
    
    function clearLocalStorage() {
    localStorage.clear();
    }
    
    function displayLocalStorage(){
      document.getElementByID('output').innerHTML = localStorage.getIemt('demoText');
      }
      
function urlStringify(obj){
  var str = []
  for(var prop in obj){
      var s = encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]);
      str.push(s);
  }
  return str.join('&');
}


/* use as test vehicle to make a basic request */      
function getGists() {
  var httpRequest = new XMLHttpRequest();
  if(!httpRequest){
    throw 'unable to create HttpRequest.';
  }
  httpRequest.open('GET','http://api.github.com/gists/public');
  httpRequest.send();
  
} 

/* use as test vehicle to make a list request */      
function getGistList() {
  var httpRequest = new XMLHttpRequest();
  if(!httpRequest){
    throw 'unable to create HttpRequest.';
  }
  httpRequest.open('GET','https://developer.github.com/v3/gists/#list-gists');
  httpRequest.send();
  
} 

 
/* define HTTP request object as a JavaScript */
/* function that will handle processing the response */
// httpRequest.onreadystatechange = gistFunction;
var req = getGistList; 
req.onreadystatechange = gistFunction;

function gistFunction() {
  /* function to handle the request response */
  if (httpRequest.readyState === 4) {
      // everything is good, the response is received
      console.log(httpRequest.responseText);
      var testJSON = JSON.parse(httpRequest.responseText);
  } else {
      // still not ready
  }

  /* check the response code */
  if (httpRequest.status === 200) {
      // perfect!
  } else {
      // there was a problem with the request,
      // for example the response may contain a 404 (Not Found)
      // or 500 (Internal Server Error) response code
  }
}
  
  