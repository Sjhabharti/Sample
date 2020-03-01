// Import stylesheets
import "./style.css";


const acctData = [
  {
    acctNum: "AAA - 1234",
    user: "Alice"
  },
  {
    acctNum: "AAA - 5231",
    user: "Bob"
  },
  {
    acctNum: "AAA - 9921",
    user: "Alice"
  },
  {
    acctNum: "AAA - 8191",
    user: "Alice"
  }
];
const balanceData = {
  "AAA - 1234": 4593.22,
  "AAA - 9921": 0,
  "AAA - 5231": 232142.5,
  "AAA - 8191": 4344
};

//Q:1-(a) filter By user
//var arrayOfaccount = getfilterData('Alice', '', '', '');

//Q:1-(b) sort by account number ascending
//var arrayOfaccount = getfilterData('', 'AAA - 1234', '', '');

//sort by account number descending
var arrayOfaccount = getfilterData("", "AAA - 1234", "", "des");

//sorted by balance  ascending
//var arrayOfaccount = getfilterData('', '', 4593.22, 'asc');

//sorted by balance  descending
// var arrayOfaccount = getfilterData('', '', '', 'desc');

//Q:2(a) filter by Bob
//var arrayOfaccount = getfilterData('Bob','','','' );

//Q:2(b)sorted by account number
// var arrayOfaccount = getfilterData('', 'AAA - 1234', '','asc');
//var arrayOfaccount = getfilterData('', 'AAA - 1234', ,'desc');

//Q:2(c) filter by Alice sorted by balance ascending
//var arrayOfaccount = getfilterDatabalance('Alice', 'asc');

console.log(arrayOfaccount);

function getfilterData(user, acctNum, balance, sortDirection) {
  var filterData;
  var filterBalanceData;

  if (!isNullOrUndefined(user)) {
    filterData = acctData.filter(x => x.user == user);
  } else if (!isNullOrUndefined(acctNum)) {
    filterData = acctData.filter(x => x.acctNum == acctNum);
  } else if (!isNullOrUndefined(balance)) {
    let amount = [balance];
    filterBalanceData = Object.entries(balanceData)
      .map(x => ({
        key: x[0],
        value: x[1]
      }))
      .filter(x => amount.includes(x.value))
      .reduce((acc, entry) => {
        acc[entry.key] = entry.value;
        return acc;
      }, {});
  }

  if (!isNullOrUndefined(sortDirection && filterData) && balanceData) {
    let resultSortedbalance;
    let resultNamebalance;
    if (!isNullOrUndefined(balanceData) && sortDirection) {
      resultSortedbalance = sortBalanceData(balanceData, sortDirection);
    }
    if (!isNullOrUndefined(filterData) && sortDirection) {
      resultNamebalance = sort(filterData, sortDirection).concat(
        resultSortedbalance
      );
    }
    return resultNamebalance ? resultNamebalance : resultSortedbalance;
  }
  if (!isNullOrUndefined(sortDirection && filterBalanceData)) {
    let resultSortedbalance;

    if (!isNullOrUndefined(filterBalanceData) && sortDirection) {
      resultSortedbalance = sortBalanceData(filterBalanceData, sortDirection);
    }

    return resultSortedbalance;
  }

  if (!isNullOrUndefined(sortDirection) && filterBalanceData) {
    return sortBalanceData(filterBalanceData, sortDirection);
  }
  if (!isNullOrUndefined(filterData)) {
    let result;
    if (!sortDirection) {
      sortDirection = "asc";
    } else {
      sortDirection;
    }
    if (!isNullOrUndefined(filterData) && sortDirection) {
      result = sort(filterData, sortDirection);
    }
    return result;
  }
}
function getfilterDatabalance(user, sortDirection) {
  let resultSortedbalance;
  let resultNamebalance;
  if (!sortDirection) {
    sortDirection = "asc";
  } else {
    sortDirection;
  }

  if (!isNullOrUndefined(user)) {
    filterData = acctData.filter(x => x.user == user);
    if (!isNullOrUndefined(balanceData) && sortDirection) {
      resultSortedbalance = sortBalanceData(balanceData, sortDirection);
    }
    if (!isNullOrUndefined(filterData) && sortDirection) {
      resultNamebalance = sort(filterData, sortDirection).concat(
        resultSortedbalance
      );
    }
    return resultNamebalance ? resultNamebalance : resultSortedbalance;
  }
}
function sortBalanceData(val, order) {
  let result = [];
  for (input in val) {
    result.push([input, val[input]]);
  }
  if (order == "asc") {
    return result.sort(function(a, b) {
      return a[1] - b[1];
    });
  } else {
    return result
      .sort(function(a, b) {
        return a[1] - b[1];
      })
      .reverse();
  }
}

function sort(arr, order) {
  let result = arr.sort(function(a, b) {
    // Use toUpperCase() to ignore character casing
    const accountA = a.acctNum.toUpperCase();
    const accountB = b.acctNum.toUpperCase();

    var comparison = 0;
    if (accountA > accountB) {
      comparison = 1;
    } else if (accountA < accountB) {
      comparison = -1;
    }
    return order == "desc" ? comparison * -1 : comparison;
  });
  return result;
}

function isNullOrUndefined(temp) {
  try {
    return Boolean(
      temp === undefined || temp === "" || temp === null || !String(temp).trim()
    );
  } catch (e) {
    return false;
  }
}
