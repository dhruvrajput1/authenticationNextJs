import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server"; // just like req and res in express
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

connect();

export async function POST(request) {
    try {

        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        console.log(reqBody);

        // check if user already exists
        const user = await User.findOne({email}) // using await because we are getting email from mongoDB database

        if(user) {
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        // hash password
        const salt = await bcryptjs.genSalt(10); // generate salt with 10 rounds
        const hashedPassword = await bcryptjs.hash(password, salt);

        // create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
        
    } catch (error) {
        return NextResponse.json({
            error: error.message
        },
        {status: 500})
    }
}