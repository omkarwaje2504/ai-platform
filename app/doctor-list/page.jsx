"use client";

import { FetchDoctors } from "@/apis/api";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import Template from "../template";

export default function Home() {
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [projectInfo, setProjectInfo] = useState(null);
  const [contactList, setContactList] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      // Retrieve data from localStorage
      const storedEmployeeDetails = localStorage.getItem("employeeData");
      const storedProjectInfo = localStorage.getItem("projectInfo");

      // Parse and store the data in state
      if (storedEmployeeDetails) {
        setEmployeeDetails(JSON.parse(storedEmployeeDetails));
      }
      if (!storedEmployeeDetails) {
        router.push("/");
      }
      if (storedProjectInfo) {
        setProjectInfo(JSON.parse(storedProjectInfo));
      }

      // If both are present, proceed to fetch doctors
      if (storedEmployeeDetails && storedProjectInfo) {
        const empCode = JSON.parse(storedEmployeeDetails).hash;
        try {
          const result = await FetchDoctors(empCode);
          if (result) {
            setContactList(result.data);
          }
        } catch (error) {
          console.error("Error fetching doctors:", error);
        }
      }
    };

    fetchData();
  }, [router]);

  return (
    <Template>
      <div className="min-h-screen py-6 flex flex-col sm:py-12 z-20 px-4">
        <button
          className="flex items-center justify-end font-medium"
          onClick={() => {
            localStorage.clear();
            router.push("/");
          }}
        >
          <Image
            src="/logout-button.png"
            alt="Logout Icon"
            width={20}
            height={20}
            className="cursor-pointer mr-1"
            onClick={() => {
              localStorage.removeItem("employeeData");
              localStorage.removeItem("projectInfo");
              router.push("/");
            }}
          />{" "}
          Logout
        </button>
        <div
          className="relative py-3 sm:max-w-xl sm:mx-auto mt-4"
          style={{
            zIndex: 1,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform skew-y-3 sm:skew-y-0 rounded-3xl"></div>
          <div className="relative px-4 py-2 bg-white shadow-lg rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div className="flex items-center">
                <div className="w-16">
                  <Image
                    src="/profile.png"
                    alt="MR Profile Image"
                    width={0}
                    height={0}
                    sizes="100ww"
                    className="w-full"
                  />
                </div>
                <div>
                  <h1 className="text-md font-semibold">
                    {employeeDetails?.name}
                  </h1>
                  <p className="text-xs">
                    {employeeDetails?.designation ? (
                      <span className="text-white bg-blue-400 px-2 rounded-full py-0.5">
                        {employeeDetails?.designation}
                      </span>
                    ) : (
                      ""
                    )}{" "}
                    Code: {employeeDetails?.code}
                  </p>
                </div>
              </div>
              <div className="text-center">
                <h2 className="mt-2 font-semibold text-gray-800">
                  Total Doctors Added
                </h2>
                <p className="text-3xl font-semibold text-sky-600">
                  {contactList?.length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 mx-auto relative" style={{ zIndex: 20 }}>
          <button className="font-semibold text-white text-xl px-2 addbutton border-4 border-white rounded-full drop-shadow-lg">
            {projectInfo?.texts?.add_new_button || "Add New Doctor"}
          </button>
        </div>
        <div>
          {contactList?.length <= 0 ? (
            <div className="w-full h-full  flex justify-center items-center">
              <div className="pyramid-loader">
                <div className="wrapper">
                  <span className="side side1"></span>
                  <span className="side side2"></span>
                  <span className="side side3"></span>
                  <span className="side side4"></span>
                  <span className="shadow"></span>
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-y-scroll">
              <h3 className="text-xm border-b pb-1 mt-4 text-gray-500 font-medium">
                Doctor List
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 overflow-y-scroll h-[25rem] md:h-[40rem] pb-20">
                {contactList?.map((contact, index) => (
                  <div key={index} className="items-center justify-between p-2 flex flex-col bg-white border-2 border-gray-200 rounded-2xl">
                    <div className="items-center flex flex-col">
                      <Image src={"/profile.png"} width={80} height={80} />
                      <h4 className="font-semibold text-center leading-4 text-sm">
                        {contact?.name}
                      </h4>
                      <p className="text-xs">{contact?.mobile}</p>
                    </div>

                    <button className="bg-indigo-600 text-white text-sm rounded-lg mt-2 py-1 w-full">
                      Update Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* --------footer-------- */}
        <Image
          src={"/background-element-1.webp"}
          width={0}
          height={0}
          sizes="100vw"
          alt="background element"
          className="h-[100%] w-fit md:w-[100%] absolute top-0 right-0 opacity-55 animate-pulse md:opacity-30"
          style={{
            zIndex: -1,
          }}
        />
      </div>
    </Template>
  );
}
