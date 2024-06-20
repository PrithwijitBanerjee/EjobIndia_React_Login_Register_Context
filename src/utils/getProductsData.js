import axios from "axios"


export const getProductsData = async endPoints => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/${endPoints}`);
        return res?.data?.products;
    } catch (error) {
        throw new Error(error);
    }
} 