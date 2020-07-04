const router = require('express').Router();
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys');

router.get('/api/surveys/:surveyId/:choice', (req, res) => {
  res.send('Thanks for voting!');
});

router.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
  const { title, body, subject, recipients } = req.body;

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(',').map(email => ({ email: email.trim() })),
    _user: req.user.id,
    dateSent: Date.now()
  });
  const mailer = new Mailer(survey, surveyTemplate(survey));

  try{
    await mailer.send();
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();

    res.send(user);
  } catch(err){
    res.status(422).send(err);
  }
});




module.exports = router;