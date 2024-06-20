import axios from "axios"


export const doAuthentication = async (userData, endPoints) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/${endPoints}`, {
            email: userData?.email,
            password: userData?.password
        });
        return res?.data;
    } catch (error) {
        return new Error(error?.message);
    }
}