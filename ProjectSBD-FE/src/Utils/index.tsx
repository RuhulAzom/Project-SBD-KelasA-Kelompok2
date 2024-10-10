import toast from "react-hot-toast";
import Cookies from "js-cookie"
import axios from "axios";
import { Api_Url } from "../env";

export const getDate = (date: any) => {
    const Dates = new Date(date);
    const day = Dates.getDate();
    const month = Dates.getMonth() + 1;
    const year = Dates.getFullYear();
    return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}`;
};

export const getDateString = (date: any) => {
    const Dates = new Date(date);
    const day = Dates.getDate();
    const month = Dates.getMonth();
    const year = Dates.getFullYear();

    const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    return `${day < 10 ? `0${day}` : day} ${monthNames[month]} ${year}`;
};
export const getHours = (date: any) => {
    const Dates = new Date(date);
    const hours = Dates.getHours();
    const minute = Dates.getMinutes();
    return `${hours < 10 ? `0${hours}` : hours}:${minute < 10 ? `0${minute}` : minute}`;
};

export const getError = (error: any, message: string) => {
    if (error?.response?.data.message) {
        if (error?.response?.data.message === "Validation Error") {
            toast.error(`${error?.response?.data.error.errors.nim[0]}`, { duration: 3000 })
        } else {
            toast.error(`${error?.response?.data.message}`, { duration: 3000 })
        }
    } else {
        toast.error(`${message}`, { duration: 3000 })
    }
}
export const token = Cookies.get("token");
export const LogOut = () => {
    Cookies.remove("token")
    window.location.reload()
};
export const getUserData = async () => {
    try {
        const token = Cookies.get("token")
        const res = await axios.get(`${Api_Url}/check-token/${token}`)
        console.log(res)
        if (res.status === 200) {
            return { ...res.data.data };
        } else {
            throw new Error;
        }
    } catch (error) {
        console.log("Token Invalid", error)
        // getError(error, "Your Session is Expired");
        return null;
    }
}