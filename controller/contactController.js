const db = require("../models/contactModels")

const isValidBody = function (body) {
    return Object.keys(body).length == 0
};


exports.createContact = async (req, res) => {
    try {

        let data = req.body;
        let { first_name, last_name, email, mobile_number, password} = data

        if (isValidBody(data)) return res
        .status(400)
        .send(
            { status: false, message: "Please Provide Data for  Registration" }
        )

        if (!first_name) return res
        .status(400)
        .send(
            { status: false, message: "first_name is manadatory" }
        )

        if (!last_name) return res
        .status(400)
        .send(
            { status: false, message: "last_name is manadatory" }
        );

        if (!mobile_number) return res
        .status(400)
        .send(
            { status: false, message: "mobile_number is manadatory" }
            
        );

        const existedPhone = await 
        db.findOne(
            { mobile_number: mobile_number }
        );

        if (existedPhone) 
        {
            return res.status(400)
            .send(
                { status: false, message: "Phone number already registered" }    //checking is there any similar phone no. is present or not in DB
        )};

        if (!email) return res
        .status(400)
        .send(
            { status: false, message: "Email-Id is manadatory" }
        )

        const existedEmail = await 
        db.findOne(
            { email: email }
        );
        if (existedEmail) 
        {
            return res.status(400)
            .send(
                { status: false, message: "Email is already registered" }  //checking is there any similar Email is present or not in DB
        )};

        let createContacts = await 
        db.create(data)
        res.status(201)
        .send(
            { status: true, message: "Register Successfully", data: createContacts }
        );

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
};


 exports.getContact = async function (req, res) {
   
    const contact_id = req.params.contact_id
    
     let Data = await 
     db.find(
        {contact_id : contact_id, isDeleted:false})

     if (!Data)
    return res.status(404)
    .send(
        {message: "No Data Found" })
    
    return res.status(200)
    .send(
        {Data: Data})
};

exports.updateContact = async function (req, res) {
    try {
      let contact = req.params.contact_id;  
  
      if (!contact)
        return res.status(400).send({ status: false, msg: "Enter a Object Id" });
  
      let findId = await db.findById(contact)
      if (!findId)
        return res.status(404).send({ status: false, msg: "Nothing exists" });
  
      let { ...data } = req.body;
    
      let updatedContact = await 
      db.findOneAndUpdate( { _id: contact}, {
        email: data.email,
        mobile_number : data.mobile_number
      }, { new: true })
  
      return res.status(200).send({ status: true, data: updatedContact })
  
    } catch (err) {
      res.status(500).send({ status: false, Error: err.message });
    }
  };


exports.deleteContact  = async function (req, res) {
    try {
      let contact = req.params.contact_id;
  
      let findId = await 
      db.findById(contact)

      if (!findId) {
        return res.status(404)
        .send(
            { status: false, msg: "No such contact exists" });
      }
  
      let deleteContacts = await 
      db.findOneAndUpdate(
        { _id: findId})
        console.log(deleteContacts)
      return res.status(200)
      .send(
        { status: true, msg: "Successfully Deleted!!" });
    }
    catch (err) {
      res.status(500).send({ status: false, Error: err.message })
    }
};

