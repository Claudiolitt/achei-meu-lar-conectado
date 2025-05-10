// Mock verification service for development
const verificationCodes = new Map<string, { code: string; expiresAt: Date }>();

export const generateVerificationCode = () => {
  // Generate a random 6-digit code
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendVerificationEmail = async (email: string) => {
  const code = generateVerificationCode();
  const expiresAt = new Date(Date.now() + 3600000); // 1 hour

  // Store the code
  verificationCodes.set(email, { code, expiresAt });

  // In development, log the code to console
  console.log(`[DEV] Verification code for ${email}: ${code}`);

  return code;
};

export const verifyCode = (email: string, code: string) => {
  const storedData = verificationCodes.get(email);
  
  if (!storedData) {
    return false;
  }

  if (new Date() > storedData.expiresAt) {
    verificationCodes.delete(email);
    return false;
  }

  if (storedData.code !== code) {
    return false;
  }

  // Remove the code after successful verification
  verificationCodes.delete(email);
  return true;
}; 