const { PrismaClient } = require("../generated/prisma");
const bcrypt = require("bcrypt");
const genToken = require("../utils/genToken");

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

    res.status(200).json({
        success : true,
        message: "User created successfully",
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
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
};
