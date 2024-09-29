import { useContext, useState } from "react";
import { createContext } from 'react';

export const MenuContext = createContext();

export const useMenuContext = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error('useMenuContext must be used within a MenuProvider');
    }
    return context;
};

export const MenuProvider = ({ children }) => {
    const [surveyDiv,setSurveyDiv] = useState("guide");
    const [surveyTitle,setSurveyTitle] = useState("");

    console.log("surveyDiv",surveyDiv);
    
    const menuEnum = {
        GUIDE : "0. 가이드",
        BASE : "1. 기본정보",
        BASE_AGE : "1) 나이/물가",
        BASE_SALARY : "2) 소득",
        BASE_CONSUMPTION : "3) 소비",
        BASE_HOUSE : "5) 집",
        BASE_CAR : "6) 자동차",
        BASE_BALANCE : "4) 잔액",
        BASE_ASSET : "7) 누적자산",
        ADD : "2. 추가정보",
        ADD_MARRY : "8) 결혼",
        ADD_BABY : "9) 아기",
        ADD_HOUSE : "11) 집",
        ADD_CAR : "10) 자동차",
        ADD_RETIRE : "12) 재취업",
        ADD_PARENT : "13) 부모님 부양",
        ADD_LOTTO : "14) 복권"
    }
    

    const setSurveyDivition = (div) => {
        if(surveyDiv === div){
            setSurveyDiv("");
            setSurveyTitle("");
        }
        else{
            setSurveyDiv(div);
            changeSurveyTitle(div);
        }
    };

    const changeSurveyTitle = (div) => {
        const surveyTitle
            = div==="guide"?menuEnum.GUIDE
            :div==="age"?menuEnum.BASE + " 〉 " + menuEnum.BASE_AGE
            :div==="salary"?menuEnum.BASE + " 〉 " + menuEnum.BASE_SALARY
            :div==="consumption"?menuEnum.BASE + " 〉 " + menuEnum.BASE_CONSUMPTION
            :div==="balance"?menuEnum.BASE + " 〉 " + menuEnum.BASE_BALANCE
            :div==="house"?menuEnum.BASE + " 〉 " + menuEnum.BASE_HOUSE
            :div==="car"?menuEnum.BASE + " 〉 " + menuEnum.BASE_CAR
            :div==="asset"?menuEnum.BASE + " 〉 " + menuEnum.BASE_ASSET
            :div==="marry"?menuEnum.ADD + " 〉 " + menuEnum.ADD_MARRY
            :div==="baby"?menuEnum.ADD + " 〉 " + menuEnum.ADD_BABY
            :div==="house2"?menuEnum.ADD + " 〉 " + menuEnum.ADD_HOUSE
            :div==="car2"?menuEnum.ADD + " 〉 " + menuEnum.ADD_CAR
            :div==="retire"?menuEnum.ADD + " 〉 " + menuEnum.ADD_RETIRE
            :div==="parent"?menuEnum.ADD + " 〉 " + menuEnum.ADD_PARENT
            :div==="lotto"?menuEnum.ADD + " 〉 " + menuEnum.ADD_LOTTO
            :"";
        setSurveyTitle(surveyTitle);
    }

    return (
        <MenuContext.Provider value={{surveyDiv, setSurveyDiv, surveyTitle, setSurveyTitle, 
                                        menuEnum, setSurveyDivition}}>
            {children}
        </MenuContext.Provider>
    );
}