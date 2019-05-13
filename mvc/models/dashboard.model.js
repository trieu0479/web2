var db =require ("../connection");
module.exports = {
    all:() => {
        var sql="select * from baiviet";
        return db.load(sql);
    },
    laymenu:()  =>{
        let sql = `select TenDanhMuc, danhmuc.IDDanhMuc, count(baiviet.IDBaiViet) as sl from danhmuc join baiviet where danhmuc.IDDanhMuc = baiviet.IDDanhMuc group by TenDanhMuc,IDDanhMuc `;
        return db.load(sql);
    },
    get3PostForDashborad: () => {
        let sql = 'SELECT * FROM `baiviet` join `danhmuc` on baiviet.IDDanhMuc =  danhmuc.IDDanhMuc WHERE YEARWEEK(`NgayDang`, 1) = YEARWEEK(CURDATE(), 1) ORDER BY SoLuotXem DESC LIMIT 5';
        return db.load(sql);
    },
    lay10baixemnhieu: () =>{
        let sql = 'select * from `baiviet` join `danhmuc` on baiviet.IDDanhMuc =  danhmuc.IDDanhMuc order by  SoLuotXem desc limit 0,10';
        return db.load(sql);
    },
    lay10baimoinhat:() =>{
        return db.load('select * from `baiviet` join `danhmuc` on baiviet.IDDanhMuc =  danhmuc.IDDanhMuc order by NgayDang desc limit 0,10')
    },
    top10chuyenmuc: ()=>{
        return db.load('SELECT * FROM `baiviet` join `danhmuc` on baiviet.IDDanhMuc =  danhmuc.IDDanhMuc GROUP BY IDChuyenMuc ORDER BY NgayDang DESC limit 0,10');
    }
}