import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api.types";
import { SerializedError } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";

type ResType = {
    data: MessageResponse;
} | {
    error: FetchBaseQueryError | SerializedError;
}

export const responseToast = (res:ResType, 
    navigate: NavigateFunction | null,
    url: string
    ) => {
        if("data" in res){
            toast.success(res.data.message);
            console.log('URL: ', url);
            if(navigate) navigate(url);
        }
        else{
            const error = res.error as FetchBaseQueryError;
            const messageResponse = error.data as MessageResponse;
            toast.error(messageResponse.message);
        }
};

export const getLastMonths = () => {
    const currentDate = moment();
    currentDate.date(1);
    const last6Months: string[] = [];
    const last12Months: string[] = [];

    for(let i = 0; i < 6; i++){
        const monthDate = currentDate.clone().subtract(i, "months");
        const monthName = monthDate.format("MMMM");
        last6Months.unshift(monthName);
    }

    for(let i = 0; i < 12; i++){
        const monthDate = currentDate.clone().subtract(i, "months");
        const monthName = monthDate.format("MMMM");
        last12Months.unshift(monthName);
    }

    return {
        last12Months,
        last6Months
    }
};

export const transformImage = (url: string, width = 300) => {
    const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);
    return newUrl;
};

export const formatTimestamp =(timestamp: string) => {
    // Parse the timestamp into a Date object
    const date = new Date(timestamp);
  
    // Extract time components
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    // Extract date components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
  
    // Combine into the desired format
    return {
        time: `${hours}:${minutes}:${seconds}`,
        date: `${day}-${month}-${year}`
    }    
}

export const getOrderNumber = (id: string) => {
    let digits = id.match(/\d+/g)?.join("") || ""; // Extract all digits and join them
    return digits.slice(-3).padStart(3, "0"); // Take the last three digits and pad if necessary
}