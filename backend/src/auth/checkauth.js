const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const checkAuth = async (req, res) => {
  if (!req.userId) {
      return res.status(401).json({ success: false, message: 'User ID missing' });
    }
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const { password, ...safeUser } = user;
    return res.status(200).json({
      success: true,
      user: safeUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = checkAuth;
