const express = require("express");
const app = express();

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

app.use(express.static("public"));
app.use(express.json());

let quotes = [];

async function fetchQuotes() {
    try {
        const response = await fetch("https://api.jsonbin.io/v3/b/69a4b479d0ea881f40e594f1/latest", {
            headers: {
                "X-Master-Key": "$2a$10$YA6m3SvHN.hej.s1au2s5OHoqji5w.N4dUOYIC.zVuUCBdP.Qacey"
            }
        });

        const data = await response.json();

        quotes = data.record;

        console.log("Quotes loaded:", quotes);
    } catch (err) {
        console.error("JSONBin fetch error:", err);
    }
}

app.get("/api/quotes", (req, res) => {
    res.json({ quotes });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
    fetchQuotes();
});