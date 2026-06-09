import { Resend } from "resend";
import myEnv from "../config/env.ts";

const resend = new Resend(myEnv.RESEND_API_KEY);
const FROM_EMAIL = myEnv.RESEND_FROM_EMAIL;

// ─── OTP Verification Email ───────────────────────────────────────────────────

export const sendOtpEmail = async (to: string, name: string, otp: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: `ReServe <${FROM_EMAIL}>`,
      to: [to],
      subject: `${otp} is your ReServe verification code`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#f9f6f1">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.06)">
    <tr><td style="background:#1A1A1A;padding:28px 32px">
      <span style="color:#F4A01C;font-size:20px;font-weight:700;letter-spacing:-0.5px">ReServe</span>
    </td></tr>
    <tr><td style="padding:36px 32px 24px">
      <h1 style="margin:0 0 8px;font-size:22px;color:#1A1A1A">Hey ${name || "there"},</h1>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#666">Use the code below to verify your email and complete your ReServe signup.</p>
    </td></tr>
    <tr><td style="padding:0 32px">
      <div style="background:#f5f0e8;border-radius:12px;padding:20px;text-align:center">
        <span style="font-size:36px;font-weight:800;letter-spacing:8px;color:#1A1A1A">${otp}</span>
      </div>
    </td></tr>
    <tr><td style="padding:24px 32px">
      <p style="margin:0;font-size:13px;color:#999">This code expires in <strong>10 minutes</strong>. If you didn't sign up for ReServe, ignore this email.</p>
    </td></tr>
    <tr><td style="padding:20px 32px 28px;border-top:1px solid #f0f0f0">
      <p style="margin:0;font-size:12px;color:#bbb">ReServe — Surplus food exchange &middot; <a href="https://reserve.xsam.in" style="color:#F4A01C;text-decoration:none">reserve.xsam.in</a></p>
    </td></tr>
  </table>
</body>
</html>`,
    });

    if (error) {
      console.error("Error sending OTP email:", error);
      return { success: false, error };
    }
    console.log("OTP email sent:", data?.id);
    return { success: true, id: data?.id };
  } catch (err) {
    console.error("Failed to send OTP email:", err);
    return { success: false, error: err };
  }
};

// ─── Welcome Email ────────────────────────────────────────────────────────────

export const sendWelcomeEmail = async (to: string, name: string, role: string) => {
  try {
    const isDonor = role === "DONOR";
    const { data, error } = await resend.emails.send({
      from: `ReServe <${FROM_EMAIL}>`,
      to: [to],
      subject: `Welcome to ReServe${isDonor ? " — Start sharing surplus" : " — Start claiming surplus"}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#f9f6f1">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.06)">
    <tr><td style="background:#1A1A1A;padding:28px 32px">
      <span style="color:#F4A01C;font-size:20px;font-weight:700;letter-spacing:-0.5px">ReServe</span>
    </td></tr>
    <tr><td style="padding:36px 32px 16px">
      <h1 style="margin:0 0 12px;font-size:22px;color:#1A1A1A">Welcome, ${name || "partner"}! 🎉</h1>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#666">Your ReServe account is ready. ${
        isDonor
          ? "You can now list surplus food from your restaurant, venue, or event and help it reach communities that need it."
          : "You can now browse surplus food listings from restaurants and events and coordinate fast pickups."
      }</p>
    </td></tr>
    <tr><td style="padding:16px 32px">
      <table cellpadding="0" cellspacing="0"><tr>
        <td style="background:#F4A01C;border-radius:6px;padding:12px 24px">
          <a href="https://reserve.xsam.in/${isDonor ? "donations" : "claims"}" style="color:#fff;text-decoration:none;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px">${isDonor ? "Create your first listing" : "Browse surplus"}</a>
        </td>
      </tr></table>
    </td></tr>
    <tr><td style="padding:20px 32px 28px;border-top:1px solid #f0f0f0;margin-top:16px">
      <p style="margin:0;font-size:12px;color:#bbb">ReServe — Surplus food exchange &middot; <a href="https://reserve.xsam.in" style="color:#F4A01C;text-decoration:none">reserve.xsam.in</a></p>
    </td></tr>
  </table>
</body>
</html>`,
    });

    if (error) {
      console.error("Error sending welcome email:", error);
      return { success: false, error };
    }
    return { success: true, id: data?.id };
  } catch (err) {
    console.error("Failed to send welcome email:", err);
    return { success: false, error: err };
  }
};

// ─── Claim Notification to Donor ──────────────────────────────────────────────

export const sendClaimNotificationEmail = async (
  donorEmail: string,
  donorName: string,
  claimerName: string,
  foodName: string,
  quantity: number,
  scheduledPickup: string,
) => {
  try {
    const { data, error } = await resend.emails.send({
      from: `ReServe <${FROM_EMAIL}>`,
      to: [donorEmail],
      subject: `New claim on your listing: ${foodName}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#f9f6f1">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.06)">
    <tr><td style="background:#1A1A1A;padding:28px 32px">
      <span style="color:#F4A01C;font-size:20px;font-weight:700;letter-spacing:-0.5px">ReServe</span>
    </td></tr>
    <tr><td style="padding:36px 32px 16px">
      <h1 style="margin:0 0 12px;font-size:22px;color:#1A1A1A">New claim request</h1>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#666">Hi ${donorName || "there"}, someone wants to pick up your surplus food!</p>
    </td></tr>
    <tr><td style="padding:0 32px">
      <div style="background:#f5f0e8;border-radius:12px;padding:20px">
        <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#333">
          <tr><td style="padding:4px 0;color:#999;width:120px">Food item</td><td style="padding:4px 0;font-weight:600">${foodName}</td></tr>
          <tr><td style="padding:4px 0;color:#999">Quantity</td><td style="padding:4px 0;font-weight:600">${quantity} items</td></tr>
          <tr><td style="padding:4px 0;color:#999">Claimed by</td><td style="padding:4px 0;font-weight:600">${claimerName || "NGO Partner"}</td></tr>
          <tr><td style="padding:4px 0;color:#999">Pickup date</td><td style="padding:4px 0;font-weight:600">${scheduledPickup}</td></tr>
        </table>
      </div>
    </td></tr>
    <tr><td style="padding:20px 32px">
      <table cellpadding="0" cellspacing="0"><tr>
        <td style="background:#1A1A1A;border-radius:6px;padding:12px 24px">
          <a href="https://reserve.xsam.in/donations" style="color:#fff;text-decoration:none;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px">View claims</a>
        </td>
      </tr></table>
    </td></tr>
    <tr><td style="padding:16px 32px 28px;border-top:1px solid #f0f0f0">
      <p style="margin:0;font-size:12px;color:#bbb">ReServe — Surplus food exchange &middot; <a href="https://reserve.xsam.in" style="color:#F4A01C;text-decoration:none">reserve.xsam.in</a></p>
    </td></tr>
  </table>
</body>
</html>`,
    });

    if (error) {
      console.error("Error sending claim notification email:", error);
      return { success: false, error };
    }
    return { success: true, id: data?.id };
  } catch (err) {
    console.error("Failed to send claim notification email:", err);
    return { success: false, error: err };
  }
};

// ─── Claim Status Update to Claimer ───────────────────────────────────────────

export const sendClaimStatusEmail = async (
  claimerEmail: string,
  claimerName: string,
  foodName: string,
  status: string,
  donorName: string,
) => {
  const statusText: Record<string, { label: string; color: string; message: string }> = {
    ACCEPTED: { label: "Accepted ✅", color: "#4CAF50", message: "Your claim has been accepted! Please coordinate pickup with the donor." },
    REJECTED: { label: "Rejected", color: "#e53e3e", message: "Unfortunately the donor was unable to fulfil this claim. Browse other listings to find surplus near you." },
    PICKED_UP: { label: "Picked Up 📦", color: "#F4A01C", message: "Pickup confirmed! Thank you for helping rescue surplus food." },
    COMPLETED: { label: "Completed 🎉", color: "#4CAF50", message: "This claim is complete. Great work keeping food out of landfills!" },
    CANCELLED: { label: "Cancelled", color: "#999", message: "This claim has been cancelled." },
  };

  const info = statusText[status] || { label: status, color: "#666", message: "Your claim status has been updated." };

  try {
    const { data, error } = await resend.emails.send({
      from: `ReServe <${FROM_EMAIL}>`,
      to: [claimerEmail],
      subject: `Claim update: ${foodName} — ${info.label}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#f9f6f1">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.06)">
    <tr><td style="background:#1A1A1A;padding:28px 32px">
      <span style="color:#F4A01C;font-size:20px;font-weight:700;letter-spacing:-0.5px">ReServe</span>
    </td></tr>
    <tr><td style="padding:36px 32px 16px">
      <h1 style="margin:0 0 12px;font-size:22px;color:#1A1A1A">Claim update</h1>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#666">Hi ${claimerName || "there"},</p>
    </td></tr>
    <tr><td style="padding:0 32px">
      <div style="background:#f5f0e8;border-radius:12px;padding:20px">
        <p style="margin:0 0 8px;font-size:13px;color:#999">Food listing</p>
        <p style="margin:0 0 16px;font-size:16px;font-weight:700;color:#1A1A1A">${foodName} <span style="font-size:12px;color:#999">from ${donorName || "donor"}</span></p>
        <p style="margin:0 0 4px;font-size:13px;color:#999">Status</p>
        <p style="margin:0;font-size:18px;font-weight:700;color:${info.color}">${info.label}</p>
      </div>
    </td></tr>
    <tr><td style="padding:20px 32px">
      <p style="margin:0;font-size:14px;line-height:1.6;color:#666">${info.message}</p>
    </td></tr>
    <tr><td style="padding:8px 32px 28px;border-top:1px solid #f0f0f0">
      <p style="margin:0;font-size:12px;color:#bbb">ReServe — Surplus food exchange &middot; <a href="https://reserve.xsam.in" style="color:#F4A01C;text-decoration:none">reserve.xsam.in</a></p>
    </td></tr>
  </table>
</body>
</html>`,
    });

    if (error) {
      console.error("Error sending claim status email:", error);
      return { success: false, error };
    }
    return { success: true, id: data?.id };
  } catch (err) {
    console.error("Failed to send claim status email:", err);
    return { success: false, error: err };
  }
};
