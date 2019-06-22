var db =require("../connection");

module.exports = {
    add: (bv) => {             
        let sql = `INSERT INTO baiviet
        (IDChuyenMuc, TieuDeBaiViet, AnhURL, NgayDang, NoiDung, NDTomTat, SoLuotXem, TinhTrang, BaiVietPremium, 
             IDWriter) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        // ===ngay het han==========          s
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
            bv.NDTomTat,
            soluotxem,
            tinhtrang,    
            premium,
            bv.IDWriter
        ];
        console.log(bv.IDChuyenMuc);
        console.log(bv.TieuDeBaiViet);
        console.log( bv.AnhURL);
        console.log(today);
        console.log(bv.NoiDung);
        console.log(soluotxem),
        console.log(tinhtrang),
        console.log(bv.IDDanhMuc);        
        db.loadBind(sql, data);
    },
    update: entity => {
        var id = entity.IDBaiViet;
        delete entity.IDBaiViet;
        console.log(id);
        return db.update('baiviet', 'IDBaiViet', entity, id);
    },
    edit: entity => {
        var id = entity.IDBaiViet;
        delete entity.IDBaiViet;
        console.log(id);
        return db.update('baiviet', 'IDBaiViet', entity, id);
    },
    detail: id => {
        return db.load(`SELECT * FROM baiviet, taikhoan, tinhtrang WHERE taikhoan.MaTaiKhoan = ${id} and baiviet.IDWriter = taikhoan.MaTaiKhoan `);
    },
    infor: id =>{
        return db.load(`select * from taikhoan where MaTaiKhoan = ${id}`);
    }, 
    baiviet: (idtk, id,  start, end) => {
        return db.load(`select * from baiviet join tinhtrang on baiviet.TinhTrang = tinhtrang.ID where IDWriter = ${idtk} and baiviet.TinhTrang = ${id} limit ${end} offset ${start} `);        
        //return db.load(`select * from baiviet where baiviet.IDWriter = ${id} and baiviet.TinhTrang = 0 or baiviet.TinhTrang = 1 limit ${end} offset ${start} `);
    }, 
    sl: id =>{
        return db.load(`select * from baiviet where IDWriter = ${id}`);
    },
    chitiet: id =>{
        return db.load(`select * from baiviet where IDBaiViet = ${id}`);
    },
    hieuchinh: id =>{
        return db.load(`select baiviet.IDBaiViet, baiviet.TieuDeBaiViet, lydo.LyDo from baiviet left join lydo on baiviet.IDBaiViet = lydo.IDBaiViet 
        where baiviet.IDWriter = ${id} and baiviet.TinhTrang = 0 or baiviet.IDWriter = ${id} and baiviet.TinhTrang = 1`);
    }, 
    laychuyenmuc: () => {
        return db.load('select * from chuyemuc');
    },
    addtag: entity =>{
        return db.add('lienkettag', entity);
    },
    danhsachtag: id => {
        return db.load(`SELECT * FROM lienkettag join tag on lienkettag.IDTag = tag.IDTag WHERE lienkettag.IDBaiViet = ${id}`);
    },
    themtag: id => {
        return db.load(`SELECT tag.IDTag, tag.TenTag FROM tag WHERE tag.IDTag not in (select lienkettag.IDTag from lienkettag WHERE lienkettag.IDBaiViet = ${id})`);
    },
    bv: id => {
        return db.load(`select * from baiviet where IDBaiViet = ${id}`);
    },
    tinhtrang: () => {
        return db.load('select * from tinhtrang');
    }
};
