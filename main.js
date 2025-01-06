import express from 'express';
import fs from 'fs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('frontend'));

dotenv.config();

app.post('/search', async (req, res) =>
{
    try
    {
        const query = req.body.query;

        const baseUrl = 'https://customsearch.googleapis.com/customsearch/v1';

        const params = {
            q: query,
            key: process.env.GOOGLE_API_KEY,
            cx: process.env.SEARCH_ENGINE_ID
        };

        const urlParams = new URLSearchParams(params).toString();
        const url = `${baseUrl}?${urlParams}`;

        const response = await fetch(url);
        const data = await response.json();

        const outputDir = path.resolve('search_results');
        if (!fs.existsSync(outputDir))
        {
            fs.mkdirSync(outputDir);
        }

        const timestamp = Date.now();
        const filePath = path.join(outputDir, `search_result_${timestamp}.txt`);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        res.json({ result: data.items });
    } catch (error)
    {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000);
