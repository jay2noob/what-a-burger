const connection = require("../config/connection.js");

function printQuestionMarks(num, double) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    if (double) {
      arr.push("??");
    } else {
      arr.push("?");
    }
  }

  return arr.toString();

}

const orm = {
  selectAll: function(tableInput, cb) {
    var queryString = "SELECT * FROM ??";

    connection.query(queryString, tableInput, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  insertOne: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO ??";

    queryString += " (";

    queryString += printQuestionMarks(vals.length, true);

    queryString += ") ";

    queryString += "VALUES (";

    queryString += printQuestionMarks(vals.length, false);

    queryString += ") ";

    console.log(queryString);
    console.log([table].concat(cols).concat(vals))

    connection.query(

      queryString,

      [table].concat(cols).concat(vals),

      function(err, result) {
        if (err) {
          throw err;
        }

        cb(result);

      }
    );
  },

  // An example of objColVals would be {name: panther, sleepy: true}

  updateOne: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + "??";

    queryString += " SET ";
    queryString += "?";
    queryString += " WHERE ";
    queryString += "?";

    let condProp = Object.keys(condition)[0];
   
    console.log(queryString);
    
    connection.query(
      queryString,
      [table, objColVals, condition],

      function(err, result) {
        if (err) {
          throw err;
        }

        cb(result);

      }
    );
  }
};

module.exports = orm;