var db =require("../connection");

module.exports = {
    all: (start, end) => {
        return db.load(`select  *  from tag limit ${end} offset ${start}`);
    },
    sl: () => {
        return db.load('select  *  from tag ');
    },
    detail: id =>{
        return db.load(`select * from tag where IDTag = ${id}`);
    },
    add: entity =>{
        return db.add('tag', entity);
    },
    delete: id =>{
        return db.delete('tag', 'IDTag', id);
    }
};