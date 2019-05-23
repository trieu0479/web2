var db = require('../connection');


module.exports = {
    chitiet: (id) => {
       // return db.load(`select * from baiviet join danhmuc on baiviet.IDDanhMuc =  danhmuc.IDDanhMuc where baiviet.IDBaiViet = ${id}`);
       return db.load(`select * from baiviet join chuyemuc on 
       baiviet.IDChuyenMuc = chuyemuc.IDChuyenMuc where baiviet.IDBaiViet = ${id} `);
    },
    binhluan: (id) =>{
        return db.load(`select TenDocGia, NgayBinhLuan, NoiDung, count(*) as sl from binhluan where IDBaiViet = ${id} group by  TenDocGia, NgayBinhLuan, NoiDung order by NgayBinhLuan`);
    },
    nambaiviet: (id) =>{
        return db.load(`select * from baiviet bv1 join baiviet bv2 on bv1.IDChuyenMuc = bv2.IDChuyenMuc
        where bv1.IDBaiViet = ${id} order by rand() limit 5`);
    },
        demchuyenmuc:() => {
        let sql = `select TenChuyenMuc, chuyemuc.IDChuyenMuc, count(baiviet.IDBaiViet) as sl1 from chuyemuc join baiviet where chuyemuc.IDChuyenMuc = baiviet.IDChuyenMuc group by TenChuyenMuc,IDChuyenMuc`;
        return db.load(sql);
    },

}