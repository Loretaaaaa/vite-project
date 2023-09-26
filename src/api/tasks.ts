import axios from "axios";
import { BASE_URL, token } from "./index";

export const getTasks = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch tasks");
  }
};
