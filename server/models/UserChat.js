const mongoose = require('mongoose');

const UserChatSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
    },
    message:{
      type:String,
      require:true  
    }
},{timestamps:true})

module.exports = mongoose.model("userChat",UserChatSchema);