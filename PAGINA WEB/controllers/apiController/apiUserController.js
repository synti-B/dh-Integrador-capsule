const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const db = require("../../database/models");
const { Op } = require("sequelize");
const moment = require("moment");

let direccion = "http://localhost:3050/img/users/";

const apiProductController = {

    listUsers: (req, res) => {
        db.User.findAll({
            order: [
                ['createdAt', 'DESC']],
                limit: 1
        })
            .then((users) => {
                
                users.forEach(user => {
                    delete user.dataValues.password;
                    delete user.dataValues.category_id;
                    delete user._previousDataValues.password;
                    delete user._previousDataValues.category_id;
                    user.dataValues.avatar = direccion + user.dataValues.avatar;
                    user.dataValues.createdAt = moment(user.dataValues.createdAt).format('MMMM Do YYYY, HH:mm')
    

                });

                if (users.length > 0) {
                    return res.status(200).json({
                        total: users.length,
                        data: users,
                        status: 200
                    })
                }
                return res.status(200).json('No se existen en la BD')

            })
    },
    userId: (req, res) => {
        db.User.findByPk(req.params.id)
            .then((user) => {
                delete user.dataValues.password;
                delete user.dataValues.category_id;
                delete user._previousDataValues.password;
                delete user._previousDataValues.category_id;
                user.dataValues.avatar = direccion + user.dataValues.avatar
                if (user) {
                    return res.status(200).json({
                        data: user,
                        status: 200
                    })
                }
                return res.status(200).json('No se existe en la BD')
            })
    },
    registerUser: (req, res) => {
        db.User.create({
                ...req.body,
                password: bcryptjs.hashSync(req.body.password, 10),
            })
            .then((user) => {
                return res.status(200).json({
                    data: user,
                    status: 200,
                    created: "Ok"
                })

            })
    },
    searchUsers: (req, res) => {
        db.User.findAll({
                where: {
                    first_name: {
                        [Op.like]: `%${req.query.busqueda}%`
                    }
                }
            })
            .then((users) => {
                users.forEach(user => {
                    delete user.dataValues.password;
                    delete user.dataValues.category_id;
                    delete user._previousDataValues.password;
                    delete user._previousDataValues.category_id;
                    user.dataValues.avatar = direccion + user.dataValues.avatar
                });
                if (users.length > 0) {
                    return res.status(200).json({
                        total: users.length,
                        data: users,
                        status: 200
                    })
                }
                return res.status(200).json('No existen usuarios')
            })
    },


}
module.exports = apiProductController