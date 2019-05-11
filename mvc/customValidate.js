var userModel =  require ("./models/user.model");
module.exports = {
    checkDuplicate:async (comparedc, field) => {  //kiem tra username co trung vs password
        let result = await userModel.kiemtratrung(comparedc, field)
        if (!result) {
            throw "error"
        }
        return comparedc
    }
}