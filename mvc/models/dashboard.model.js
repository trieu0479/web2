var db =require ("../connection");
module.exports = {
    all:() => {
        var sql="select * from baiviet";
        return db.load(sql);
    },
    laymenu:()  =>{
        let sql = `select * from danhmuc`;
        return db.load(sql);
    },
    get3PostForDashborad: () => {
        let sql = 'SELECT * FROM `baiviet` join `danhmuc` on baiviet.IDDanhMuc =  danhmuc.IDDanhMuc WHERE YEARWEEK(`NgayDang`, 1) = YEARWEEK(CURDATE(), 1) ORDER BY SoLuotXem DESC LIMIT 5';
        return db.load(sql);
    },
    lay10baimoinhat: () =>{
        let sql = 'select * from `baiviet` join `danhmuc` on baiviet.IDDanhMuc =  danhmuc.IDDanhMuc order by SoLuotXem desc limit 0,10';
        return db.load(sql);
    },
    

}