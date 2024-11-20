"use client";

import { LoginSubmission, ProjectInfo } from "@/apis/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import Template from "./template";
import { useRouter } from "next/navigation";

export default function Home() {
  const [projectInfo, setProjectInfo] = useState({});
  const [employee_code, setEmployee_code] = useState("");
  const router = useRouter();
  useEffect(() => {
    ProjectInfo().then((response) => {
      setProjectInfo(response);
      localStorage.setItem("projectInfo", JSON.stringify(response));
    });

    const checkEmployeeLogin = localStorage.getItem("employeeData");
    if (checkEmployeeLogin) {
      router.push("/doctor-list");
    }
  }, [router]);

  const loginHandler = async () => {
    const result = await LoginSubmission(employee_code);
    if (result.success) {
      localStorage.setItem(
        "employeeData",
        JSON.stringify(result.data.employee)
      );
      router.push("/doctor-list");
    }
  };

  return (
    <Template>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 z-20 px-4">
        <div className="flex flex-col items-center mb-16 lg:mb-24">
          <span className="text-sm md:text-md lg:text-lg xl:text-xl font-semibold text-gray-600">
            Welcome to our
          </span>
          <span className="text-3xl md:text-4xl lg:text-5xl font-bold mt-1 text-sky-500">
            AI-Avatar Platform
          </span>
          <span className="text-sm md:text-md lg:text-lg xl:text-xl font-semibold text-gray-600">
            Brought to You by {projectInfo?.company || ""}
          </span>
        </div>
        <div
          className="relative py-3 sm:max-w-xl sm:mx-auto"
          style={{
            zIndex: 1,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 -rotate-6 rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">
                  {projectInfo?.name || "Login Form"}
                </h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autocomplete="off"
                      id="employee_code"
                      name="employee_code"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="employee_code"
                      onChange={(e) => {
                        setEmployee_code(e.target.value);
                      }}
                    />
                    <label
                      for="employee_code"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      {projectInfo?.texts?.employee_code || "Employee Code"}
                    </label>
                  </div>

                  <div className="relative">
                    <button
                      className="bg-cyan-500 text-white rounded-md px-2 py-1"
                      onClick={loginHandler}
                    >
                      {projectInfo.texts?.login_button || "Login"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-20 text-center">
          <p>Powered by</p>
          <p className="text-sm font-medium text-gray-700">PixPro.app</p>
        </div>
        <Image
          src={"/background-element-1.webp"}
          width={0}
          height={0}
          sizes="100vw"
          alt="background element"
          className="h-[100%] w-fit md:w-[100%] absolute top-0 right-0 opacity-55 animate-pulse md:opacity-30"
          style={{
            zIndex: 0,
          }}
        />
      </div>
    </Template>
  );
}
