import nodemailer from 'nodemailer';
/**
 *
 * @class SendMail
 *
 * @description class for sending emails
 *
 * @method sendMail
 */
export default class SendMail {
  /**
   *
   * @description method that sends out emails
   *
   * @param { Object }
   *
   * @returns void
   */
  static sendMail = async ({ to, subject, html }) => {
    if (!to) throw new Error('Please provide a valid email address');
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: 'meeky.ae@gmail.com',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: process.env.ACCESS_TOKEN,
      },
    });

    const mailServerResponse = await transport.sendMail({
      from: 'eWorks <no-reply@eworks.com>',
      to,
      subject,
      html,
    });

    if (!mailServerResponse.messageId) {
      throw new Error('There was an error sending email');
    }

    return mailServerResponse;
  }
}
