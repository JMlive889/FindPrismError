import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Send email to owner
    await sendEmail({
      to: process.env.OWNER_EMAIL!,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82F6;">New Contact Form Submission</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 4px;">${message}</p>
          </div>
          
          <p>Reply directly to this email to respond to the customer.</p>
        </div>
      `
    });

    // Send confirmation to customer
    await sendEmail({
      to: email,
      subject: 'Thank you for contacting Cryptic Mobile Detailing',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82F6;">Thank You for Contacting Us!</h2>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for reaching out to Cryptic Mobile Detailing. We've received your message and will respond within 2 hours during business hours.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 4px;">${message}</p>
          </div>
          
          <p>If you need immediate assistance, please call us at:</p>
          <p style="font-size: 18px; font-weight: bold; color: #3B82F6;">${process.env.OWNER_PHONE}</p>
          
          <p>Best regards,<br>Cryptic Mobile Detailing Team</p>
        </div>
      `
    });

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}