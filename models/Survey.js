const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recipientSchema = require('./Recipient')

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [recipientSchema],
  yes: { type: Number, default: 0},
  no: { type: Number, default: 0},
  _user: { type: Schema.Types.ObjectId, ref: 'User'}, //setup relationship with User schema
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('surveys', surveySchema);