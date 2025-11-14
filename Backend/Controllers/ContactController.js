import ContactMessage from "../Models/ContactMessageModel.js";

export const saveMessage = async(req, res) => {
    try {
        const {name, email, message} = req.body
        if(!name || !email || !message){
            res.json({success : false, message : "All fields are required"})
        }
        const createdMessage = await ContactMessage.create({
            name, email, message
        })
        return res.json({
            success : true,
            createdMessage
        })
    } catch (error) {
        res.json({
            success : false,
            message : error.message
        })
    }
}