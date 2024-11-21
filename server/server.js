const express = require("express");
const db = require('./db');
const app = express();
const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(express.json());

app.get("/api", (req, res) => {
    res.json({"fruits": [["AMZN", "Buy", "1 morbillion"], ["MSFT", "Sell", "three"]] });
});

app.get('/transactions', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM transaction');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/transactionSearch', async (req, res) => {
    const { searchedTicker, bsFilter } = req.query;

    let query = 'SELECT * FROM transaction WHERE 1=1';
    let params = [];

    if (searchedTicker) {
        query += ' AND ticker_symbol = ?';
        params.push(searchedTicker);
    }

    if (bsFilter === 'Buy') {
        query += ' AND transaction_type = "BUY"';
    } else if (bsFilter === 'Sell') {
        query += ' AND transaction_type = "SELL"';
    }

    try {
        const [rows] = await db.query(query, params);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: error.message });
    }
});


app.listen(8080, () => {
    console.log("Server started on port 8080");
});

