var mysql = require("mysql");

var createConnection = () =>
  mysql.createConnection({
    host: "sql6.freemysqlhosting.net",
    user: "sql6406225",
    password: "wC7sDWSqB3",
    database: "sql6406225"
  }); //createconnection thứ 2 is  phương thức kết nối
  /// đăng ký free = db4free.net rồi nhập thông tin login và đây em

  module.exports = {
  load: sql => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      connection.connect();
      connection.query(sql, (error, results, fields) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(results);
        }
        connection.end();
      });
    });
  },
  loadBind: (sql, bind) => { //dang ky user
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      connection.connect();
      connection.query(sql, bind, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
        connection.end();
      });
    });
  },
  add: (tableName, entity) => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      var sql = `insert into ${tableName} set ? `;
      connection.connect();
      connection.query(sql, entity, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
        connection.end();
      });
    });
  },
  update: (tableName, idField, entity, id) => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      var sql = `update ${tableName} set ? where ${idField} = ?`;
      connection.connect();
      connection.query(sql, [entity, id], (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.changedRows);
        }
        connection.end();
      });
    });
  },
  delete: (tableName, idField, id) => {
    //idField:CatID
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      // var tableName ="categories";
      var sql = `delete from ${tableName} where ${idField}=? `;
      console.log(sql);
      connection.connect();
      connection.query(sql, id, (error, results, fields) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(results.affectedRows);
        }
        connection.end();
      });
    });
  }
};

