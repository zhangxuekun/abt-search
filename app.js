const path = require("path");
const express = require("express");
const ForgeSDK = require('@arcblock/forge-sdk');

const app =  express();
const router = new express.Router();

app.use(router);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Connect to multi endpoints
ForgeSDK.connect('https://zinc.abtnetwork.io/api', { name: 'zinc' });

app.use('/',express.static(path.join(__dirname,".",'build')));
app.use('/',express.static(path.join(__dirname,".",'static')));
app.post("/search", function (req, res) {

  console.log(req.body); 
  res.send('test');
    
});
//引入route模块
// address: "z1UzczwhjAxq1qCr2aJVw5A6Bnspo6MohwA
// hash: "DB740C2E18A3EAB4B2FD5938CE6E3964D96309CC1EADD5FEE3E32A8D40EC86D9"
app.get("/search", function (req, res) {
  const keyword =req.query.keyword||"z1UzczwhjAxq1qCr2aJVw5A6Bnspo6MohwA";
    console.log(keyword);
    const result ={getAccountState:null,getTx:null}
    ForgeSDK.getAccountState({ address: keyword })
    .then( data => {
      //  console.log(data);
       result.getAccountState=data;
        ForgeSDK.getTx({
          hash: keyword
        }).then( data1 => {
          // console.log(data1);
          result.getTx=data1;
          res.send(JSON.stringify(result));

        });
       
      // res.send(JSON.stringify(data));
    })
    .catch((e) => {
      console.info(e.message);
      
    });
      


});

const PORT = process.env.BLOCKLET_PORT|| 3001;
app.listen(PORT);