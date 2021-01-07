const {Client, AccountId, PrivateKey, TopicCreateTransaction, TopicMessageSubmitTransaction, TopicMessageQuery} =require('@hashgraph/sdk')
// const auth = require('../controllers/auth')
require("dotenv").config();

exports.getPublicDid = async (topicId, hash,issuerDid,client)=>{
    return new Promise(async(resolve, reject) => {
        console.log("entered in did han")
        let topicSubscriber
        let count=0

        
      
        
        console.log(topicId)
       topicSubscriber= await new TopicMessageQuery().setTopicId(topicId).setStartTime(0).subscribe(client,(message) =>{ 
                // console.log('Subscribed',Buffer.from(message.contents,'utf-8').toString())

                let msgValue= Buffer.from(message.contents,'utf-8').toString()
                if(JSON.parse(msgValue).message.did.toString()===issuerDid.toString()&& JSON.parse(msgValue).message.operation.toString()==="create" ){
                    count =count+1
                    resolve(issuerDid)
                }
            
     },(error)=>{
         console.log(error)
         res.send(error)
     }
     
     );


    setTimeout(()=>{   
       
        topicSubscriber.unsubscribe();
        if(count==0){ 
            console.log("working in did")
            reject("invalid")
     }
     }, 5000);
   
     


    })


}