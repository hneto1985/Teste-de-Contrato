/// <reference types="cypress" />

const Joi = require('joi')
const { pagamentoBoleto } = require("../support/schema")


describe('pagamento de boleto', () => {
    it('auth', () => {
        const token = "NDM5aWhxbzZqZWY5amtxMHBjbnBhdGc1cXM6MTYwYWNobW5nZzNpYThqdXNtcmprYjg2NWFqcXFkM2wxcDZrZXZqMGtkYzVnbzJ1ZjNoZg=="
        const authorization = `Basic ${token}`;
        cy.request(
            {
                method: 'POST',
                url: 'https://auth.hml.caradhras.io/oauth2/token?grant_type=client_credentials',
                headers: {
                    authorization
                },
            }).then((data) => {
                globalThis.token = JSON.stringify(data.body.access_token).replace(/"/g, "")
            })
    })

    it('realiza pagamento boleto', () => {
        const auth = `Bearer ${globalThis.token}`
        cy.request(
            {
                method: 'POST',
                url: 'https://payments.hml.caradhras.io/v1',
                headers: {
                    Authorization: auth
                },
                body: {
                    "idAccount": "380626",
                    "assignor": "BMP MONEY PLUS SCD",
                    "barCodeNumber": "27490001019000016875863707072300190930000028733",
                    "description": "63bdf0e8-881d-4173-abac-69361536339e",
                    "discount": 0,
                    "dueDate": "2022-08-30T03:00:00.000Z",
                    "fine": 0,
                    "interest": 0,
                    "amount": 287.33,
                    "assignorDocument": "34337707000100"
                }
            }

        ).then((res) => {
            expect(res.status).to.equal(202)
            Joi.assert(res.body, pagamentoBoleto)
        })

    })
})


