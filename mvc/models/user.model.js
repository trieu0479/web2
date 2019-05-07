var db1 =require("../connection");
const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';
module.exports = {
    dangky:(userData) => {
        // var bcrypt = require('bcrypt');
        var salt = bcrypt.genSaltSync(10);
        var password = bcrypt.hashSync(userData.password, salt);
                // Store hash in your password DB.          
        let sql =`INSERT INTO taikhoan
        (TenDangNhap,TenHienThi,MatKhau,NamSinh,NgayDangKy,Email,MaLoaiTaiKhoan,Active) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        let today = new Date;
        let maLoaiTaiKhoan = 1;
        let active = 1;
        let data = [
            userData.username,
            userData.displayname,
            password,
            userData.yearbirth,
            today,
            userData.email,
            maLoaiTaiKhoan,
            active
        ]
        db1.loadBind(sql, data)
    },
    dangnhap: async (username, password)=> {
        let sql = "SELECT *FROM TAIKHOAN WHERE TenDangNhap = ?";
        let user = await db1.loadBind(sql, [username])
        if (!user) {
            return false;
        }
        user = user[0];
        if (!bcrypt.compareSync(password, user.MatKhau)) {
            return false
        }
        return user
    }
};