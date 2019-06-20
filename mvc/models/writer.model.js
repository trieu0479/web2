var db =require("../connection");

module.exports = {
    add: (bv) => {
        function date(date) {
            return new Date().setDate(date);
        }
        //var salt = bcrypt.genSaltSync(10);
        //var password = bcrypt.hashSync(userData.password, salt);
        // Store hash in your password DB.          
        // let sql = `INSERT INTO taikhoan
        // (TenDangNhap,TenHienThi,MatKhau,NgayThangNamSinh,NgayDangKy,NgayHetHan,Email,MaLoaiTaiKhoan,Active) 
        // VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        let sql = `INSERT INTO baiviet
        (IDChuyenMuc, TieuDeBaiViet,AnhURL, NgayDang, NoiDung, NDTomTat, SoLuotXem, TinhTrang, BaiVietPremium, IDDanhMuc) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        // ===ngay het han==========          
        current = new Date().getDate();
        date = new Date(date(current + 7));
        let today = new Date;    
        let soluotxem = 0;
        let tinhtrang = 0;
        let premium = 0;
         
        let data = [
            bv.IDChuyenMuc, 
            bv.TieuDeBaiViet,
            bv.AnhURL,
            today,
            bv.NoiDung,
            bv.NoiDung,
            soluotxem,
            tinhtrang,    
            premium,
            bv.IDChuyenMuc
        ];
        console.log(bv.IDChuyenMuc);
        console.log(bv.TieuDeBaiViet);
        console.log( bv.AnhURL);
        console.log(today);
        console.log(bv.NoiDung);
        console.log(soluotxem),
        console.log(tinhtrang),

        db.loadBind(sql, data);
    },
};