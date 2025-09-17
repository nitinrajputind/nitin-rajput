import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  try {
    // Check if environment variables are loaded
    const envCheck = {
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_SECURE: process.env.SMTP_SECURE,
      SMTP_USER: process.env.SMTP_USER ? '✓ Set' : '✗ Missing',
      SMTP_PASS: process.env.SMTP_PASS ? '✓ Set' : '✗ Missing',
      CONTACT_EMAIL: process.env.CONTACT_EMAIL,
    };

    console.log('Environment variables:', envCheck);

    // Check for missing variables
    const missing = [];
    if (!process.env.SMTP_HOST) missing.push('SMTP_HOST');
    if (!process.env.SMTP_PORT) missing.push('SMTP_PORT');
    if (!process.env.SMTP_USER) missing.push('SMTP_USER');
    if (!process.env.SMTP_PASS) missing.push('SMTP_PASS');
    if (!process.env.CONTACT_EMAIL) missing.push('CONTACT_EMAIL');

    if (missing.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Missing environment variables',
        missing,
        envCheck,
        help: 'Make sure your .env.local file exists and contains all required variables'
      });
    }

    // Create SMTP transporter with detailed logging
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      debug: true, // Enable debug logging
      logger: true, // Enable logger
    });

    // Test SMTP connection
    try {
      console.log('Testing SMTP connection...');
      await transporter.verify();
      console.log('SMTP connection successful!');
      
      return NextResponse.json({
        success: true,
        message: 'Email configuration is working correctly!',
        config: {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: process.env.SMTP_SECURE === 'true',
          user: process.env.SMTP_USER,
        }
      });
    } catch (smtpError: any) {
      console.error('SMTP connection failed:', smtpError);
      
      // Provide detailed error analysis
      let diagnosis = 'Unknown SMTP error';
      let solution = 'Check your email credentials';
      
      if (smtpError.code === 'EAUTH') {
        diagnosis = 'Authentication failed - Invalid email/password';
        solution = 'Check your Gmail App Password. Make sure you\'re using the 16-character App Password, not your regular Gmail password.';
      } else if (smtpError.code === 'ENOTFOUND') {
        diagnosis = 'SMTP server not found';
        solution = 'Check your SMTP_HOST setting. For Gmail it should be: smtp.gmail.com';
      } else if (smtpError.code === 'ECONNECTION') {
        diagnosis = 'Connection refused';
        solution = 'Check your SMTP_PORT (should be 587) and network connection';
      } else if (smtpError.code === 'ETIMEDOUT') {
        diagnosis = 'Connection timeout';
        solution = 'Network or firewall issue. Try again or check your internet connection';
      }
      
      return NextResponse.json({
        success: false,
        error: 'SMTP connection failed',
        diagnosis,
        solution,
        details: {
          code: smtpError.code,
          message: smtpError.message,
          response: smtpError.response,
        },
        envCheck,
      });
    }
  } catch (error: any) {
    console.error('Test email error:', error);
    return NextResponse.json({
      success: false,
      error: 'Unexpected error during email test',
      details: error.message,
    });
  }
}
