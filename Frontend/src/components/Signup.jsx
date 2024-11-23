/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {Input} from "./ui/input"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
// import { useSelector } from "react-redux";


const Signup = () => {
    const [input, setinput] = useState({
        username:"",
        email:"",
        password:""
    })
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    
    // const user = useSelector(store => store.auth);
    // useEffect(()=>{
    //   if(user){
    //     navigate("/")
    //   }
    // },[])

    const changeEventHandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value });
    }

    const signupHandler = async (e) => {
        e.preventDefault();
        console.log(input);
        
        try {
            setloading(true);
            const res = await axios.post('http://localhost:8000/api/v1/user/register', input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
                setinput({
                    username: "",
                    email: "",
                    password: ""
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            
        }finally{
            setloading(false);
        }
    }
    


  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form action="" onSubmit={signupHandler}  className="shadow-lg  flex flex-col gap-5 p-8">
        <div className="my-4 flex flex-col justify-center items-center gap-5">
          <h1 className="text-center font-bold text-xl"><img src="/logos.png" alt="" className="h-20 w-50"/></h1>
          <p className="text-sm text-center">
            Signup to see photos & videos from your friends
          </p>
        </div>

        <div>
          <span className="font-medium">Username</span>
          <Input
            type="text"
            name="username"
            value={input.username}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent mt-2"
          />
        </div>

        <div>
          <span className="font-medium">Email</span>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent mt-2"
          />
        </div>

        <div>
          <span className="font-medium">Password</span>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent mt-2"
          />
        </div>


        {
            loading ? (
                <Button > 
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> PLease Wait
                </Button>
            ) : (
                <Button type="submit">Signup</Button>
            )
        }


        <span className='text-center flex flex-col gap-2'>Already have an account? <Link to={"/login"}> <Button>Login</Button> </Link> </span>
         
      </form>
    </div>
  );
};

export default Signup;
