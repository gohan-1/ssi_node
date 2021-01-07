const {Client, AccountId, PrivateKey, TopicCreateTransaction, TopicMessageSubmitTransaction, TopicMessageQuery} =require('@hashgraph/sdk')
const auth = require('../controllers/auth')
require("dotenv").config();

const didController = require("../controllers/didFinder")

const privateKey = PrivateKey.fromString(process.env.HEDERA_ACCOUNT_PRIVATE_KEY);
const accountId = AccountId.fromString(process.env.HEDERA_ACCOUNT_ACCOUNT_ID);
const mirrorNodeAddress =  process.env.MIRROR_NODE_IP_ADDRESS;

const clientConfiguration = {
    network: 'testnet',
    mirrorNetwork: mirrorNodeAddress
};

const client = Client.fromConfig(clientConfiguration);
client.setOperator(accountId,privateKey);


module.exports = (app) => {

    app.get("/api/auth", async(req, res)=>{
        try{
            let topicId = req.query.topicId;
            let hash =req.query.hash;
            let didTopicId= req.query.didTopicId;
            let issuerDid =req.query.issuerDid

            console.log(didTopicId    +  issuerDid)
            let did= await didController.getPublicDid(didTopicId,hash,issuerDid,client)
            console.log("2")
            console.log(did)
            if(did){
                let authd= await auth.verify(topicId,hash,client);
                    console.log(auth+"3")
                if(authd=="valid"){
                    resBody={
                        "status":"valid",
                        "issuerDid":did
                    }
                        res.send(resBody)
                }
                else{
                    console.log("testing")
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
            }
        
        
    })
}
//     app.get("/api/verifier", async(req, res)=>{
//         let count =0
//         console.log(global.messageArray.length)

//         let topicId = req.query.topicId;
//             let hash =req.query.hash;
//             let didTopicId= req.query.didTopicId;
//             let issuerDid =req.query.issuerDid

//             console.log(didTopicId    +  issuerDid)
            
//             let did= await didController.getPublicDid(didTopicId,hash,issuerDid,client)
     
//             console.log(did)

            

//             for (let i=0;i<3;i++){
//                 if(JSON.parse(global.messageArray[i]).message.credentialHash.toString()===hash.toString()&& JSON.parse(msgValue).message.operation.toString()==="issue" ){
//                     count=count+1
//                     resBody={
//                         "status":"valid",
//                         "issuerDid":"did"
//                     }
                        
//                         res.send(resBody)
//                     }
//             }

//             if (count==0){
//                 console.log("error if else")
//                 resBody={
//                     "status":"Invalid",
//                     "issuerDid":null
//                 }
//                 res.send(resBody)

//             }
//             // }
           
//     })
// }