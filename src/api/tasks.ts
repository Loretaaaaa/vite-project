import axios from "axios";
import { BASE_URL, token } from "./index";
import { Id } from "../types";

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

export const addTask = async (columnId: Id, title: string) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/tasks`,
      {
        title,
        column: columnId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error("Failed to add task");
  }
};

export const removeTask = async (taskId: Id) => {
  try {
    await axios.delete(`${BASE_URL}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("Failed to delete task");
  }
};

export const editTask = async (taskId: Id, title: string) => {
  try {
    await axios.put(
      `${BASE_URL}/tasks/${taskId}`,
      {
        title,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw new Error("Failed to delete task");
  }
};
