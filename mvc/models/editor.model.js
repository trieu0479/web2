var db =require("../connection");

module.exports = {
    update: entity => {
        var id = entity.IDBaiViet;
        delete entity.IDBaiViet;
        console.log(id);
        return db.update('baiviet', 'IDBaiViet', entity, id);
    },
    detail: id => {
        return db.load(`SELECT * FROM baiviet, taikhoan, tinhtrang WHERE taikhoan.MaTaiKhoan = ${id} and baiviet.IDWriter = taikhoan.MaTaiKhoan `);
    },
    infor: id =>{
        return db.load(`select * from taikhoan where MaTaiKhoan = ${id}`);
    }, 
    baiviet: (id, start, end) => {
        return db.load(`select * from baiviet join tinhtrang on baiviet.TinhTrang = tinhtrang.ID where IDWriter = ${id} limit ${end} offset ${start} `);
        //return db.load(`select * from baiviet where baiviet.IDWriter = ${id} and baiviet.TinhTrang = 0 or baiviet.TinhTrang = 1 limit ${end} offset ${start} `);
    }, 
    sl: id =>{
        return db.load(`select * from baiviet where IDWriter = ${id}`);
    },
    chitiet: id =>{
        return db.load(`select * from baiviet where IDBaiViet = ${id}`);
    },
    hieuchinh: id =>{
        return db.load(`select * from baiviet where baiviet.IDWriter = ${id} and baiviet.TinhTrang = 0 or  baiviet.IDWriter = ${id} and baiviet.TinhTrang = 1 `);
    }, 
    laychuyenmuc: () => {
        return db.load('select * from chuyemuc');
    },
};