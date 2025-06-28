const { PrismaClient } = require("../generated/prisma");
const bcrypt = require("bcrypt");
const genToken = require("../utils/genToken");
const sendMail = require("../mail/mail.config");

const prisma = new PrismaClient();

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }
    const userExist = await prisma.user.findUnique({ where: { email } });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 12 * 1000 * 60 * 60); //12 hour

    const VerificationToken = await prisma.verificationToken.create({
      data: {
        token,
        expiresAt,
        userId: user.id,
      },
    });

    genToken(res, user.id);
    await sendMail(user.email, user.username, VerificationToken.token);
    console.log(VerificationToken.token);
    console.log(user.email);

    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const verfiyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const tokenRecord = await prisma.verificationToken.findUnique({
      where: {
        token: code,
      },
    });
    if (!tokenRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: tokenRecord.userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const verifiedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
      },
    });
    await prisma.verificationToken.delete({
      where: {
        token: code,
      },
    });
    await sendMail(user.email, user.username, "welcome to Bolt.new ai");

    await res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invaid request!",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credential",
      });
    }
    const decodePassword = await bcrypt.compare(password, user.password);
    if (!decodePassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid credential",
      });
    }
    //  Check if user is not verified
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your email before logging in",
      });
    }
    genToken(res, user.id);
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Email or Password incorrect",
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "Wrong email!",
      });
    }
    await prisma.resetPasswordToken.deleteMany({
      where: {
        userId: user.id,
      },
    });

    const resetToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 1 * 1000 * 60 * 60); //1hour

    await prisma.resetPasswordToken.create({
      data: {
        token: resetToken,
        expiresAt: expiresAt,
        userId: user.id,
      },
    });

    await sendMail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`,
      "reset your password"
    );

    res.status(200).json({
      success: true,
      message: "Check your email to resetpassword",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPasswod = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const resetToken = await prisma.resetPasswordToken.findUnique({
      where: { token },
      include: { user: true },
    });
    console.log(resetToken.user);

    if (!resetToken || resetToken.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: resetToken.user.id },
      data: { password: hashedPassword },
    });
    await prisma.resetPasswordToken.delete({
      where: { token },
    });

    sendMail(
      resetToken.user.email,
      "Password Change",
      "your password is succefully changed"
    );

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
  logout,
  verfiyEmail,
  forgotPassword,
  resetPasswod,
};
