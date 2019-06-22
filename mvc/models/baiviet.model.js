var mysql = require('mysql');
var moment = require('moment');
var db = require('../connection');



module.exports = {
    chitiet: (id) => {
        // return db.load(`select * from baiviet join danhmuc on baiviet.IDDanhMuc =  danhmuc.IDDanhMuc where baiviet.IDBaiViet = ${id}`);
        return db.load(`select * from baiviet join chuyemuc on 
       baiviet.IDChuyenMuc = chuyemuc.IDChuyenMuc where baiviet.IDBaiViet = ${id} `);
    },
    nambaiviet: (id) => {
        return db.load(`select * from baiviet bv1 join baiviet bv2 on bv1.IDChuyenMuc = bv2.IDChuyenMuc
        where bv1.IDBaiViet = ${id} order by rand() limit 5`);
    },
    demchuyenmuc: () => {
        let sql = `select TenChuyenMuc, chuyemuc.IDChuyenMuc, count(baiviet.IDBaiViet) as sl1 from chuyemuc join baiviet where chuyemuc.IDChuyenMuc = baiviet.IDChuyenMuc group by TenChuyenMuc,IDChuyenMuc`;
        return db.load(sql);
    },
    binhluan: async (userbinhluan, req) => {
        let today = new Date;
        let sql = `insert into binhluan(TenHienThi,NgayBinhLuan,NoiDung,IDBaiViet) VALUES( ?,?,?,? )`

        if (!req.session.user) {
            return {
                status: 400,
                messages: "Ban phai dang nhap moi binh luan",
                error: true
            }
        }
        if (req.session.user && req.session.user.user && req.body.binhluan) {
            data = [
                req.session.user.user.TenHienThi,
                today,
                req.body.binhluan,
                req.params.id
            ];
            let load = await db.loadBind(sql, data)
                .then(result => {
                    return {
                        status: 200,
                        success: true
                    }
                })
                .catch(err => {
                    return {
                        status: 500,
                        messages: err
                    }
                })
            return load;

        }
        return {
            status: 500,
            messages: "querry is not null"
        }

    },
    showbinhluan: id => {
        return db.load(`SELECT * FROM binhluan WHERE IDBaiViet = ${id}`);
    },
    tag: id =>{
        return db.load(`SELECT * FROM tag join lienkettag on tag.IDTag = lienkettag.IDTag WHERE lienkettag.IDBaiViet = ${id}`);
    },
    soluotxem: async (req) => {
        let selectluotxem = `SELECT SoLuotXem from baiviet where IDBaiViet = ${req.params.id}`;
        let sql = `update baiviet set SoLuotXem = ? WHERE IDBaiViet = ${req.params.id}`;
        var SoLuotXemDb = await db.load(selectluotxem);
        // console.log(selectluotxem);
        // console.log("so luot xem");        
        // console.log(SoLuotXemDb);
        SoLuotXemDb = SoLuotXemDb[0].SoLuotXem;
        SoLuotXemDb = SoLuotXemDb + 1;
        // console.log(SoLuotXemDb);
        return db.loadBind(sql, SoLuotXemDb);
    },
    baivietpremium: async (req) => {
        //  console.log("user is mean");
        //  console.log(req.session.user);    
        //  let laytaikhoan = `Select *from taikhoan where MaLoaiTaiKhoan = ?`;
        //  var loadtaikhoan = await db.loadBind(laytaikhoan,req.session.user.MaLoaiTaiKhoan);            
        //  loadtaikhoan = loadtaikhoan[0].MaLoaiTaiKhoan;  
        //  console.log(loadtaikhoan); //1 mang chua tai khoan =1       
        let sql = `SELECT * FROM baiviet WHERE IDBaiViet= ${req.params.id} `;
        var baivietpremiumDB = await db.load(sql);
        baivietpremiumDB = baivietpremiumDB[0].BaiVietPremium;
        //  console.log(baivietpremiumDB);                                
        if (baivietpremiumDB == 1) {
            db.loadBind(sql, baivietpremiumDB);
            return {
                status: 201,
                messages: true
            };
        }
        else {
            return {
                status: 401,
                messages: true
            }
            //  }               
        }
    }
}