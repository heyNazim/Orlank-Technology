import { comparePassword, hashpassword } from "../helpers/userHelper.js";
import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken'



export const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(200).send({
                success: false,
                message: "Please add all fields"
            })
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "User already exists"
            })
        }

        const hashedPassword = await hashpassword(password)
        
        const user = await new userModel({ name, email, password: hashedPassword }).save();
        res.status(201).send({
            success: true,
            message: "New User created",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something Went Wrong",
            error
        });
    }
}

export const userlogin = async (req, res) => {
    try {
     const {email, password} = req.body;
if(!email || !password){
    return res.status(200).send({
        success: false,
        message: "Please add all fields"
    })
}

// const not existingemail 
const user = await userModel.findOne({email})
if(!user){
    return res.status(200).send({
        success: false,
        message: "User does not exist"
    })
}

const match = await comparePassword(password, user.password)
if(!match){
    return res.status(200).send({
        success: false,
        message: "Invalid Password"
    })
}


    //   token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET,{
        expiresIn: "7d",
    });
    res.status(200).send({
        success:true,
        message:"User Logged In Successfully",
        user:{
            name:user.name,
            email:user.email,
             password:user.password,
             role: user.role,
             _id: user._id,
            },
         token,
    });


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something Went Wrong",
            error
        })
    }
}

  export const getuserTask = async (req,res)=>{
    try {
        const {userid} = req.headers
        const alltask = await taskModel.find({ assignedTo: { $in: userid }});
                  if(alltask){
            res.status(200).send({
                success: true,
                message:`Total no of tasks is ${alltask.length}`,
                alltask
            })
        }
    } catch (error) {
       res.status(500).send({
        success: false,
        message: "Something went wrong",
        error
       }) 
    }
  };

  export const usertaskStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updateTask = await taskModel.findByIdAndUpdate(id, { status }, { new: true });
  
      if (!updateTask) {
        return res.status(404).send({
          success: false,
          message: "Task not found",
        });
      }
  
      res.status(200).send({
        success: true,
        message: "Task updated successfully",
        updateTask,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };
  
  