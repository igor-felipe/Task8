require('dotenv').config();

exports.middlewareGlobal = (req, res, next) => {
    console.log("________________________Up________________________")
    next();
}
