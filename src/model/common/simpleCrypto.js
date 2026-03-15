const jwt = require("jsonwebtoken");

/**
 * Формирование JWT токена
 * @param {string} email
 * @returns {string} token
 */
module.exports = async (email) => {
  try {
    if (!email || !_validateEmail(email)) {
      throw new Error("Не указан email или email не верный!");
    }

    const secret = "LOTUS-uems";
    const token = jwt.sign({ email }, secret, { expiresIn: "1h" });

    return token;
  } catch (err) {
    console.log("Ошибка при формировании JWT токена: ", err);
    return null;
  }
};

// Проверка email
function _validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
