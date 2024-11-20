export const ProjectInfo = async () => {
  try {
    const projectInfoResponse = await fetch(
      `${process.env.NEXT_PUBLIC_PROJECT_URL}/project/${process.env.NEXT_PUBLIC_PROJECT_HASH}/info`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    if (projectInfoResponse.ok) {
      const response = await projectInfoResponse.json();
      return response;
    }
  } catch (e) {
    console.log(e);
  }
};

export const LoginSubmission = async (employeeCode) => {
  // Check if the input is valid
  if (!employeeCode) {
    return {
      success: false,
      message: "Employee code cannot be empty or undefined.",
    };
  }

  try {
    const loginResponse = await fetch(
      `${process.env.NEXT_PUBLIC_PROJECT_URL}/employee/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          project_hash: process.env.NEXT_PUBLIC_PROJECT_HASH,
          code: employeeCode,
        }),
      }
    );

    // Check if the HTTP status code is 2xx
    if (!loginResponse.ok) {
      throw new Error(`Login failed with status: ${loginResponse.status}`);
    }

    // Parse the response JSON
    const response = await loginResponse.json();
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Login Error:", error.message);
    return { success: false, message: error.message };
  }
};

export const FetchDoctors = async (employeeHash) => {
  if (!employeeHash) {
    return {
      success: false,
      message: "Employee code cannot be empty or undefined.",
    };
  }

  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_PROJECT_URL || ""
      }/employee/${employeeHash}/contact/list`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    if (!response.ok) {
      return {
        success: false,
        message: "Failed to fetch doctors.",
      };
    }
    const result = await response.json();
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch doctors.",
    };
  }
};
