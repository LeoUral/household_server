require('dotenv').config();
const updatePersonalData = require("../model/personal/updatePersonalData");
const getUID = require("../model/common/getUID");
const getDataCompanies = require("../model/personal/getDataCompanies");
const errorHandling = require("../error/errorHandling");
const changeEmail = require("../model/personal/changeEmail");
const { getAuth } = require('firebase-admin/auth')
const exchangeCustomTokenForIdToken = require('../model/common/exchangeCustomTokenForIdToken');
const getNewCookie = require('../model/common/getNewCookie');


/**
 * Контроллер работы с личным кабинетом
 */
class PersonalController {

    /**
     * Получаем данные пользователя из БД
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async doGetPersonalData(req, res, next) {
        try {
            const db = req.db;
            const uid = await getUID(req, res)

            const user = await db.collection('users').findOne({ uid: uid })
            if (!user) throw new Error('notFound')

            // const userFB = await getAuth().getUser(uid)
            // console.log(`FB: `, userFB); // test

            res.json({ result: user })
        } catch (err) {
            console.log(`Ошибка при получении персональных данных: `, err);
            res.sendStatus(errorHandling(err.message))
        }
    }

    /**
     * Обновление персональных данных пользователя
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async doUpdatePersonalData(req, res, next) {
        try {
            const db = req.db;
            // const data = JSON.parse(req.body.data);            
            const { data } = req.body
            console.log(`DATA personal:::: `, data); // test
            const uid = await getUID(req, res)

            const result = await updatePersonalData(db, uid, data)
            if (!result) throw new Error(`errorUpdateDataUser`) // Ошибка обновления персональных данных

            res.json({ result: true })
        } catch (err) {
            console.log(`Ошибка обновления персональных данных пользователя в БД: `, err);
            res.sendStatus(401)
        }
    }


    /**
     * Получение куки для разработки
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async getCookieForDevelop(req, res, next) {
        try {
            const newSessionCookie = await getNewCookie(req, res)
            if (!newSessionCookie) throw new Error('Новые куки не получены')

            res.json({ sessionCookie: 'look in console' })
        } catch (err) {
            console.log(`Ошибка при получении куки для POSTMAN::: `, err);
            res.sendStatus(400)
        }
    }


    /**
     * Получаем данные о компаниях пользователя
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async doGetDataCompanies(req, res, next) {
        try {
            const db = req.db;
            const ID = req.ID

            const dataCompanys = await getDataCompanies(db, ID)

            res.json({ result: "OK" })
        } catch (err) {
            console.log(`Ошибка при получении данных о компаниях пользователя: `, err);
            res.sendStatus(401)
        }
    }

}

module.exports = new PersonalController()

