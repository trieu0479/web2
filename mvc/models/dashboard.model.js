var db =require ("../connection");
module.exports = {
    all:() => {
        //đây cũng check
        var sql="select * from baiviet";
        return db.load(sql);
    },
    laymenu:()  =>{
        let sql = `select TenDanhMuc, danhmuc.IDDanhMuc, count(baiviet.IDBaiViet) as sl from  baiviet ,danhmuc , chuyemuc WHERE baiviet.IDChuyenMuc = chuyemuc.IDChuyenMuc and danhmuc.IDDanhMuc = chuyemuc.IDDanhMuc group by TenDanhMuc,IDDanhMuc `;
        return db.load(sql);
    },
    demchuyenmuc:() => {
        let sql = `select TenChuyenMuc, chuyemuc.IDChuyenMuc, count(baiviet.IDBaiViet) as sl1 from chuyemuc join baiviet where chuyemuc.IDChuyenMuc = baiviet.IDChuyenMuc group by TenChuyenMuc,IDChuyenMuc`;
        return db.load(sql);
    },
    get3PostForDashborad: () => {
        let sql = 'SELECT * FROM `baiviet` ,`danhmuc` , chuyemuc WHERE baiviet.TinhTrang = 2 and baiviet.IDChuyenMuc = chuyemuc.IDChuyenMuc and danhmuc.IDDanhMuc = chuyemuc.IDDanhMuc and YEARWEEK(`NgayDang`, 1) = YEARWEEK(CURDATE(), 1) ORDER BY SoLuotXem DESC LIMIT 5';
        return db.load(sql);
    },
    lay10baixemnhieu: () =>{
        let sql = 'SELECT * FROM `baiviet` ,`danhmuc` , chuyemuc WHERE baiviet.TinhTrang = 2 and baiviet.IDChuyenMuc = chuyemuc.IDChuyenMuc and danhmuc.IDDanhMuc = chuyemuc.IDDanhMuc order by  SoLuotXem desc limit 0,10';
        return db.load(sql);
    },
    lay10baimoinhat:() =>{
        return db.load('SELECT * FROM `baiviet` ,`danhmuc` , chuyemuc WHERE baiviet.TinhTrang = 2 and baiviet.IDChuyenMuc = chuyemuc.IDChuyenMuc and danhmuc.IDDanhMuc = chuyemuc.IDDanhMuc  order by NgayDang desc limit 0,10');
    },
    top10chuyenmuc: ()=>{
        return db.load('SELECT * FROM `baiviet` ,`danhmuc` , chuyemuc WHERE baiviet.IDChuyenMuc = chuyemuc.IDChuyenMuc and danhmuc.IDDanhMuc = chuyemuc.IDDanhMuc  GROUP BY baiviet.IDChuyenMuc ORDER BY NgayDang DESC limit 0,10');
    },
    
}