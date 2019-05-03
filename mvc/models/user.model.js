var db1 =require("../connection");
module.exports = {
    dangky:()=> {
        let sql =`INSERT INTO taikhoan(TenDangNhap,TenHienThi,MatKhau,NamSinh,NgayDangKy,MaLoaiTaiKhoan,Active) VALUES (${})`
    }
}