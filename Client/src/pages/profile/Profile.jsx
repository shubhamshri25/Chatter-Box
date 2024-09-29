import { useAppStore } from "@/store";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { ADD_PROFILE_IMAGE, UPDATE_PROFILE } from "@/utils/constants";

const Profile = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    }
  }, [userInfo]);

  // validating the profile
  const valiDateProfile = () => {
    if (!firstName) {
      toast.error("First Name is required");
      return false;
    }
    if (!lastName) {
      toast.error("Last Name is required");
      return false;
    }
    return true;
  };

  // save the changes to profile
  const saveChanges = async () => {
    if (valiDateProfile()) {
      try {
        const response = await apiClient.put(
          UPDATE_PROFILE,
          {
            firstName,
            lastName,
            color: selectedColor,
          },
          { withCredentials: true }
        );

        if (response.status === 200 && response.data) {
          setUserInfo(response.data);
          toast.success("Profile updated successfully");
          navigate("/chat");
        } else {
          toast.error("Failed to update profile");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };

  // navigating the user to chat if profile is setup else throw error
  const handelNavigate = () => {
    if (userInfo.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("Please setup profile to continue");
    }
  };

  // Handles image file change and uploads the image
  const handelImageChange = async (e) => {
    const file = e.target.files[0];
    // console.log({ file });
    if (file) {
      const formData = new FormData();
      formData.append("profile-image", file);

      const response = await apiClient.post(ADD_PROFILE_IMAGE, formData, {
        withCredentials: true,
      });

      // console.log(response.data);

      if (response.status === 200 && response.data.image) {
        setUserInfo({ ...userInfo, image: response.data.image });
        toast.success("Image updated successfully");
      }
    }
  };

  // adding the image
  const handelFileInputClick = () => {
    fileInputRef.current.click();
  };

  const deleteImage = async () => {};

  return (
    <>
      <div className="bg-[#1b1c24] h-[100vh]  flex items-center justify-center flex-col gap-10  ">
        <div className=" flex flex-col gap-10 w-[80vw] md:w-max ">
          <div>
            <IoArrowBack
              className="text-4xl lg:text-6xl text-white text-opacity-90 cursor-pointer "
              onClick={handelNavigate}
            />
          </div>
          <div className="grid grid-cols-2">
            <div
              className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center "
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden ">
                {image ? (
                  <AvatarImage
                    src={image}
                    alt="profile"
                    className="object-cover w-full h-full bg-black "
                  />
                ) : (
                  <div
                    className={` uppercase h-32 w-32 md:h-48 md:w-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                      selectedColor
                    )} `}
                  >
                    {firstName
                      ? firstName.split("").shift()
                      : userInfo.email.split("").shift()}
                  </div>
                )}
              </Avatar>
              {hovered && (
                <div
                  className=" absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full cursor-pointer "
                  onClick={image ? deleteImage : handelFileInputClick}
                >
                  {image ? (
                    <FaTrash className="text-white text-3xl cursor-pointer " />
                  ) : (
                    <FaPlus className="text-white text-3xl cursor-pointer" />
                  )}
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handelImageChange}
                name="profile-image"
                accept=".png, .jpg .svg, .jpeg, .webp"
              />
            </div>
            <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
              <div className="w-full  ">
                <Input
                  placeholder="Email "
                  type="email"
                  disabled
                  value={userInfo.email}
                  className="rounded-lg p-6 bg-[#2c2e3b] border-none "
                />
              </div>
              <div className="w-full  ">
                <Input
                  placeholder="First Name "
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="rounded-lg p-6 bg-[#2c2e3b] border-none "
                />
              </div>
              <div className="w-full  ">
                <Input
                  placeholder="Last Name "
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="rounded-lg p-6 bg-[#2c2e3b] border-none "
                />
              </div>
              <div className="w-full flex gap-5  ">
                {colors.map((color, index) => (
                  <div
                    className={`${color} h-8 w-8 rounded-full transition-all duration-300 cursor-pointer ${
                      selectedColor === index
                        ? "outline outline-2 outline-white/50"
                        : ""
                    }`}
                    key={index}
                    onClick={() => setSelectedColor(index)}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full">
            <Button
              className="w-full h-16 bg-purple-700 hover:bg-purple-900 transition-all duration-300 "
              onClick={saveChanges}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
