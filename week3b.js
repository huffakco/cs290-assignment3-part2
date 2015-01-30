/* blatantly copied from: */
/* jwolford OSU CS290 video on Local Storage */
/* https://developer.mozilla.org/en-US/docs/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces */
/* https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started */
/* includes code from OSU CS290 Canvas Discussion */

/* outline of requirements */
/* 1) Provide user a button that sends Gist request */
/* 2) Generate a table from returned response with Gist request */
/*    Lists descriptions that are also a link to html version */
/*    Lists checkbox button that grays out link and sends item to favorites */
/* 3) Provide user input boxes to enter the search parameters */
/*     a) Pick 1 to 5 pages       */
/*     b) Select Gist language from checkbox (Python, JSON, JavaScript, SQL) */
/*        Results are post filtered */
/* 4) Update Gist request with search parameters */
/* 5) Filter Gist responses based on language */
/* 6) Generate Favorites List each time Gist is checked */
/*    Lists descriptions that are also a link to html version */
/*    Lists checkbox button that removes item from favorites and storage */
/* 7) Generate a list of Favorites on page load */
/* 8) Provide user a button that saves search parameters to local storage */
/* 9) When checkbox on gist is checked, put item in favorites list */ 
/* 10) Automate saving to local storage from search parameters */

function HtmlObject(params) {
  this.name = params.name;
  this.description = params.description;
  this.url = params.url;

  this.getHtmlObject = function() {
  }
  
}

/* use to store array of Html Objects */
function HtmlObjList() {
  this.list = new Array();
}

/* temporary - create some object literals to use in loading testing */
favor = new HtmlObjList();
h1 = new HtmlObject({name:'test1.html',description:'This is my test',url:'\\github.com'});;
h2 = new HtmlObject({name:'test2.html',description:'This is my test',url:'\\github.com'});;
h3 = new HtmlObject({name:'test3.html',description:'This is my test',url:'\\github.com'});;
favor.list.push(h1);
favor.list.push(h2);
favor.list.push(h3);

/* temporary - create some object literals to use in loading testing */
gist = new HtmlObjList();
h4 = new HtmlObject({name:'test4.html',description:'This is my test',url:'\\github.com'});;
h5 = new HtmlObject({name:'test5.html',description:'This is my test',url:'\\github.com'});;
h6 = new HtmlObject({name:'test6.html',description:'This is my test',url:'\\github.com'});;
gist.list.push(h1);
gist.list.push(h2);
gist.list.push(h3);
gist.list.push(h4);
gist.list.push(h5);
gist.list.push(h6);

/* Generate a table around HtmlObjList */
function generate_table(arr,idName) {
  // arr is an array of HtmlObjList elements
  // get the reference for the body
//  var body = document.getElementsByTagName("body")[0];
  
  // creates a <table> element and a <tbody> element
  var tbl     = document.createElement('table');
  var tblBody = document.createElement('tbody');
  
  // Define header row
  var row = document.createElement("tr");
  var tblHead1 = document.createElement("th");
  var tblName = document.createTextNode("Name");
  var tblHead2 = document.createElement("th");
  var tblDesc = document.createTextNode("Description");
  tblHead1.appendChild(tblName);
  tblHead2.appendChild(tblDesc); 
  tblBody.appendChild(row);
 
  // creating all cells
  for (var i = 0; i < arr.length; i++) {
    // creates a table row
    var row = document.createElement("tr");
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
    var cell1 = document.createElement("td");
    var cellName = document.createTextNode(arr[i].name);
    var cell2 = document.createElement("td");
    var cellDescription = document.createTextNode(arr[i].description);
    var cell3 = document.createElement("td");
    var cellLink = document.createTextNode(arr[i].url);
    cell1.appendChild(cellName);
    cell2.appendChild(cellDescription);
    cell3.appendChild(cellLink);
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
 
    // add the row to the end of the table body
    tblBody.appendChild(row);
  }
 
  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  idName.appendChild(tbl);
  // sets the border attribute of tbl to 2;
  tbl.setAttribute("border", "2");

}




window.onload = function() {
/* load local storage into object */
  document.getElementById('output').innerHTML
  var settingsStr = localStorage.getItem('userSettings');
  if( settingsStr === null) {
    settings = {'searchParams':[],'favorites':[]};
    localStorage.setItem('userSettings',JSON.stringify(settings));
  }
  /* Update search parameters */
  
  /* Update Favorites list */
  
  var idName = document.getElementById('favoritesList'); 
  generate_table(favor.list, idName);
  var idName = document.getElementById('searchResults');
  generate_table(gist.list, idName);
  
}



  function saveDemoInput() {
    localStorage.setItem('demoText',document.getElementsByName('demo-input')[0].value);
    }
    
    function clearLocalStorage() {
    localStorage.clear();
    }
    
    function displayLocalStorage(){
      document.getElementById('output').innerHTML = localStorage.getItem('demoText');
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
function getGistList(page) {
  var httpRequest = new XMLHttpRequest();
  if(!httpRequest){
    throw 'unable to create HttpRequest.';
  }
  // Copied from Nickolas Jurczak on Canvas Discussion
  var baseurl = 'http://api.github.com/gists/public';
  var url = baseurl + '?page=' + page + '&per_page=30';
  httpRequest.open('GET',url);
 //httpRequest.open('GET','http://api.github.com/gists/public');
//  httpRequest.open('GET','https://developer.github.com/v3/gists/#list-gists');
  httpRequest.send();
  return (httpRequest);
  
} 

 
/* define HTTP request object as a JavaScript */
/* function that will handle processing the response */
// httpRequest.onreadystatechange = gistFunction;
var req = getGistList(1); 
req.onreadystatechange = gistFunction(req);

function gistFunction(httpRequest) {
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
