const mongoose = require('mongoose')

// SCHEMA

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  country: String,
  pincode: String
})

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact_number: String,
  address: addressSchema
})

const productSchema = new mongoose.Schema({})

const rawMaterialSchema = new mongoose.Schema({})

const demandSchema = new mongoose.Schema({
   
})

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  
})

// THE STATE OF DB CONNECTION

var mongo = {}
mongo.connected = false
mongo.models = new Map()

mongo.models.set('Address', mongoose.model('Address', addressSchema))


// CONNECTING TO MONGO

mongo.init = () => {
  return new Promise((resolve, reject) => {
    //console.log(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0-t1aq3.mongodb.net/test?retryWrites=true&w=majority`)
    mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/${process.env.MONGO_DB}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    mongoose.connection.on('error', err => reject(`Connection error: ${err}`))
    mongoose.connection.once('open', function() {
      console.log('connected to the database!')
      mongo.connected = true
      //initializeUsingMongoObject().then(resolve)
      resolve()
    })
  })
}

module.exports = mongo
