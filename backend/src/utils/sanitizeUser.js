const sanitizeUser = (user) => {
  const { password, ...sanitized } = user;
  return sanitized;
};

module.exports = sanitizeUser;