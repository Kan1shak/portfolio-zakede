import { contacts } from "../models/contact.js";

export const contactPost = async (req, res) => {
    const contact = new contacts(req.body);
    let redirect = '/';
    if (req.body.redirectto != null && req.body.redirectto != ""){
        redirect = req.body.redirectto;
    } 
    try {
        await contact.save();
        res.render("redirect", { title: "Contact", message: "Thank you for contacting us!\nWe have recieved your message and will be responding shortly!",  redirectUrl : redirect});
    } catch (err) {
        res.render("redirect", { title: "Contact", message: "Sorry, there was an error. Please try again later.", redirectUrl : redirect});
    }
}