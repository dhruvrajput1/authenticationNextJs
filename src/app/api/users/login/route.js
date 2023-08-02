import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server"; // just like req and res in express
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {

        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody);

        // check if user exists
        const user = await User.findOne({email});
        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 404});
        }

        // check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({error: "Incorrect password"}, {status: 401});
        }

        // create token data
        const tokenData = {
            email: user.email,
            id: user._id,
            username: user.username
        }
        
        // create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
            expiresIn: "1d"
        });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true 
        });

        return response;

        
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}