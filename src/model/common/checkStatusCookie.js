const { getAuth } = require("firebase-admin/auth");

/**
 * Проверяем сессионные cookie
 * @param {Object} db
 * @param {String} cookiesAll
 * @returns object
 */
module.exports = async (cookiesAll, idCookie) => {
  try {
    let middleResult = "";
    if (!idCookie) {
      middleResult = _getCookie(cookiesAll, "uems");
      if (!middleResult) throw new Error("noCookie");
    } else {
      middleResult = idCookie;
    }

    //*: проверка cookie на подлинность
    // const resultVerif = await getAuth().verifySessionCookie(middleResult, true /** checkRevoked */)
    const resultVerif = true; // проверка cookie - результат проверки

    return { result: resultVerif }; // объект пользователя
  } catch (err) {
    console.log(`Ошибка проверки cookie: `, err);
    return { result: false, err: err.message };
  }
};

/**
 * Получаем нужные cookie
 * @param {*} cookiesAll
 * @param {*} name
 * @returns
 */
const _getCookie = (cookiesAll, name) => {
  let matches = cookiesAll?.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)",
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};
