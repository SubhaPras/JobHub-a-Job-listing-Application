import mongoose from "mongoose"

const contactMessageSchema = new mongoose.Schema({
    name : {require : true, type : String},
    email : {require : true, type : String},
    message : {require : true, type : String},
    date : {type : Date, default : Date.now}
})

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema)

export default ContactMessage;