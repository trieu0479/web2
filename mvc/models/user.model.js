var db1 = require("../connection");
const bcrypt = require('bcrypt');
var moment = require("moment");
// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';
module.exports = {
    dangky: (userData) => {
        function date(date) {
            return new Date().setDate(date);
        }
        var salt = bcrypt.genSaltSync(10);
        var password = bcrypt.hashSync(userData.password, salt);
        // Store hash in your password DB.          
        let sql = `INSERT INTO taikhoan
        (TenDangNhap,TenHienThi,MatKhau,NgayThangNamSinh,NgayDangKy,NgayHetHan,Email,MaLoaiTaiKhoan,Active) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        // ===ngay het han==========          
        current = new Date().getDate();
        date = new Date(date(current + 7));
        let today = new Date;
        let maLoaiTaiKhoan = 1;
        let active = 0;
        //dùng mysql schedule để đối chiếu vs ngày hết hạn
        //CREATE EVENT update_account_premium
        // ON SCHEDULE every 1 day
        // starts CURRENT_TIMESTAMP
        // ON COMPLETION PRESERVE
        // DO update taikhoan set active = 0 where ngayhethan < current_date    
        let data = [
            userData.username,
            userData.displayname,
            password,
            userData.ngaythangnamsinh,
            today,
            date,
            userData.email,
            maLoaiTaiKhoan,
            active
        ];
        console.log(active);
        db1.loadBind(sql, data);
    },
    kiemtratrung: async (comparedc, column) => {
        let sql = `SELECT * FROM taikhoan WHERE \`${column}\` = ?`;
        // let doichieu =
        let data = [comparedc];
        try {
            let user = await db1.loadBind(sql, data);
            if (user.length > 0) { //user already
                return false;
            } else {
                return true;
            }
        } catch (error) {
            console.log(error);

        }
    },
    dangnhap: async (username, password) => {
        let sql = "SELECT * FROM TAIKHOAN WHERE TenDangNhap = ? ";
        let user = await db1.loadBind(sql, [username]);
        // user is Array => object ko null
        // if (!user) { // Cai ! de check Object. Cai do viet dung se la (if user == null || user == underfined) 
        //     return false;
        // }
        // console.log(user);
        // user is Array. If user.length = 0 => ko tim thay user
        if (user.length == 0) {
            return { isValid: false }; //trả ve object để so sánh vs router
        }
        user = user[0];
        if (!bcrypt.compareSync(password, user.MatKhau)) {
            return { isValid: false, user };
        }
        // if (user.Active == 0) {
        //     return {isValid: true, user};
        // }     
        // console.log (user);
        return { isValid: true, user };
    },
    doimatkhau: async (req) => {
        // Lấy id từ session -> query ra user -> Compare password từ form so với db. Pass chì cho đổi. Ngược lại error
        if (!req.session.user) {
            return {
                status: 400,
                messages: "Không có session"
            }
        }
        console.log(req.session.user);
        var sqlPassword = `select MatKhau from taikhoan where MaTaiKhoan = ?`;
        var passwordDB;
        var salt = bcrypt.genSaltSync(10);
        var newpassword = bcrypt.hashSync(req.body.newpassword, salt);
        // var retypepassword =bcrypt.hashSync(req.body.retypepassword,salt);
        // var password =bcrypt.hashSync(req.body.password,salt);

        passwordDB = await db1.loadBind(sqlPassword, [req.session.user.user.MaTaiKhoan]);
        passwordDB = passwordDB[0].MatKhau;
        console.log(req.body.password);
        console.log(passwordDB);
        //lay password tu database so voi nhap trong form
        if (!bcrypt.compareSync(req.body.password, passwordDB)) {
            // console.log("NOT_MATCH");
            // console.log (req.body.password);
            // console.log(passwordDB);
            return {
                status: 500,
                messages: "PASSWORD_NOT_MATCH"
            };
        }

        let sql = `UPDATE taikhoan set MatKhau = ? where MaTaiKhoan = ${req.session.user.user.MaTaiKhoan}`;
        let loadmatkhaumoi = await db1.loadBind(sql, [newpassword]);
        // let loadnhaplaipassword = await db1.loadBind(sql,[retypepassword]);
        // let loadmatkhau = await db1.loadBind(sql,[password]);
        // console.log(loadmatkhaumoi);    
        if (loadmatkhaumoi) {
            return {
                status: 200,
                messages: "mat khau moi",
                success: true
            };
        }
        else {
            return {
                status: 400,
                messages: "mat khau moi loi",
                success: false
            }
        }
    },
    update: entity => {
        var id = entity.MaTaiKhoan;
        delete entity.MaTaiKhoan;
        console.log(id);
        return db.update('taikhoan', 'MaTaiKhoan', entity, id);
    },
    detail: id => {
        return db.load(`select * from taikhoan where MaTaiKhoan = ${id}`);
    },
};

