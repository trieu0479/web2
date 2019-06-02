var db =require("../connection");

module.exports = {
    all: (start, end) => {
        return db.load(`select  *  from taikhoan join loaitaikhoan on taikhoan.MaLoaiTaiKhoan = loaitaikhoan.MaLoaiTaiKhoan limit ${end} offset ${start}`);
    },
    sl: () =>{
        return db.load('select  *  from taikhoan join loaitaikhoan on taikhoan.MaLoaiTaiKhoan = loaitaikhoan.MaLoaiTaiKhoan');
    },
    detail: id =>{
        return db.load(`select * from taikhoan  where MaTaiKhoan = ${id}`);
    },
    delete: id =>{
        return db.delete('taikhoan', 'MaTaiKhoan', id);
    }
};