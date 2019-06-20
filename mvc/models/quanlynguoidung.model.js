var db =require("../connection");

module.exports = {
    loai: () => {
        return db.load('select * from loaitaikhoan');
    },
    all: (id, start, end) => {
        return db.load(`select  *  from taikhoan join loaitaikhoan on taikhoan.MaLoaiTaiKhoan = loaitaikhoan.MaLoaiTaiKhoan where taikhoan.MaLoaiTaiKhoan = ${id} limit ${end} offset ${start}`);
    },
    sl: () =>{
        return db.load('select  *  from taikhoan join loaitaikhoan on taikhoan.MaLoaiTaiKhoan = loaitaikhoan.MaLoaiTaiKhoan');
    },
    detail: id =>{
        return db.load(`select * from taikhoan  where MaTaiKhoan = ${id}`);
    },
    delete: id =>{
        return db.delete('taikhoan', 'MaTaiKhoan', id);
    },
    update: entity => {
        var id = entity.MaTaiKhoan;
        delete entity.MaTaiKhoan;
        console.log(id);
        return db.update('taikhoan', 'MaTaiKhoan', entity, id);
      },
};