const express = require("express")
const router = express.Router()

// const { authentication } = require("../Auth/auth")
const {createContact, getContact, updateContact, deleteContact}= require("../controller/contactController")


router.post("/register", createContact)
router.get("/getContact", getContact)
router.put("/updateContact/:contact_id", updateContact)
router.delete("/deleteContact/:contact_id", deleteContact)
 
module.exports=router