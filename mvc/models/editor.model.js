var db =require("../connection");

module.exports = {
    update: entity => {
        var id = entity.MaTaiKhoan;
        delete entity.MaTaiKhoan;
        console.log(id);
        return db.update('taikhoan', 'MaTaiKhoan', entity, id);
    },
    updatett: entity => {
        var id = entity.IDBaiViet;
        delete entity.IDBaiViet;
        console.log(id);
        return db.update('baiviet', 'IDBaiViet', entity, id);
    },
    detail: id => {
        return db.load(`SELECT * FROM baiviet join phancong on baiviet.IDChuyenMuc = phancong.IDChuyenMuc WHERE phancong.IDEd = ${id} `);
    },
    infor: id =>{
        return db.load(`select * from taikhoan where MaTaiKhoan = ${id}`);
    }, 
    baiviet: (id) => {
        return db.load(`select * from baiviet join tinhtrang on baiviet.TinhTrang = tinhtrang.ID where IDWriter = ${id}`);
        //return db.load(`select * from baiviet where baiviet.IDWriter = ${id} and baiviet.TinhTrang = 0BaiViet or baiviet.TinhTrang = 1 limit ${end} offset ${start} `);
    }, 
    sl: id =>{
        return db.load(`select * from baiviet where IDWriter = ${id}`);
    },
    chitiet: id =>{
        return db.load(`select * from baiviet where IDBaiViet = ${id}`);
    },
    add: entity =>{
        return db.add('lydo', entity);
    },
    laychuyenmuc: () => {
        return db.load('select * from chuyemuc');
    },
    xuly: id =>{
        return db.load(`select * from baiviet where IDEd = ${id}`);
    }
};