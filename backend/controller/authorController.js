
import { userModel } from "../model/userInfo.js";

export const findAuthor = async (req,res) =>
{
    try
    {
        const user = await userModel.findOne({_id : req.params.AuthorId});
        if (!user) {
            return res.status(404).json({ success: false, message: "Author not found" });
        }
        
        res.status(200).json({name:user.name,desc:user.desc,profile:user.img});
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
}
