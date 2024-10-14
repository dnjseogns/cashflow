export const numRound = (num, decimalPoint) => {
    const point = Math.pow(10,decimalPoint);
    return Math.round(num * point) / point;
};

export const isValueExist = (value) => {
    if(value === null || value === undefined || isNaN(value)){
        return false;
    }else{
        return true;
    }
}

export const toKoreanMoneySimpleUnit = (_value) => {
    const value = Math.abs(_value);
    if(value === null || value === undefined || isNaN(value)){return "";}
    else if(value < 10000){return (_value<0 ? "-":"")+value+"원";}
    else if(value < 100000000){
        const man = Math.floor(value / 10000);
        return (_value<0 ? "-":"")+man+"만";
    }
    else{
        const uk = Math.floor(value / 100000000);
        const man = Math.floor((value % 100000000) / 10000);
        return (_value<0 ? "-":"")+uk+"억"+ (man === 0 ? "" : man+"만");
    }
}

export const toKoreanMoneyUnit = (_value) => {
    const value = Math.abs(_value);
    if(value === null || value === undefined || isNaN(value)){return "";}
    else if(value < 10000){return (_value<0 ? "-":"")+value+"원";}
    else if(value < 100000000){
        const man = Math.floor(value / 10000);
        const won = Math.floor(value % 10000);
        return (_value<0 ? "-":"")+man+"만" + (won === 0 ? "" : won) + "원";
    }
    else{
        const uk = Math.floor(value / 100000000);
        const man = Math.floor((value % 100000000) / 10000);
        const won = Math.floor((value % 10000));
        return (_value<0 ? "-":"")+uk+"억"+ (man === 0 ? "" : man+"만") + (won === 0 ? "" : won) +  "원";
    }
}

export const expCheckDouble = (number, minVal, maxVal, maxLength=1) => {
    if(isNaN(number)){return null;} //문자 체크
    if(number.toString().length >= maxLength){return null;}//길이체크

    if(number === 0 || number === ""){
        return 0;
    }
    else if(minVal <= number && number <= maxVal){
        if(/^0\d/.test(number)){
            return Number(number).toString();
        }else{
            return number;
        }
    }else if(maxVal < number){
        return null;
    }else{
        return 0;
    }
}
export const expCheckInt = (value, minVal, maxVal) => {
    let number = value.replaceAll(",",""); //쉼표제거
    if(minVal < 0 && (number==="-" || number==="-0")){return "-0";}
    if(isNaN(number)){return null;} //문자 체크
    number = Math.floor(number); //정수변환

    if(minVal <= number && number <= maxVal){
        return number;
    }else if(maxVal < number){
        // number < minVal ||
        return null;
    }else{
        return 0;
    }
}