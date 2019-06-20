var db = require("../connection");


module.exports ={
    // all: (start, end) => {
    //     return db.load(`select  *  from baiviet limit ${end} offset ${start}`);
    // },
    sl:() => {
        return db.load(`SELECT * FROM taikhoan WHERE MaLoaiTaiKhoan = 4`);
    },
    all:(start, end) => {
        return db.load(`SELECT * FROM taikhoan WHERE MaLoaiTaiKhoan = 4 limit ${end} offset ${start}`);
    },
    phancong: id => {
        return db.load(`select * 
        from chuyemuc cm 
        where cm.IDChuyenMuc not in (select phancong.IDChuyenMuc FROM phancong where phancong.IDEd = ${id})`);
    },
    detail: id =>{
        return db.load(`select * from taikhoan where MaTaiKhoan = ${id}`);
    },
    add: entity =>{
        return db.add('phancong', entity);
    },
    chuyenmuc: id =>{
        return db.load(`select * from chuyemuc join phancong on chuyemuc.IDChuyenMuc = phancong.IDChuyenMuc where phancong.IDEd = ${id} `);
    },
    delete: id =>{
        console.log(id);
        return db.delete(`delete from phancong where IDPhanCong = ${id}`);
    },
    update: entity => {
        var id = entity.IDBaiViet;
        delete entity.IDBaiViet;
        console.log(id);
        return db.update('baiviet', 'IDBaiViet', entity, id);
      },
};