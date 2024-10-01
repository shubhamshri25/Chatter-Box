import React from "react";

const ContactsContainer = () => {
  return (
    <div className=" relative md:w-[35bw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full  ">
      <div className="pt-3">
        <Logo />
      </div>

      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct messages" />
        </div>
      </div>

      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels " />
        </div>
      </div>
    </div>
  );
};

export default ContactsContainer;

const Logo = () => {
  return (
    <div className="flex p-5 justify-start items-center gap-2">
      <svg
        id="logo-38"
        width="78"
        height="32"
        viewBox="0 0 78 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="16" r="16" fill="#4a90e2" />
        <ellipse cx="45" cy="16" rx="12" ry="16" fill="#357ABD" />
        <circle cx="70" cy="16" r="8" fill="#2E6AA6" />
      </svg>
      <span className="text-3xl font-semibold">Chatter-Box</span>
    </div>
  );
};

const Title = ({ text }) => {
  return (
    <h6 className=" uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm  ">
      {text}
    </h6>
  );
};
