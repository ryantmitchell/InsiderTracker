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

const sortMappings = {
    "Date": "formatted_date DESC",
    "Ticker": "ticker_symbol ASC",
    "Value": "total_value DESC",
    "Shares": "shares DESC"
};

app.get("/api", (req, res) => {
    res.json({ "fruits": [["AMZN", "Buy", "1 morbillion"], ["MSFT", "Sell", "three"]] });
});

app.get('/transactions', async (req, res) => {
    let sortBy = sortMappings[req.query.sortBy] || 'formatted_date';

    try {
        const [rows] = await db.query(`
            SELECT * 
            FROM (
                SELECT *, STR_TO_DATE(transaction_date, '%d-%b-%Y') AS formatted_date 
                FROM transaction
            ) AS transactions
            WHERE formatted_date > '2024-06-13'
            ORDER BY ${sortBy}
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/transactionSearch', async (req, res) => {
    const { searchedTicker, bsFilter } = req.query;
    let sortBy = sortMappings[req.query.sortBy] || 'formatted_date';

    let query = `
        SELECT * 
        FROM (
            SELECT *, STR_TO_DATE(transaction_date, '%d-%b-%Y') AS formatted_date 
            FROM transaction
        ) AS transactions
        WHERE formatted_date > '2024-06-13'
    `;
    const params = [];

    if (searchedTicker) {
        query += ' AND ticker_symbol = ?';
        params.push(searchedTicker);
    }

    if (bsFilter === 'Buy') {
        query += ' AND transaction_type = "BUY"';
    } else if (bsFilter === 'Sell') {
        query += ' AND transaction_type = "SELL"';
    }

    query += ` ORDER BY ${sortBy}`;

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
