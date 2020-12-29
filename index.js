const {Client, AccountId, PrivateKey, TopicCreateTransaction, TopicMessageSubmitTransaction, TopicMessageQuery} =require('@hashgraph/sdk')
 
require("dotenv").config();

const hcsMain = async () => {
    const privateKey = PrivateKey.fromString(process.env.HEDERA_ACCOUNT_PRIVATE_KEY);
    const accountId = AccountId.fromString(process.env.HEDERA_ACCOUNT_ACCOUNT_ID);
    const mirrorNodeAddress =  process.env.MIRROR_NODE_IP_ADDRESS;

    const clientConfiguration = {
        network: 'testnet',
        mirrorNetwork: mirrorNodeAddress
    };

    const client = Client.fromConfig(clientConfiguration);
    client.setOperator(accountId,privateKey);

    const transaction = new TopicCreateTransaction().setTopicMemo('Hello HCS Tutorial!');

    //Sign with the client operator private key and submit the transaction to a Hedera network
    const txResponse = await transaction.execute(client);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the topic ID
    const newTopicId = receipt.topicId;

    console.log('The new topic ID is ' + newTopicId);

    // Subscribe to a Hedera Mirror Node (or multiple!) to get pub-sub messaging over HCS

    setTimeout(()=>{
        new TopicMessageQuery().setTopicId("0.0.147464").setStartTime(0).subscribe(client,(message) => console.log('Subscribed',Buffer.from(message.contents,'utf-8').toString()));
    }, 3000);

    // new TopicMessageQuery().setTopicId(newTopicId).subscribe(client,(message) => console.log(message.toString()),(error) => console.log(`Error: ${error.message}`));



    // Build, specify topic ID, and send a new message to HCS

    // const newHCSMessage = await new TopicMessageSubmitTransaction().setTopicId(newTopicId).setMessage('hello future!"').execute(client);
    // const newHCSMessage1 = await new TopicMessageSubmitTransaction().setTopicId(newTopicId).setMessage('this is vishnu').execute(client);




    // Get the receipt of our message to confirm it was successful

    // const hcsMessageReceipt = await newHCSMessage.getReceipt(client);

    // console.log(`Message receipt: ${hcsMessageReceipt}`);
    // console.log(hcsMessageReceipt);



};
hcsMain();