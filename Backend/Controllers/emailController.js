import nodemailer from "nodemailer";


export const sendEmailController = async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 16px; color: #333;">
        <h2 style="color: #007bff;">Message from Employer</h2>
        <p style="line-height: 1.6;">${message}</p>
        <br />
        <p>Regards,</p>
        <p><strong>Your Company</strong></p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Job Hub" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    });

    return res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
};
