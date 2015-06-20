var data = [
  {
    login: "mojombo",
    id: 1,
    gravatar_id: "",
    url: "https://api.github.com/users/mojombo",
    type: "User",
    site_admin: false
  },
  {
    login: "defunkt",
    id: 2,
    gravatar_id: "",
    url: "https://api.github.com/users/defunkt",
    type: "User",
    site_admin: true
  },
  {
    login: "pjhyett",
    id: 3,
    gravatar_id: "",
    url: "https://api.github.com/users/pjhyett",
    type: "User",
    site_admin: true
  },
  {
    login: "wycats",
    id: 4,
    gravatar_id: "",
    url: "https://api.github.com/users/wycats",
    type: "User",
    site_admin: false
  }
];

var ASC = 1, DESC = -1;
var sortDirection = [];
var setSortDirection = function() {
  for (var i = 0; i < data.length; i++) {
    sortDirection.push(DESC);
  }
};
setSortDirection();

var tableHeaders = Object.keys(data[0]);
var dataInput = {tableInput: data, headers: tableHeaders};

var source = document.getElementById("entry-template").innerHTML;
var template = Handlebars.compile(source);

var setSortListener = function() {
  var headerClicks = document.getElementsByTagName("th");
  Array.prototype.forEach.call(headerClicks, function(e, i) {
    e.addEventListener("click", function(el) {
      var sortKey = el.srcElement.outerText,
          index = el.srcElement.getAttribute("data-index"),
          tempArray = data;
          tempArray.sortUsing(sortKey, sortDirection[index]);
          sortDirection[index] = (sortDirection[index] === ASC ? DESC : ASC);
          dataInput.tableInput = tempArray;
          render();
    });
  });
};

var timerId;
var setSearchListener = function() {
  var searchType = document.getElementById("search-bar");
  searchType.addEventListener("keyup", function(el) {
    var searchPhrase = el.srcElement.value;
    clearTimeout(timerId);
    timerId = setTimeout(function() {
    var filteredData = data.filter(function(user) {
      return tableHeaders.some(function(key) {
        return user[key].toString().match(searchPhrase);
      });
    });
    dataInput.tableInput = filteredData;
    render();
    }, 1000);
  });
};
setSearchListener();
function render() {
  var html = template(dataInput);
  document.getElementById("hb-container").innerHTML = html;
  setSortListener();
}

render();

Array.prototype.sortUsing = function(key, direction) {
  this.sort(function(a, b) {
    if (a[key] === b[key]) {
      return 0;
    }
    return a[key] > b[key] ? direction : -direction;
  });
};
