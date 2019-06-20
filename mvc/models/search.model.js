var db = require("../connection");
module.exports = {
  fulltextsearch: async search => {
    let sql = `SELECT * FROM baiviet WHERE MATCH(TieuDeBaiViet,NoiDung,NDTomTat) Against (?) order by BaiVietPremium desc, NgayDang desc`;
    let loadsearch = await db.loadBind(sql, [search]);
    return loadsearch;
  }
  // SELECT * FROM baiviet WHERE MATCH(TieuDeBaiViet,NoiDung,NDTomTat) Against('tainangiaothong')
  // SELECT TieuDeBaiViet,NoiDung,NDTomTat FROM `baiviet` WHERE MATCH (TieuDeBaiViet,NoiDung,NDTomTat) Against("xe tải")
};
