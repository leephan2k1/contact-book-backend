const { BadRequestError } = require("../error");
const handlePromise = require("../helpers/promise.helper");
const Contact = require("../models/contact.model");

module.exports = {
  create: async (req, res, next) => {
    if (!req.body.name) {
      return next(new BadRequestError(400, "Name cannot be empty"));
    }
    const { name, email, address, phone, favorite } = req.body;
    const contact = new Contact({
      name,
      email,
      address,
      phone,
      favorite: String(favorite).toLowerCase() === "true",
    });

    const [err, doc] = await handlePromise(contact.save());

    if (err) {
      return next(
        new BadRequestError(500, "An Error has occurred while creating contact")
      );
    }

    return res.status(201).json({
      success: true,
      doc,
    });
  },

  findAll: async (req, res, next) => {
    const condition = {};
    const { name } = req.params;

    if (name) {
      condition.name = { $regex: new RegExp(name), $options: "i" };
    }

    const [err, docs] = await handlePromise(Contact.find(condition));

    if (err) {
      return next(
        new BadRequestError(
          500,
          "An Error has occurred while retrieving contact"
        )
      );
    }

    return res.status(200).json({
      success: true,
      docs,
    });
  },

  findAllFavorite: async (req, res, next) => {
    const [err, docs] = await handlePromise(Contact.find({ favorite: true }));

    if (err) {
      return next(
        new BadRequestError(
          500,
          "An Error has occurred while retrieving favorite contacts"
        )
      );
    }

    return res.status(200).json({
      success: true,
      docs,
    });
  },

  findOne: async (req, res, next) => {
    const { id } = req.params;
    const [err, doc] = await handlePromise(Contact.findById(id));

    if (err) {
      return next(
        new BadRequestError(500, `Error retrieving contact with id=${id}`)
      );
    }

    if (!doc) {
      return next(new BadRequestError(404, `Contact not found`));
    }

    return res.status(200).json({
      success: true,
      doc,
    });
  },

  update: async (req, res, next) => {
    if (!req.body) {
      return next(new BadRequestError(400, "Data to update can not be empty"));
    }

    const condition = {
      _id: req.params.id,
    };

    const [err, doc] = await handlePromise(
      Contact.findOneAndUpdate(condition, req.body, { new: true })
    );

    if (err) {
      return next(
        new BadRequestError(500, `Error updating contact with id=${id}`)
      );
    }

    if (!doc) {
      return next(new BadRequestError(404, `Contact not found`));
    }

    return res.status(200).json({
      success: true,
      message: "Contact updated successfully",
    });
  },

  delete: async (req, res, next) => {
    const condition = {
      _id: req.params.id,
    };

    const [err, doc] = await handlePromise(Contact.findOneAndDelete(condition));

    if (err) {
      return next(
        new BadRequestError(500, `Could not delete contact with id=${id}`)
      );
    }
    if (!doc) {
      return next(new BadRequestError(404, `Contact not found`));
    }

    return res.status(200).json({
      success: true,
      message: "Contact was deleted successfully",
    });
  },

  deleteAll: async (req, res, next) => {
    const [err, docs] = await handlePromise(Contact.deleteMany({}));

    if (err) {
      return next(
        new BadRequestError(
          500,
          `An error occurred while removing all contacts`
        )
      );
    }

    return res.status(200).json({
      success: true,
      message: `${docs.deletedCount} contacts was deleted successfully`,
    });
  },
};
