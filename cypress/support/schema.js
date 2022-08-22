const Joi = require('joi');

const pagamentoBoleto = Joi.object({

    message: Joi.string(),
    uuid: Joi.string(),
    status: Joi.string(),
    idAccount: Joi.string(),
    barCodeNumber: Joi.string(),
    dueDate: Joi.date(),
    description: Joi.string(),
    assignor: Joi.string(),
    assignorDocument: Joi.string(),
    discount: Joi.number(),
    interest: Joi.number(),
    fine: Joi.number(),
    amount: Joi.number(),
    transactionCode: Joi.string(),
    transactionDate: Joi.date()

});


module.exports = {
    pagamentoBoleto
}



