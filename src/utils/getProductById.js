import axios from "axios";

export const getProductById = async (endPoints, pId) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/${endPoints}/${pId}`);
        return res?.data;
    } catch (error) {
        throw new Error(error);
    }
}