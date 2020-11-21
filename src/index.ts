// register root file untuk menggunakan sourcemap
import 'source-map-support/register'

import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import {Customer, CustomerType} from './mongooseCustomer'
import {Account,AccountType} from './mongooseAccount'
import {Transaction, TransactionType} from './mongooseTransaction'

async function initApp() {
  const app = express()
  mongoose.connect(`${process.env.MONGODB_URI}`,{useNewUrlParser:true,useUnifiedTopology:true})
  const customerModel= new Customer()
  const accountModel = new Account()
  const transactionModel = new Transaction()

  app.use(bodyParser.json())

  //Insert Customer
  app.post('/customer', async function(req, res, next) {
    try {
      await customerModel.create(req.body)
    } catch (error) {
      return next(error)
    }
    res.send({success:true})
  })
  //Insert Account
  app.post('/account',async function (req,res,next) {
    try {
      await accountModel.create(req.body)
    } catch (error) {
      return next(error)
    }
    res.send({success:true})
  })

  //Insert Transaction
  app.post('/transaction',async function(req,res,next){
    try {
      await transactionModel.create(req.body)
    } catch (error) {
      return next(error)
    }
    res.send({success:true})
  })

  //Get All Customers data
  app.get('/customer', async function(req, res, next) {
    let customers : CustomerType[]
    try {
      customers= await customerModel.getAll()
    } catch (error) {
      return next(error)
    }
    return res.send(customers)
  })
  //GET All Customer Accounts
  app.get('/account',async function(req,res,next){
    let accounts : AccountType[]
    try {
      accounts = await accountModel.getAll()
    } catch (error) {
      return next(error)
    }
    return res.send(accounts)
  })
  //Get All Transaction Data
  app.get('/transaction',async function(req,res,next){
    let transactions : TransactionType[]
    try {
      transactions = await transactionModel.getAll()
    } catch (error) {
      return next(error)
    }
    return res.send(transactions)
  })

  //GET Customer data by id
  app.get('/customer/:id', async function(req, res, next) {
    let customer : CustomerType | null
    try {
      customer = await customerModel.getByID(req.params.id)
    } catch (error) {
      return next(error)
    }
    return res.send(customer)
  })

  //GET Customer Account by id
  app.get('/account/:id', async function(req, res, next) {
    let account : AccountType | null
    try {
      account = await accountModel.getByID(req.params.id)
    } catch (error) {
      return next(error)
    }
    return res.send(account)
  })
  //GET Transaction data by account_id
  app.get('/transaction/:id', async function(req, res, next) {
    let transaction : TransactionType | null
    try {
      transaction = await transactionModel.getByID(req.params.id)
    } catch (error) {
      return next(error)
    }
    return res.send(transaction)
  })

  //UPDATE Customer data by id
  app.put('/customer/:id', async function(req, res, next) {
    try {
      await customerModel.update(req.params.id, req.body)
    } catch (error) {
      return next(error)
    }
    return res.send({succes : true})
  })
  
  //UPDATE Customer Account data by id
  app.put('/account/:id', async function(req, res, next) {
    try {
      await accountModel.update(req.params.id, req.body)
    } catch (error) {
      return next(error)
    }
    return res.send({succes : true})
  })

  //UPDATE Transaction data by account_id
  app.put('/transaction/:id', async function(req, res, next) {
    try {
      await transactionModel.update(req.params.id, req.body)
    } catch (error) {
      return next(error)
    }
    return res.send({succes : true})
  })

  //DELETE Customer data by id
  app.delete('/customer/:id', async function(req, res, next) {
    try {
      await customerModel.delete(req.params.id)
    } catch (error) {
      return next(error)
    }
    res.send({success:true})
  })

  //DELETE Customer Account data by id
  app.delete('/account/:id', async function(req, res, next) {
    try {
      await accountModel.delete(req.params.id)
    } catch (error) {
      return next(error)
    }
    res.send({success:true})
  })

  //DELETE Transaction data by account id
  app.delete('/transaction/:id', async function(req, res, next) {
    try {
      await transactionModel.delete(req.params.id)
    } catch (error) {
      return next(error)
    }
    res.send({success:true})
  })

  app.use(function(err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(500).send({
      success: false,
      message: err.message
    })
  })

  app.listen(process.env.PORT || 8000, () => {
    console.log(`App listen on port ${ process.env.PORT || 8000 }`)
  })
}

initApp()