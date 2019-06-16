var db = require("../connection");
const bcrypt = require('bcrypt');
var moment = require("moment");
// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';
module.exports = {
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

