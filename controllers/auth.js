const {Client, AccountId, PrivateKey, TopicCreateTransaction, TopicMessageSubmitTransaction, TopicMessageQuery} =require('@hashgraph/sdk')
// const auth = require('../controllers/auth')

require("dotenv").config();
exports.verify = async (topicId, hash)=>{
    return new Promise(async(resolve, reject) => {

        let count=0
         
        const privateKey = PrivateKey.fromString(process.env.HEDERA_ACCOUNT_PRIVATE_KEY);
        const accountId = AccountId.fromString(process.env.HEDERA_ACCOUNT_ACCOUNT_ID);
        const mirrorNodeAddress =  process.env.MIRROR_NODE_IP_ADDRESS;
    
        const clientConfiguration = {
            network: 'testnet',
            mirrorNetwork: mirrorNodeAddress
        };
    
        const client = Client.fromConfig(clientConfiguration);
        client.setOperator(accountId,privateKey);
    
        // const transaction = new TopicCreateTransaction().setTopicMemo('Hello HCS Tutorial!');
    
        //Sign with the client operator private key and submit the transaction to a Hedera network
        // const txResponse = await transaction.execute(client);
    
        //Request the receipt of the transaction
        // const receipt = await txResponse.getReceipt(client);
    
        //Get the topic ID
        // const newTopicId = receipt.topicId;
    
        // console.log('The new topic ID is ' + newTopicId);
    
        // Subscribe to a Hedera Mirror Node (or multiple!) to get pub-sub messaging over HCS
    
        new TopicMessageQuery().setTopicId(topicId).setStartTime(0).subscribe(client,(message) =>{ 
                console.log('Subscribed',Buffer.from(message.contents,'utf-8').toString())

                let msgValue= Buffer.from(message.contents,'utf-8').toString()
                if(JSON.parse(msgValue).message.credentialHash.toString()===hash.toString()&& JSON.parse(msgValue).message.operation.toString()==="issue" ){
                count=count+1
                    resolve("valid")
                }
            
     }
     
     );
  


    setTimeout(()=>{   
        console.log("working")
        if(count==0){
            resolve("invalid")
     }

     }, 5000);

    
   
     


    })

}
