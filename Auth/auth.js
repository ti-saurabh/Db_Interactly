const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const db = require('../models/contactModels');



//============================================= Authentication =============================================//

exports.authenticate = async (req, res, next) => {
    try {
        let token = req.headers['x-api-key'];
        if (!token) return res.status(401).send({ status: false, message: "Token must be present" });
        jwt.verify(token, "Interactly", (err, decode) => {
            if (err) {
                return res.status(401).send({ status: false, message: "Error : Invalid Token or Expired Token" })
            }
            req.token = decode
            next();
        })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};


//============================================= Authorisation =============================================//

exports.authorise = async (req, res, next) => {
    try {
        let token = req.headers["x-api-key"]
        let decodeToken = jwt.verify(token, "Interactly")
        let userLoggedIn = decodeToken.contact_id

        let userId = req.body.contact_id
        if (userId) {
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).send({ status: false, message: "contact_id is Invalid, Please Enter Correct Id" })
            }

            let saveUser = await db.findById(userId)
            if (!saveUser) {
                return res.status(404).send({ status: false, message: "No Such User Available" })
            }

            if (userId !== userLoggedIn) {
                return res.status(403).send({ status: false, message: " You are not Authorised User..!!" })
            }
        }
        next();
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};