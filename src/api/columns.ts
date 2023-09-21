import axios from "axios";
import { BASE_URL, token } from "./index";



export const getColumns = async () => {
    try {
        const { data } = await axios.get(`${BASE_URL}/columns`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data[0];
    } catch (error) {
        throw new Error ('Failed to fetch columns');

    }
};
