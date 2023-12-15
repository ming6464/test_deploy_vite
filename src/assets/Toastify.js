import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
export const showToast = (message, isErr) => {
    Toastify({
        text: message,
        duration: 1500,
        backgroundColor: isErr ? '#e23f33' : "#2c8bd3",
        className: "rounded-tl-md rounded-tr-md rounded-br-md",
        gravity: "top", // `top` or `bottom`
        position: "right",
    }).showToast();
};

export const showToastCustom = (gravity, position, message, isErr) => {
    Toastify({
        text: message,
        duration: 1500,
        backgroundColor: isErr ? '#e23f33' : "#2c8bd3",
        className: "rounded-tl-md rounded-tr-md rounded-br-md",
        gravity: gravity, // `top` or `bottom`
        position: position,
    }).showToast();
};