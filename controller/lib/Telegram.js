const { axiosInstance } = require("./axios");

function sendMessage(messageObj, messageText) {
    return axiosInstance.get("sendMessage", {
        chat_id: messageObj.chat.id,
        text: messageText,
    });
}

function handleMessage(messageObj){
    const messageText = messageObj.text || "";

    if(messageText.chart(0) == "/"){
        const command = messageText.substr(1);
        switch(command) {
            case "start":
                //sending wlcm mssage to user
                return sendMessage(
                    messageObj,
                    "Hii! I'm a bot. I can help you to get started"
                );
                default://for Unknown command
                return sendMessage(messageObj, "Hey hi, i don't know this command");
        }
    }
    else{
        //we send mssage back to user
        return sendMessage(messageObj,messageText);
    }
}

module.export = {handleMessage};