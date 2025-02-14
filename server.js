import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const apiKey = '';
const API_URL = `https://v6.exchangerate-api.com/v6/${apiKey}`;
let codes;

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(API_URL + '/codes');
        codes = response.data.supported_codes
        res.render('index.ejs', { codes: codes });
    } catch (error) {
        console.log(error.response.error-type)
    }  
}); 
 
app.post('/submit', async (req, res) => {
    const base = req.body.base;
    const target = req.body.target;
    const amount = req.body.amount
    try {
        const response = await axios.get(API_URL + `/pair/${base}/${target}/${amount}`);
        console.log(response.data.conversion_result)
        res.render('index.ejs', 
            { codes: codes, 
                rate: response.data.conversion_rate, 
                result: Number(response.data.conversion_result.toFixed(2)).toLocaleString(), 
                base: base,
                target: target });
    } catch (error) {
        console.log(error.response.message)
    }
});
 
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});