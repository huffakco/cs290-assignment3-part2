/* blatantly copied from: */
/* jwolford OSU CS290 video on Local Storage */
/* https://developer.mozilla.org/en-US/docs/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces */
/* https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started */

window.onload = function() {
  document.getElementById('output').innerHTML
  var settingsStr = localStorage.getItem('userSettings');
  if( settingsStr === null) {
    settings = {'sports':[]};
    localStorage.setItem('userSettings',JSON.stringify(settings));
  }
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

      
/*function getGists() {*/
 /* window.XMLHttpRequest*/
  var httpRequest = new XMLHttpRequest();
  if(!httpRequest){
    throw 'unable to create HttpRequest.';
  }
  httpRequest.open('GET','http://api.github.com/gists/public');
  httpRequest.send();
 /* } */
  
/* define HTTP request object as a JavaScript */
/* function that will handle processing the response */
httpRequest.onreadystatechange = gistFunction;

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
  
  