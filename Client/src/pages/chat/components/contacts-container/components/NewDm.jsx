import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { animationDefaultOptions } from "@/lib/utils";
import Lottie from "react-lottie";

const NewDm = () => {
  const [openNewContactModal, setopenNewContactModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);

  const searchContacts = async (searchTerm) => {};

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-sm hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setopenNewContactModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className=" bg-[#1c1b1e] border-none mb-2 p-3 text-white ">
            Select new contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openNewContactModal} onOpenChange={setopenNewContactModal}>
        <DialogContent className="bg-[#181920] border-none text-white h-[400px] w-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please select a contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="">
            <Input
              placeholder="Search Contacts "
              className="rounded-lg p-6 bg-[#2c2e3b] border-none  "
              onChange={(e) => searchContacts(e.target.value)}
            />
          </div>
          {searchedContacts.length <= 0 && (
            <div className="flex-1 md:bg-[#1c1d25] md:flex mt-5 flex-col justify-center items-center transition-all duration-1000  ">
              <Lottie
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={animationDefaultOptions}
              />
              <div className=" text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all text-center duration-300 ">
                <h3 className=" poppins-medium ">
                  Hi <span className="text-blue-500">!</span> search New
                  <span className="text-blue-500  "> Contact </span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDm;
