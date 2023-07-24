import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //create a hashed token
    const hashedToken = await bcryptjs.hash(String(userId), 10);
    if (emailType == "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 },
        { new: true, runValidators: true }
      );
    } else if (emailType == "RESET") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
        { new: true, runValidators: true }
      );
    }

    console.log(process.env.USERNAME, process.env.PASSWORD);

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      //   secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "9df24fa02c5cc3",
        pass: "a658280d24aa18",
      },
    });

    const mailOptions = {
      from: "surbhi@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy paste the link in your browser. <br/> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}</p>`,
    };

    const mailresponse = await transporter.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
