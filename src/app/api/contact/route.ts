import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters long" },
        { status: 400 }
      );
    }

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify SMTP connection
    try {
      await transporter.verify();
    } catch (error) {
      console.error("SMTP connection failed:", error);
      return NextResponse.json(
        { error: "Email service unavailable. Please try again later." },
        { status: 500 }
      );
    }

    // Email content for you (recipient)
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">New Portfolio Contact</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Someone reached out through your website</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 25px; padding: 20px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #667eea;">
              <h3 style="margin: 0 0 10px 0; color: #333; font-size: 18px;">Contact Information</h3>
              <p style="margin: 5px 0; color: #555;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0; color: #555;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></p>
              <p style="margin: 5px 0; color: #555;"><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <div style="margin-bottom: 25px;">
              <h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Message</h3>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; line-height: 1.6; color: #555; font-size: 16px; white-space: pre-wrap;">${message}</div>
            </div>
            
            <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px; margin-top: 25px;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                <strong>Quick Reply:</strong> 
                <a href="mailto:${email}?subject=Re: ${subject}" style="color: #667eea; text-decoration: none; font-weight: 600;">Reply to ${name}</a>
              </p>
              <p style="margin: 10px 0 0 0; color: #888; font-size: 12px;">
                Sent from your portfolio website • ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
        New Portfolio Contact
        
        From: ${name} (${email})
        Subject: ${subject}
        
        Message:
        ${message}
        
        ---
        Sent from your portfolio website on ${new Date().toLocaleString()}
        Reply directly to: ${email}
      `,
    };

    // Auto-reply email for the sender
    const autoReplyOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Thank you for reaching out!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Thank You, ${name}!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Your message has been received</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Hi <strong>${name}</strong>,
            </p>
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Thank you for taking the time to reach out through my portfolio! I've received your message about "<strong>${subject}</strong>" and appreciate your interest.
            </p>
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              I'll review your message and get back to you as soon as possible, typically within 24-48 hours.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 25px 0;">
              <p style="margin: 0; color: #333; font-size: 14px;"><strong>Your Message Summary:</strong></p>
              <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">"${message.substring(
                0,
                150
              )}${message.length > 150 ? "..." : ""}"</p>
            </div>
            
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              In the meantime, feel free to:
            </p>
            <ul style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 25px; padding-left: 20px;">
              <li>Explore my latest projects and case studies</li>
              <li>Connect with me on social media</li>
              <li>Check out my technical blog posts</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #555; font-size: 16px; margin-bottom: 15px;">Best regards,</p>
              <p style="color: #333; font-size: 18px; font-weight: 600; margin: 0;">Nitin Rajput</p>
              <p style="color: #667eea; font-size: 14px; margin: 5px 0 0 0;">Full Stack Software Engineer</p>
            </div>
            
            <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px; margin-top: 25px;">
              <p style="margin: 0; color: #888; font-size: 12px;">
                This is an automated response. Please do not reply to this email.
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
        Hi ${name},
        
        Thank you for reaching out through my portfolio! I've received your message about "${subject}" and appreciate your interest.
        
        I'll review your message and get back to you as soon as possible, typically within 24-48 hours.
        
        Your message: "${message.substring(0, 200)}${
        message.length > 200 ? "..." : ""
      }"
        
        Best regards,
        Nitin Rajput
        Full Stack Software Engineer
        
        ---
        This is an automated response. Please do not reply to this email.
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(autoReplyOptions),
    ]);

    return NextResponse.json(
      {
        success: true,
        message:
          "Message sent successfully! You should receive a confirmation email shortly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
