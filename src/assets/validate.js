const nameRegex = /^[a-zA-Z\s'À-ỹ]+$/;
const PhoneNumberRegex = /^0(?:[3-9]\d{8}|1\d{9})$/;

export const CheckNameRegex = (text) => {
    return nameRegex.test(text);
}

export const CheckPhoneNumberRegex = (text) => {
    return PhoneNumberRegex.test(text);
}

export const CheckUserNameRegex = (text) => {

    // Kiểm tra xem ký tự đầu tiên có phải là chữ số
    const startsWithDigit = /^\d/.test(text);

    // Kiểm tra 
    const check = /^[a-zA-Z0-9]+$/.test(text);

    // Trả về kết quả kiểm tra
    return !startsWithDigit && check;
};



