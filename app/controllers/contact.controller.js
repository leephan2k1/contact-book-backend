module.exports = { 
    create: async (req, res, next) => {
        res.status(201).send({message: "create handler"})
    },

    findAll: async (req, res, next) => {
        res.status(200).send({message: "findAll handler"})
    },

    findAllFavorite: async (req, res, next) => {
        res.status(200).send({message: "findAllFavorite handler"})
    },

    findOne: async (req, res, next) => {
        res.status(200).send({message: "findOne handler"})
    },

    update: async (req, res, next) => {
        res.status(200).send({message: "update handler"})
    },

    delete: async (req, res, next) => {
        res.status(200).send({message: "delete handler"})
    },

    deleteAll: async (req, res, next) => {
        res.status(200).send({message: "deleteAll handler"})
    },
}