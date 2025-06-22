import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  const item = await req.json();

  if (!item) {
    return NextResponse.json("Missing data", { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: "subhodipnebu52@gmail.com",
    to: "subhodipnebu51@gmail.com",
    subject: `Enquiry for item: ${item.name}`,
    html: `
      <p><strong>Item Name:</strong> ${item.name}</p>
      <p><strong>Description:</strong> ${item.description}</p>
      <img src="${item.coverImage}" width="200" />
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 400 }
    );
  }
}
