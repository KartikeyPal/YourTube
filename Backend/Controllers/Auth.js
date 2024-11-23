import users from "../Models/Auth.js"
import jwt from "jsonwebtoken"


export const login = async (req, res) => {
    const { email } = req.body;
    // console.log(email)
    try {
        const extinguser = await users.findOne({ email })
        // console.log(extinguser);
        // console.log("\n");
        if (!extinguser) {
            try {
                const newuser = await users.create({ email });
                console.log(newuser);
                const token = jwt.sign({
                    email: newuser.email, id: newuser._id
                }, process.env.JWT_SECERT, {
                    expiresIn: "1h"
                }
                )
                res.status(200).json({ result: newuser, token })
            } catch (error) {
                res.status(500).json({ mess: "something went wrong..." })
                return
            }

        } else {
            const token = jwt.sign({
                email: extinguser.email, id: extinguser._id
            }, process.env.JWT_SECERT, {
                expiresIn: "1h"
            }
            )
            res.status(200).json({ result: extinguser ,token})
        }
    } catch (error) {
        res.status(500).json({ mess: "something went wrong..." })
        return
    }
}

export const incrementPoints = async(req,res)=>{
    try {
        const {userId,points} = req.body;
        console.log(`userId => ${userId}  points => ${points}\n`);
        const user = await users.findByIdAndUpdate(userId,
            {$inc: {points}},
            {new:true}
    )
    // console.log(user);
    if(!user){
        return res.status(404).json({
            message: "User not found"
        });
    }
   return res.status(200).json({
        user: user,
        message: "5 points added"
    })
    } catch (error) {
        console.log("IP=> ",error);
        res.status(500).json({
            message: 'error in increasement points',
            error: error.message
        })
    }
}