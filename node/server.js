
const express = require("express");
const Moralis = require("moralis").default;
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

const walletRouter = require("../routes/wallet");
app.use('/api', walletRouter);

app.get("/balance", async(req, res)=>{
    try {
        const { query } = req;
        let balance;

        balance = await Moralis.EvmApi.balance.getNativeBalance({
            address : query.address,
            chain : query.chain,
        });
        
        const result = balance.raw;
        return res.status(200).json({result});
    } catch(e){
        console.log(e);
        console.log("sth went wrong");
        return res.status(400).json();
    }
});

Moralis.start({
    apiKey : "SBDs2BIatVrsfGGwfVHvOmQEWNo56Lqi70cIPcT6PJMRO3z3to51YBmbwbE30pzF",
}). then(() => {
    app.listen(port, () => {
        console.log(`Listening for API Calls`);
    });
});