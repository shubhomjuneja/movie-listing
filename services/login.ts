import axiosInstance from ".";

interface LoginRequest {
  email: string;
  password: string;
}

export async function login({ email, password }: LoginRequest) {
  try {
    const response = await axiosInstance.post("/auth", {
      email,
      password,
    });
    console.debug({email,password})
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
}
