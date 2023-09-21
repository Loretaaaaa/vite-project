import axios from "axios";
import { BASE_URL } from "./index";

const token = 'Bearer ce61d5677a4016fd4cd205c86026ff8a39876d3c48e0f882b8b25ef96465a63379821bb30cecc4998104def6dcb5322527864f34c795f097ca0fafcfbf58d1e889c1ab048ca6a667a877297f1af06101ab9998f5af72638791a032373c37004b5f80397a86ff3561bd2bc3f8ba949f86f8fb5e7da75c46fa85faff052690a327';

export const getTasks = async () => {
    try {
        const { data } = await axios.get(`${BASE_URL}/tasks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        throw new Error ('Failed to fetch tasks');

    }
};
