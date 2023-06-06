import { Request, Response } from "express";
import Users from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateActiveToken, generateRefreshToken } from "../middleware/generateToken";
import sendEmail from "../middleware/sendMail";
import { validateEmail, validatePhoneNumber} from '../middleware/valid';
import { sendSMS } from "../middleware/sendSMS";
import { IDecodedToken, IUser } from "../config/interface";

const CLIENT_URL = `${process.env.BASE_URL}`

const authCtrl = {
    register: async (req: Request, res: Response) =>  {
        try {
            const { name, account, password} = req.body;

            const user = await Users.findOne({account});
            if(user) 
                return res.status(400).json({msg: 'Email or Phone number already exists'});

            const passwordHash = await bcrypt.hash(password, 12);

            const newUser = {
                name, account, password: passwordHash
            }

            const active_token = generateActiveToken({newUser});
            const url = `${CLIENT_URL}/active/${active_token}`

            if(validateEmail(account)) {
                sendEmail(account,url, 'Verify your email address.');
                return res.json({msg: "Success Please check your email "})
            }
            else if(validatePhoneNumber(account)) {
                sendSMS(account,url, 'Verify your phone number')
                return res.json({msg: "Success Please check your phone "})

            }

            // res.json({
            //     status: 'OK',
            //     msg: 'Register successfully.',
            //     data: newUser,
            //     active_token
            // })

        } catch (err: any) {
            return res.status(500).json({msg: err.message});
        }
    },

    activeAccount: async(req: Request, res: Response) => {
        try {
            const { active_token } = req.body;

            const decoded = <IDecodedToken>jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`);

            const { newUser } = decoded ;
            
            if(!newUser) return res.status(400).json({msg: "Invalid authentication"})

            const user = new Users(newUser);

            await user.save();

            res.json({msg: "Account has been activated!",newUser});
            
        } catch (err: any) {
            console.log(err)
            
            let errMsg;
            if(err.code === 11000) {
                errMsg = Object.keys(err.keyValue)[0] + " already exists"
            }else {
                // console.log(err);
                let name = Object.keys(err.errors)[0];
                errMsg = err.errors[`${name}`].message;          
            }

            return res.status(500).json({msg: errMsg})
        }
    },

    login: async (req: Request, res: Response) =>  {
        try {
          
            const { account, password } = req.body;

            const user = await Users.findOne({account});

            if(!user) return res.status(400).json({msg: "This account does not exists"});

            // if login exists 
            loginUser(user, password, res);

            // res.json({msg : 'Login success !'});

        } catch (err: any) {
            return res.status(500).json({msg: err.message});
        }
    },
    logout: async (req: Request, res: Response) =>  {
        try {
         
            res.clearCookie('refresh_token',{path: `/api/refresh_token`});
            return res.json({msg: 'Logged out !'});

        } catch (err: any) {
            return res.status(500).json({msg: err.message});
        }
    },
    refreshToken: async (req: Request, res: Response) =>  {
        try {
         
           const rf_token = req.cookies.refresh_token;

           if(!rf_token) return res.status(400).json({msg: "Please login now!"});

           const decoded = <IDecodedToken>jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`);

           if(!decoded.id) return res.status(400).json({msg: "Please login now!"});
           
           const user = await Users.findById(decoded.id).select("-password");

           if(!user ) return res.status(400).json({msg: "This account does not exists !"})
           
           const access_token = generateAccessToken({id: user._id});

           res.json({
            msg: "Success !",
            access_token
        });
           

        } catch (err: any) {
            return res.status(500).json({msg: err.message});
        }
    },

}

const loginUser = async (user: IUser, password: string, res: Response) => {

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) return res.status(400).json({msg: 'Password is incorrect.'});

    const access_token = generateAccessToken({id: user._id});
    const refresh_token = generateRefreshToken({id: user._id});
    
    res.cookie('refresh_token',refresh_token, {
        httpOnly: true,
        path: `/api/refresh_token`,
        maxAge: 30*24*60*60*1000 // 30 days
    });

    res.json({
        msg: 'Login Success !',
        access_token,
        user: {...user._doc, password:''}
    })
}


export default authCtrl;