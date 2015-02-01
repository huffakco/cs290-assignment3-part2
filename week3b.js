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
}

/* use to store array of Html Objects */
function HtmlObjList(id) {
  this.list = new Array();
  this.id = id

  this.loadHtmlObjList = function(arrHtmlObj){
    this.list = arrHtmlObj;
    return(this.list);
  }
  
  this.addHtmlObject = function(htmlObj){
    this.list.push(htmlObj);
    return(this.list);
  }
}

var convertGistPageToList = function(req,obj) {
    /* define HTTP response as a JavaScript object */
    var testJSON = JSON.parse(req.responseText);
    console.log(testJSON);
    /* search for html_url, description, language under files.file name object.language */
    /* if description is empty set to "generic gist" */
    for (var i = 0; i < testJSON.length; i++)
    {
      /*Reference: */
      /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in */
      for (var prop in testJSON[i]) {
        if (prop === 'html_url')
        {
          var htmlUrl = testJSON[i].html_url;
        }
        if (prop === 'description')
        {
          var desc = testJSON[i].description;
        }
      }
      if (!(htmlUrl) || (htmlUrl == null))
      {
          htmlUrl = "https://gist.github.com";
      }
      if (!(desc) || (htmlUrl == null))
      {
          desc = "generic description text";
      }
      for (var prop in testJSON[i].files) {
        for (var subProp in testJSON[i].files[prop])
          if (subProp === 'language')
          {
            var language = testJSON[i].files[prop][subProp];
          }
      }
      if (!(language) || (language == null))
      {
          language = "Unknown";
      }
      var newGistObj = new HtmlObject({name:language,description:desc,url:htmlUrl});
      
      if ((searchParams.language === "All") || (newGistObj.name === searchParams.language))
      {
        obj.list.push(newGistObj);
      }
    }
    /* Generate the table with results */
    searchParams.refreshSearch();
    var idName = document.getElementById('searchResults');
    generate_table(obj.list, idName);
};


function Search()
{
  page: 1;
  language: 'ALL';
  
  this.refreshSearch = function() {
    this.page = document.getElementsByName('page_input')[0].value;
    var languageTag = document.getElementsByName('language_input')
    for (var i = 0; i < languageTag.length; i++)
    {
      if (languageTag[i].checked)
      {
        this.language = document.getElementsByName('language_input')[i].value;
      }
    }
  };
  
};


/* Create the objects to keep track of this page */
var searchParams = new Search();
var gistPages = new GistPages;
favor = new HtmlObjList('favoritesList');
gist = new HtmlObjList('searchResults');



/* Generate a table around HtmlObjList */
/* Reference: */
/* https://developer.mozilla.org/en-US/docs/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces */
function generate_table(arr,idName) {
  // creates a <table> element and a <tbody> element
  var tbl = document.createElement('table');
  var tblHeader = document.createElement('thead');
  var tblBody = document.createElement('tbody');

  // Define header row
  var row = document.createElement("tr");
  var tblHead1 = document.createElement("th");
  if (idName.id === 'searchResults') {
      tblHead1.innerHTML = "Select Favorite";
  } else {
      tblHead1.innerHTML = "Remove Favorite";   
  }
  
  row.appendChild(tblHead1);
  
  var tblHead2 = document.createElement("th");
  tblHead2.innerHTML = "Language";
  row.appendChild(tblHead2);
  
  var tblHead3 = document.createElement("th");
  tblHead3.innerHTML = "Description";
  row.appendChild(tblHead3);
  tblHeader.appendChild(row);
  
  var tblHead4 = document.createElement("th");
  tblHead4.innerHTML = "URL";
  row.appendChild(tblHead4);
  tblHeader.appendChild(row); 
  
  // creating all cells
  for (var i = 0; i < arr.length; i++) {
    // creates a table row
    var row = document.createElement("tr");
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
    var cell1 = document.createElement("td");
    var cellChkBox = document.createElement("input");
    cellChkBox.type = "checkbox";
    cellChkBox.id = ["chk_" + i];
    cellChkBox.checked = false;
    var cell2 = document.createElement("td");
    var cellName = document.createTextNode(arr[i].name);
    var cell3 = document.createElement("td");
    var cellDescription = document.createTextNode(arr[i].description);
    var cell4 = document.createElement("td");
    var cellLink = document.createTextNode(arr[i].url);
    cell1.appendChild(cellChkBox);
    cell2.appendChild(cellName);
    cell3.appendChild(cellDescription);
    cell4.appendChild(cellLink);
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
 
    // add the row to the end of the table body
    tblBody.appendChild(row);
  }
 
  // put the <tbody> in the <table>
  tbl.appendChild(tblHeader);
  tbl.appendChild(tblBody);
   // appends <table> into <body>
  idName.appendChild(tbl);
  // sets the border attribute of tbl to 2;
  tbl.setAttribute("border", "2");
  
  // add event listener to checkbox
  for (var i = 0; i < arr.length; i++) {
    cellChkBoxId = document.getElementById(["chk_" + i]);
    if (idName.id === 'searchResults') {
        cellChkBoxId.onclick = handleChkBoxSearch;
    } else {
        cellChkBoxId.onclick = handleChkBoxFavorites;   
    }
  }
  
}

handleChkBoxSearch = function() {
  console.log("checked a Search");
}

handleChkBoxFavorites = function() {
  console.log("checked a Favorite");
}

window.onload = function() {
/* load local storage into object */
  document.getElementById('output').innerHTML
 
  var settingsStr = getLocalStorage();
 

  /* Update Favorites list */
    var idName = document.getElementById('favoritesList'); 
    generate_table(favor.list, idName);

  searchParams.refreshSearch();
}


function saveLocalSearch() {
  searchParams.page = document.getElementsByName('page_input')[0].value;
  var languageTag = document.getElementsByName('language_input')
  for (var i = 0; i < languageTag.length; i++)
  {
    if (languageTag[i].checked)
    {
      searchParams.language = document.getElementsByName('language_input')[i].value;
    }
  }
  var userSettings=[searchParams,favor.list];
  localStorage.setItem('userSettings',JSON.stringify(userSettings));
}
    
function clearLocalStorage() {
    localStorage.clear();
}
    
function getLocalStorage(){
    var settings = localStorage.getItem('userSettings');
    var userSettings = JSON.parse(settings);
    if (!userSettings)
    {
      userSettings = new Array;
      tmpSearch = new Search;
      tmpSearch.page = 1;
      document.getElementsByName('page_input')[0].value = 1;
      tmpSearch.language = "All";
      document.getElementsByName('language_input')[0].checked = true;
      userSettings.push(tmpSearch);
      userSettings.push(new Array);
      localStorage.setItem('userSettings',JSON.stringify(userSettings));
    }
    else
    {
      document.getElementsByName('page_input')[0].value = userSettings[0].page;
      var languageTag = document.getElementsByName('language_input')
      for (var i = 0; i < languageTag.length; i++)
      {
        if (languageTag[i].value === userSettings[0].language)
        {
           languageTag[i].checked = true;
        }
      }
    }
    return(userSettings);
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


/* Object to manage the list of pages */
function GistPages() {
  this.reqPages = new Array;
  
  this.loadGistPages = function() {
    /* empty previous results - new request */
    this.reqPages.length = 0;
    gist.list.length = 0; /* empty list of previous results */
    
    /* search requests for each page */
    searchParams.page = document.getElementsByName('page_input')[0].value;
    for (var i = 0; i < searchParams.page; i++)
    {
      var nextReq = new GistPage(i+1);
      this.reqPages.push(nextReq);
      console.log(this.reqPages[i].httpRequest);
    }
  }
}

/* Object to manage a request for a specific Gist page */
 function GistPage(pageNum) {
   this.httpRequest = new XMLHttpRequest();
   this.page = pageNum;

   if(!this.httpRequest){
      throw 'unable to create HttpRequest.';
    }
    // Copied from Nickolas Jurczak on Canvas Discussion
    // Setup the URL to make the request
    this.baseurl = 'https://api.github.com/gists/public';
    this.url = this.baseurl + '?page=' + pageNum + '&per_page=30';
 
    /* Reference: */
    /* https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started */
    /* function that will handle processing the response */
    this.httpRequest.onreadystatechange = function() {
      /* function to handle the request response */
              /* check the response code */
 
      if ((!(this) || (this === 'null')))
      {
          console.log("onreadystatechange called but request undefined or null");
      }
      else {
        if (this.status === 200) {

          if (this.readyState === 4) {
              // everything is good, the response is received
              //console.log(this.responseText);
 
              /* Add to list of HtmlObjects */
              convertGistPageToList(this,gist);
          } else {
            console.log("onreadystatechange called but not ready");
          }
        }
        else
        {
            console.log("onreadystatechange called but not status = 200");
        }
      }
    }

    // make and send the request
    this.httpRequest.open('GET',this.url);
    // Example URL calls from assignment input:
    //httpRequest.open('GET','http://api.github.com/gists/public');
    //  httpRequest.open('GET','https://developer.github.com/v3/gists/#list-gists');
    this.httpRequest.send(); 
     
};
