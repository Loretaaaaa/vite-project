import axios from "axios";
import { BASE_URL, token } from "./index";
import { Id } from "../types";

export const getColumns = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/columns`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data[0];
  } catch (error) {
    throw new Error("Failed to fetch columns");
  }
};

export const addColumn = async (title: string) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/columns`,
      {
        title,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error("Failed to post column");
  }
};

export const removeColumn = async (id: Id) => {
  try {
    const { data } = await axios.delete(
      `${BASE_URL}/columns/${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error("Failed to delete column");
  }
};
export const editColumn = async (
  id: Id,
  payload: { title?: string; order?: number; task?: Id[] }
) => {
  try {
    const { data } = await axios.put(
      `${BASE_URL}/columns/${id}`,
      {
        title: payload.title,
        order: payload.order,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error("Failed to update column");
  }
};
