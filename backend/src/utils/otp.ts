// Simple in-memory OTP store
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

export const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const storeOtp = (email: string, otp: string, ttlMinutes = 10): void => {
  otpStore.set(email, {
    otp,
    expiresAt: Date.now() + ttlMinutes * 60 * 1000,
  });
};

export const verifyOtp = (email: string, otp: string): boolean => {
  const record = otpStore.get(email);
  if (!record) return false;
  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return false;
  }
  if (record.otp !== otp) return false;
  otpStore.delete(email); // one-time use
  return true;
};

export const clearOtp = (email: string): void => {
  otpStore.delete(email);
};
