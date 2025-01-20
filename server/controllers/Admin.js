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

exports.getAllRegisterUserDetail = async(req,res)=>{
	try {
		const registerUsers = await User.find({accountType:'Student'})
		.populate('additionalDetails').exec();
		res.status(200).json({
			success:true,
			message:'All student fetched',
			data: registerUsers
		})
	} catch (error) {
		return res.status(500).json({
			success:false,
			message:error.message
		})
	}
}

exports.getAllRegisterTeacherDetail = async(req,res)=>{
	try {
		const registerUsers = await User.find({accountType:'Instructor'})
		.populate('additionalDetails').exec();
		res.status(200).json({
			success:true,
			message:'All Teacher profile fetched',
			data: registerUsers
		})
	} catch (error) {
		return res.status(500).json({
			success:false,
			message:error.message
		})
	}
}