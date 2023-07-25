import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function PATCH(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { password,token } = reqBody;
    console.log(reqBody);
    const user = await User.findOne({
      token: token,
      });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid user" },
        { status: 400 }
      );
    }
   
    //hash password 
    //10 times iterate and encrypt the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const savedUser = await User.findByIdAndUpdate(
      user._id,
      {
       password: hashedPassword,
      },
      { new: true, runValidators: true }
    );
    console.log(savedUser);


    return NextResponse.json({
      message: "Password updated successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
