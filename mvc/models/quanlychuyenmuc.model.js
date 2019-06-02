var db = require("../connection");

module.exports = {
    all: (start, end) => {
        return db.load(`select  *  from danhmuc limit ${end} offset ${start}`);
    },
    sl: () => {
        return db.load('select  *  from danhmuc ');
    },
    detail: id => {
        return db.load(`select * from chuyemuc join danhmuc on chuyemuc.IDDanhMuc = danhmuc.IDDanhMuc where danhmuc.IDDanhMuc = ${id}`);
    },
    detail1: id => {
        return db.load(`select * from danhmuc where IDDanhMuc = ${id}`);
    },
    detailchm: id => {
        return db.load(`select * from chuyemuc where IDChuyenMuc = ${id}`);
    },
    add: entity => {
        return db.add('danhmuc', entity);
    },
    addchm: entity => {
        return db.add('chuyemuc', entity);
    },
    delete: id => {
        return db.delete('danhmuc', 'IDDanhMuc', id);
    },
    deletechm: id => {
        return db.delete('chuyemuc', 'IDChuyenMuc', id);
    },
    update: entity => {
        var id = entity.IDDanhMuc;
        delete entity.IDDanhMuc;
        return db.update('danhmuc', 'IDDanhMuc', entity, id);
    },
    updatechm: entity => {
        var id = entity.IDChuyenMuc;
        delete entity.IDChuyenMuc;
        return db.update('chuyemuc', 'IDChuyenMuc', entity, id);
    },

};