interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailData) {
  try {
    // Using a simple email service - in production, replace with your preferred service
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Cryptic Mobile Detailing <noreply@${process.env.OWNER_EMAIL?.split('@')[1]}>`,
        to: [to],
        subject,
        html,
      }),
    });

    if (!response.ok) {
      throw new Error(`Email service error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

export function generateBookingConfirmationEmail(booking: any, product: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3B82F6;">Booking Confirmation - Cryptic Mobile Detailing</h2>
      
      <p>Dear ${booking.name},</p>
      
      <p>Thank you for booking with Cryptic Mobile Detailing! Your appointment has been confirmed.</p>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Booking Details:</h3>
        <p><strong>Service:</strong> ${product.name}</p>
        <p><strong>Date:</strong> ${new Date(booking.scheduledStart).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${new Date(booking.scheduledStart).toLocaleTimeString()}</p>
        <p><strong>Duration:</strong> ${Math.round((new Date(booking.scheduledEnd).getTime() - new Date(booking.scheduledStart).getTime()) / (1000 * 60))} minutes</p>
        ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ''}
      </div>
      
      <p>If you need to reschedule or have any questions, please contact us:</p>
      <p><strong>Phone:</strong> ${process.env.OWNER_PHONE}</p>
      <p><strong>Email:</strong> ${process.env.OWNER_EMAIL}</p>
      
      <p>We look forward to making your vehicle shine!</p>
      
      <p>Best regards,<br>Cryptic Mobile Detailing Team</p>
    </div>
  `;
}

export function generateOwnerNotificationEmail(booking: any, product: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3B82F6;">New Booking Received</h2>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Booking Details:</h3>
        <p><strong>Customer:</strong> ${booking.name}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Phone:</strong> ${booking.phone}</p>
        <p><strong>Service:</strong> ${product.name} ($${(product.price / 100).toFixed(2)})</p>
        <p><strong>Date:</strong> ${new Date(booking.scheduledStart).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${new Date(booking.scheduledStart).toLocaleTimeString()}</p>
        ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ''}
        <p><strong>Booking ID:</strong> ${booking.id}</p>
      </div>
      
      <p>Payment status: ${booking.stripePaymentId ? 'Paid via Stripe' : 'Payment pending'}</p>
    </div>
  `;
}