
var userData = rankingData.data;
var headerData = rankingData.cols;
var table = $('#ranking-table');
var page = 1;
var totalPages = userData.length / 20; 
var slice;

/////////////////////
// SORT FUNCTIONS  //
/////////////////////

// Sort by wins
var mostWins = function(user){
  return -user.wins;
};

var sortByWins = function(){
  userData = _.sortBy(userData, mostWins);
};

/////////////////
// BUILD TABLE //
/////////////////

// Build table headers
var buildTableHeaders = function(row){
  var th = $('<th>');
  th.append(row);
  return th;
};

// Build users to table 
var buildTableRow = function(user){
  var tr = $('<tr>');
  for (var attribute in user){
    tr.append('<td>' + user[attribute] + '</td>');
  }
  return tr;
};

// Append header to table

var appendHeaders = function(headers){
  var results = _.map(headers, buildTableHeaders);
  table.append(results);
};

// Append users to table
var appendUsers = function(users){
  var results = _.map(users, buildTableRow);
  table.append(results);
};

/////////////
// FILTERS //
/////////////



// Pluck out regions

var filterByRegion = function(){
  console.log();
};


////////////////
// PAGINATION //
////////////////

var paginateUsers = function(page){
  if(page === 1){
    return userData.slice(0, 20);  
  }
  else{
    console.log((page-1)*20 + 1, page*20);
    return userData.slice((page-1)*20 + 1, page*20);
  } 
};

// Add controls
var appendControls = function(clickedPage){

  clickedPage = clickedPage || 1;
  var prevPage, nextPage;
  if (clickedPage === 1){
    prevPage = 1;
    nextPage = 2;
  }
  else if (clickedPage === totalPages){
    nextPage = clickedPage;
    prevPage = clickedPage-1;
  }
  else{
    prevPage = clickedPage - 1;
    nextPage = clickedPage + 1;
  }

  var tr = $('<tr class="pagination">');
  var td = $('<td colspan="' + headerData.length + '">');
  var first = $('<a href="1">First</a><');
  var prevLink = $('<a href="' + prevPage +'">Previous 20</a><');
  var nextLink = $('<a href="' + nextPage +'">Next 20</a>');
  var last = $('<a href="' + totalPages + '">Last</a><');
  var pages = _.map(_.range(1,totalPages+1), function(page){
    return $('<a href="' + page +'">' + page + '</a> ');
  });
  td.append(first)
    .append(prevLink)
    .append(pages)
    .append(nextLink)
    .append(last);
  tr.append(td);
  table.append(tr);
};

////////////////////
// PAGE RENDERING //
////////////////////

// Render the page
var renderPage = function(page){
  table.empty();
  slice = paginateUsers(page);
  appendHeaders(headerData);
  appendUsers(slice);
  appendControls(page);

};

// DOCUMENT ON READY STUFF BELOW

$(document).on('ready', function() {

  // Map the headers onto the data
  var mappedList = userData.map( function(user){
    return  _.object(headerData,user)
  });
  // Update the original list
  userData = mappedList;

  console.log(userData);
  
  sortByWins();
  renderPage(1);
  filterByRegion();

  $('#ranking-table').on('click','a', function(e){
    e.preventDefault();

    var clicked = $(this);
    console.log(clicked.attr('href'));
    renderPage(Number(clicked.attr('href')));
});



  
  
});