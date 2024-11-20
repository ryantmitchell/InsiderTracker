const express = require("express");
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

app.listen(8080, () => {
    console.log("Server started on port 8080");
});

