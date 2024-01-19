import axiosInstance from ".";

interface tokenVerifyRequest {
  token: string;
}

export async function verifyToken({ token }: tokenVerifyRequest) {
  try {
    const response = await axiosInstance.post("/token", {
      token,
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
}
