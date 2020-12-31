const {Client, AccountId, PrivateKey, TopicCreateTransaction, TopicMessageSubmitTransaction, TopicMessageQuery} =require('@hashgraph/sdk')
const auth = require('../controllers/auth')
require("dotenv").config();

const didController = require("../controllers/didFinder")

module.exports = (app) => {

    app.get("/api/auth", async(req, res)=>{
        try{
            let topicId = req.query.topicId;
            let hash =req.query.hash;
            let didTopicId= req.query.didTopicId;
            let issuerDid =req.query.issuerDid

            console.log(didTopicId    +  issuerDid)
             console.log("1")   
            let did= await didController.getPublicDid(didTopicId,hash,issuerDid)
            console.log("2")
            console.log(did)
            if(did){
                let authd= await auth.verify(topicId,hash);
                    console.log(auth+"3")
                if(authd=="valid"){
                    resBody={
                        "status":"valid",
                        "issuerDid":did
                    }
                        res.send(resBody)
                }
                else{
                    resBody={
                        "status":"Invalid",
                        "issuerDid":null
                    }
                    res.send(resBody)
                }
            }
            else{
                res.send("no matching did found")
            }
        

            
            
            }catch(e){
                console.log(e)
                resBody={
                    "status":"Invalid",
                    "issuerDid":null
                }
                res.send(resBody)
            }
        
            topicId=null
            hash=null
            didTopicId=null
            issuerDid=null
            did=null
            auth=null
        
    })
}