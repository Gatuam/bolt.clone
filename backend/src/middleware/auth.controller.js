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
  res.send("login");
};

const logout = async (req, res) => {
  res.send("logout");
};

module.exports = {
  signup,
  login,
  logout,
  verfiyEmail,
};
