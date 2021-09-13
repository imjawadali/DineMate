const stripe = require('stripe')(process.env.STRIPE_KEY)
const uuid = require('uuid').v4

exports.postCharge = async function (amount, source, receipt_email, stripeAccount) {
  try {
    const idempotencyKey = uuid()

    const charge = await stripe.charges.create({
      amount,
      currency: "cad",
      source,
      receipt_email
    }, {
      stripeAccount,
      idempotencyKey
    });

    console.log('charge', charge)

    if (charge) return true
    else return false

  } catch (error) {
    console.log('error', error.message)
    return false
  }
}
