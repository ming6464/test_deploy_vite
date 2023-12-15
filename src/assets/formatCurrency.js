const FormatCurrencyVND = (vnd, check) => {
    const haveTail = check ? false : true;
    const options = { style: 'currency', currency: 'VND', minimumFractionDigits: 0, maximumFractionDigits: 3, useGrouping: true };
    const options1 = { minimumFractionDigits: 0, maximumFractionDigits: 3, useGrouping: true };

    return vnd.toLocaleString('vi-VN', haveTail ? options : options1);
};

export { FormatCurrencyVND }