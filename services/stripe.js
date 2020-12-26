const stripe = require('stripe')('')

async function postCharge(req, res) {
  try {
    const { amount, source, receipt_email } = req.body

    const charge = await stripe.charges.create({
      amount,
      source,
      receipt_email,
      currency: 'usd'
    })

    if (!charge) res.status(422).json({
      msg: 'Payment Unsuccessful'
    })

    res.status(200).json({
      msg: 'Membership Activated Successfully',
      charge
    })
  } catch (error) {
    res.status(422).json({
      msg: error.message
    })
  }
}

module.exports = postCharge
