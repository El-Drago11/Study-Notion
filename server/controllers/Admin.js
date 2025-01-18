const User = require("../models/User")


exports.getAdminDetails = async (req,res)=>{
	try {
		const adminDetail = await User.findOne({
			accountType:'Admin'
		})
		if(!adminDetail){
			return res.status(400).json({
				success:false,
				message:`Unable to get Admin details check if admin exist in User schema`,
			})
		}else{
			return res.status(200).json({
				success:true,
				data:adminDetail,
			})
		}
	} catch (error) {
		return res.status(500).json({
			success:false,
			message:error.message,
		})
	}
}