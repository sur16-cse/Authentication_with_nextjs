import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    console.log(reqBody);
    //check if user already exists
    const user = await User.findOne({ email: email });
    console.log("inside forgot password");
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    console.log("user exists");

    await sendEmail({
      email,
      emailType: "RESET",
      userId: user._id,
    });

    const response = NextResponse.json({
      message: "Reset Password link sent successfully",
      success: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
