var db =require("../connection");
module.exports ={
    tagindex:() => { //lay tag
        return db.load(`SELECT tag.IDTag,baiviet.TieuDeBaiViet,tag.TenTag,baiviet.IDBaiViet FROM lienkettag,tag,baiviet WHERE lienkettag.IDTag=tag.IDTag and baiviet.IDBaiViet=lienkettag.IDBaiViet `);
      },
     taglk:(id) => {
       return db.load (`SELECT * FROM lienkettag,tag,baiviet WHERE lienkettag.IDTag=tag.IDTag and baiviet.IDBaiViet=lienkettag.IDBaiViet and lienkettag.IDTag = ${id} `);
     }, 
}
