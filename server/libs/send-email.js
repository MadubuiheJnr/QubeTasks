import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const fromEmail = process.env.FROM_EMAIL_ADDRESS;

export const sendEmail = async (to, subject, html) => {
  const msg = {
    to,
    from: `QubeTasks <${fromEmail}>`,
    subject,
    html,
  };
  try {
    await sgMail.send(msg);
    console.log("Email sent successfully");

    return true;
  } catch (error) {
    console.log("Error sending email:", error);

    return false;
  }
};
