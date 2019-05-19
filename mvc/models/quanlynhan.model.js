var db =require("../connection");

module.exports = {
    all: () => {
        return db.load('select  *  from tag ');
    },
    detail: id =>{
        return db.load(`select * from tag where IDTag = ${id}`);
    }
};