var db1 =require("../connection");
const bcrypt = require('bcrypt');
var moment = require ("moment");
// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';
module.exports = {
    dangky:(userData) => {    
        var salt = bcrypt.genSaltSync(10);
        var password = bcrypt.hashSync(userData.password, salt);
                // Store hash in your password DB.          
        let sql =`INSERT INTO taikhoan
        (TenDangNhap,TenHienThi,MatKhau,NgayThangNamSinh,NgayDangKy,Email,MaLoaiTaiKhoan,Active) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        let today = new Date;
        let maLoaiTaiKhoan = 1;
        let active = 1;
        let data = [
            userData.username,
            userData.displayname,
            password,
            userData.ngaythangnamsinh,
            today,
            userData.email,
            maLoaiTaiKhoan,
            active
        ]
        db1.loadBind(sql, data)
    },
    kiemtratrung:async  (comparedc, column) => {
        let sql = `SELECT * FROM taikhoan WHERE \`${column}\` = ?`;
        // let doichieu =
        let data = [comparedc];
        try {
            let user = await db1.loadBind(sql,data);
            if (user.length > 0) { //user already
                return false;
            } else {
                return true;
            }
        } catch (error) {
            console.log(error);
            
        }
    },
    dangnhap: async (username, password)=> {
        let sql = "SELECT * FROM TAIKHOAN WHERE TenDangNhap = ? ";
        let user = await db1.loadBind(sql, [username]);

        // user is Array => object ko null
        // if (!user) { // Cai ! de check Object. Cai do viet dung se la (if user == null || user == underfined) 
        //     return false;
        // }

        // user is Array. If user.length = 0 => ko tim thay user
        if (user.length == 0) {
            return false;
        }


        user = user[0];
        console.log(user);
        // let MatKhau = MatKhau[0];
        if (!bcrypt.compareSync(password, user.MatKhau)) {
            return false;
        }
        return user;
    }
};