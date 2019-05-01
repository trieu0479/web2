var db =require ("../connection");
module.exports = {
    all:() => {
        var sql="select * from baiviet";
        return db.load(sql);
    },
    get3PostForDashborad: () => {
        let sql = 'SELECT * FROM `baiviet` WHERE YEARWEEK(`NgayDang`, 1) = YEARWEEK(CURDATE(), 1) ORDER BY SoLuotXem DESC LIMIT 5';
        return db.load(sql);
    }

}