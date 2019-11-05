const express = require('express')

const app = express()

const records = require('./records')

app.use(express.json())

// Send a GET request to /quotes to READ a list of quotes
app.get('/quotes', async (req, res) => {
  try {
    const quotes = await records.getQuotes()
    return res.json(quotes)
  } catch (err) {
    return res.json({ message: err.message })
  }
})

// Send a GET request to /quotes/:id to READ(view) a quote
app.get('/quotes/:id', async (req, res) => {
  try {
    const quote = await records.getQuote(req.params.id)
    if (quote) return res.json({ message: 'Not found' })

    res.status(404).json()
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

// Send a POST request to /quotes to  CREATE a new quote
app.post('/quotes', async (req, res) => {
  try {
    if (req.body.author && req.body.quote) {
      const quote = await records.createQuote({
        quote: req.body.quote,
        author: req.body.author,
      })
      return res.status(201).json(quote)
    }
    return res.status(400).json({ message: 'Quote and author required' })
  } catch (err) {
    return res.stsatus(500).json({ message: err.message })
  }
})

// Send a PUT request to /quotes/:id to UPDATE (edit) a quote
// Send a DELETE request to /quotes/:id DELETE a quote
// Send a GET request to /quotes/quote/random to READ (view) a random quote

app.listen(3000, () => console.log('Quote API listening on port 3000!'))
