const {Client, AccountId, PrivateKey, TopicCreateTransaction, TopicMessageSubmitTransaction, TopicMessageQuery} =require('@hashgraph/sdk')
// const auth = require('../controllers/auth')

require("dotenv").config();



exports.verify = async (topicId, hash,client)=>{
    return new Promise(async(resolve, reject) => {
        console.log("enter in auth")
        let topicSubscriber
        console.log('Mirror startListening')

        global.messageArray=[]
    

        let count=0
 

        
        console.log(topicId+"   ")



        try{
          
    
             topicSubscriber= await new TopicMessageQuery().setTopicId(topicId).setStartTime(0).setEndTime(Date.now()+3).subscribe(client,(message) =>{ 
                // console.log('Subscribed',Buffer.from(message.contents,'utf-8').toString())

                

                let msgValue= Buffer.from(message.contents,'utf-8').toString()
                global.messageArray.push(msgValue)
                if(JSON.parse(msgValue).message.credentialHash.toString()===hash.toString()&& JSON.parse(msgValue).message.operation.toString()==="issue" ){
                count=count+1
                    resolve("valid")
                }

            
     },(error)=>{
        console.log(error)
     
    }
     
     );
   
    }catch(e){
        console.log('Mirror error')
        console.warn(e)
       
        
    }
    


    setTimeout(() =>{
        topicSubscriber.unsubscribe();
        if(count===0){
            resolve("invalid")
        }
   
        console.log('Unsubscribed');
    },5000);


    function sleep(ms){
        return new Promise((resolve)=>setTimeout(resolve,ms))
    }

    
   
     


    })

}
