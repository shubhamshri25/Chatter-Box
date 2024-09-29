import React, { useState } from "react";
import Victory from "../../assets/victory.svg";
import Background from "../../assets/chat.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

const Auth = () => { 
  const navigate = useNavigate();

  const { setUserInfo } = useAppStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // validating the signUp
  const validateSignUp = () => {
    if (!email.length) {
      toast.error("Email is required");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and ConfirmPassword should be same");
      return false;
    }
    return true;
  };

  // validating the login
  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  //  login functionality
  const handleLogin = async () => {
    if (validateLogin()) {
      try {
        const response = await apiClient.post(
          LOGIN_ROUTE,
          { email, password },
          { withCredentials: true }
        );
        toast.success(response.data.message);
        console.log(response.data.user);
        if (response.data.user.id) {
          setUserInfo(response.data.user);
          if (response.data.user.profileSetup) {
            navigate("/chat");
          } else {
            navigate("/profile");
          }
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message);
      }
    }
  };

  // signUp functionality
  const handleSignup = async () => {
    if (validateSignUp()) {
      // alert("done");
      try {
        const response = await apiClient.post(
          SIGNUP_ROUTE,
          { email, password },
          { withCredentials: true }
        );
        toast.success(response.data.message);
        setUserInfo(response.data.user);
        if (response.status === 201) {
          navigate("/profile");
        }
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center ">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2 ">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col ">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold lg:text-6xl ">Welcome</h1>
              <img src={Victory} alt="victory emoji" className="h-[100px]" />
            </div>
            <p className="font-medium text-center ">
              Fill in the details to get started with the best chat app!
            </p>
          </div>
          <div className="flex items-center justify-center w-full ">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="bg-transparent rounded-none w-full  ">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>

                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  SignUp
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="flex flex-col mt-10 gap-5 ">
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  className="rounded-full p-6"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  className="rounded-full p-6"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleLogin} className="rounded-full p-6">
                  Login
                </Button>
              </TabsContent>

              <TabsContent value="signup" className="flex flex-col gap-5 ">
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  className="rounded-full p-6"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  className="rounded-full p-6"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  className="rounded-full p-6"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button onClick={handleSignup} className="rounded-full p-6">
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className=" hidden xl:flex justify-center items-center ">
          <img src={Background} alt="login" className="h-[300px] " />
        </div>
      </div>
    </div>
  );
};

export default Auth;
