import { google } from 'googleapis';

const calendar = google.calendar('v3');

export async function createCalendarEvent(booking: any, product: any) {
  try {
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CALENDAR_CLIENT_ID,
      process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
      'urn:ietf:wg:oauth:2.0:oob'
    );

    auth.setCredentials({
      refresh_token: process.env.GOOGLE_CALENDAR_REFRESH_TOKEN,
    });

    const event = {
      summary: `${product.name} - ${booking.name}`,
      description: `
        Service: ${product.name}
        Customer: ${booking.name}
        Email: ${booking.email}
        Phone: ${booking.phone}
        ${booking.notes ? `Notes: ${booking.notes}` : ''}
        
        Booking ID: ${booking.id}
      `,
      start: {
        dateTime: booking.scheduledStart,
        timeZone: 'America/New_York',
      },
      end: {
        dateTime: booking.scheduledEnd,
        timeZone: 'America/New_York',
      },
      attendees: [
        { email: booking.email },
      ],
    };

    const response = await calendar.events.insert({
      auth,
      calendarId: 'primary',
      requestBody: event,
    });

    return response.data.id;
  } catch (error) {
    console.error('Failed to create calendar event:', error);
    throw error;
  }
}