const nodemailer = require('nodemailer');
const Email = require('email-templates');
const path = require('path');

class EmailService {
  async sendMail(emailToSend, context) {
    const emailRenderer = new Email({
      views: {
        root: path.join(__dirname, '../', 'email-templates'),
      },
    });

    context.response.allAmount = context.response.reduce((prev, next) => {
      return prev + next.totalPrice;
    }, 0);

    Object.assign(context, {});

    const html = await emailRenderer.render('productsOrder', context);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_LOGIN,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: 'Магазин мобільних товарів',
      to: emailToSend,
      subject: 'Привіт, твоє замовлення прийнято',
      html,
    });
  }
}

module.exports = {
  emailService: new EmailService(),
};
