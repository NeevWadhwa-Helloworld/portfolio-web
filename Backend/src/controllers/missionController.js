const Donation = require('../models/Donation')

let stripe = null
if (process.env.STRIPE_SECRET_KEY) {
  try {
    stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
  } catch (error) {
    console.warn('Stripe package not installed or STRIPE_SECRET_KEY missing:', error.message)
    stripe = null
  }
}

const getMission = async (req, res) => {
  res.json({
    title: 'Neev Student Helping Trust',
    subtitle: 'A mission-driven student support charity',
    description:
      'Neev Student Helping Trust is a personal NGO focused on supporting students through tuition aid, mentorship, and community-led learning resources. We build trust, empower young learners, and create pathways to long-term success.',
    goals: [
      'Provide scholarship support and academic tools to underprivileged students.',
      'Deliver mentoring, career guidance, and study workshops.',
      'Create a trusted support network for student success and growth.',
    ],
    donationInfo: {
      currency: 'USD',
      minimumAmount: 1,
    },
    donationDisclaimer:
      'Donations are used to fund education, campus resources, mentorship programs, and digital learning access for students in need.',
  })
}

const postDonation = async (req, res) => {
  const { name, email, amount } = req.body

  if (!name || !email || !amount || Number(amount) < 1) {
    return res.status(400).json({ message: 'Please provide name, email, and a valid donation amount.' })
  }

  try {
    const donation = new Donation({
      name,
      email,
      amount: Number(amount),
      gateway: stripe ? 'stripe' : 'mock',
    })

    if (stripe) {
      const successUrl = `${process.env.FRONTEND_URL || 'http://localhost:5175'}/mission?donation=success`
      const cancelUrl = `${process.env.FRONTEND_URL || 'http://localhost:5175'}/mission?donation=cancel`

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Neev Student Helping Trust Donation',
                description: 'Support student education, mentorship, and community resources.',
              },
              unit_amount: Math.round(Number(amount) * 100),
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          donor_name: name,
          donor_email: email,
        },
      })

      donation.paymentUrl = session.url
      donation.status = 'pending'
      await donation.save()

      return res.json({
        message: 'Stripe checkout session created. Redirecting to payment page.',
        paymentUrl: session.url,
      })
    }

    donation.status = 'completed'
    await donation.save()

    return res.json({
      message:
        'Donation recorded successfully. This API supports Stripe if STRIPE_SECRET_KEY is configured. For now, your contribution is registered as a successful mock donation.',
      paymentUrl: null,
    })
  } catch (error) {
    console.error('Donation processing error:', error)
    return res.status(500).json({ message: 'Unable to process donation at this time.' })
  }
}

module.exports = {
  getMission,
  postDonation,
}
