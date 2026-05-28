import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let transporter;

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      // Use real SMTP credentials
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true' || false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Automatically create a test account (Ethereal) for out-of-the-box testing
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.log("Automatically generated Ethereal Test Account:", testAccount.user);
    }

    // Auto-responder email to the user
    const userMailOptions = {
      from: `"Nylex Team" <${process.env.SMTP_USER || 'no-reply@nylex.com'}>`, // sender address
      to: email, // list of receivers
      subject: 'Thank you for contacting Nylex!', // Subject line
      text: `Hi ${name},\n\nThank you for reaching out to us. We have received your message and our team will get back to you shortly.\n\nHere is a copy of your message:\n${message}\n\nBest regards,\nNylex Team`, // plain text body
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <h2 style="color: #2563eb;">Thank You for Contacting Nylex!</h2>
              <p>Hi <strong>${name}</strong>,</p>
              <p>Thank you for reaching out to us. We have received your message and our team will get back to you shortly.</p>
              <br/>
              <p><strong>Your Message:</strong></p>
              <blockquote style="border-left: 4px solid #2563eb; padding-left: 10px; margin-left: 0; color: #555;">
                ${message}
              </blockquote>
              <br/>
              <p>Best regards,<br/><strong>The Nylex Team</strong></p>
            </div>`, // html body
    };

    // Notification email to the site owner
    const adminMailOptions = {
      from: `"Nylex Website" <${process.env.SMTP_USER || 'no-reply@nylex.com'}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'admin@nylex.com', // admin email
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nMessage: ${message}`,
      html: `<h3>New Contact Form Submission</h3>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
             <p><strong>Message:</strong></p>
             <p>${message}</p>`,
    };

    // Send emails
    const userMail = await transporter.sendMail(userMailOptions);
    const adminMail = await transporter.sendMail(adminMailOptions);

    if (!process.env.SMTP_USER) {
      console.log("-----------------------------------------");
      console.log("Emails sent using Ethereal Test Account:");
      console.log("User Email Preview URL:", nodemailer.getTestMessageUrl(userMail));
      console.log("Admin Email Preview URL:", nodemailer.getTestMessageUrl(adminMail));
      console.log("-----------------------------------------");
    }

    return NextResponse.json({ success: true, message: 'Emails sent successfully' });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
