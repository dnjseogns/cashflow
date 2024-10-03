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
    
    const menuEnum = {
        GUIDE : "0. 가이드",
        BASE : "1. 기본정보",
        BASE_AGE : "1) 나이/물가",
        BASE2 : "2. 자산",
        BASE_HOUSE : "2) 집",
        BASE_CAR : "3) 자동차",
        BASE_ASSET : "4) 자산",
        BASE3 : "3. 수입/지출",
        BASE_SALARY : "5) 수입",
        BASE_CONSUMPTION : "6) 지출",
        ADD : "4. 이벤트",
        ADD_MARRY : "7) 결혼",
        ADD_BABY : "8) 아기",
        ADD_HOUSE : "9) 집",
        ADD_CAR : "10) 자동차",
        ADD_RETIRE : "11) 재취업",
        ADD_PARENT : "12) 부모님 부양",
        ADD_LOTTO : "13) 복권"
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
            :div==="house"?menuEnum.BASE2 + " 〉 " + menuEnum.BASE_HOUSE
            :div==="car"?menuEnum.BASE2 + " 〉 " + menuEnum.BASE_CAR
            :div==="asset"?menuEnum.BASE2 + " 〉 " + menuEnum.BASE_ASSET
            :div==="salary"?menuEnum.BASE3 + " 〉 " + menuEnum.BASE_SALARY
            :div==="consumption"?menuEnum.BASE3 + " 〉 " + menuEnum.BASE_CONSUMPTION
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