import { useContext, useState } from "react";
import { createContext } from 'react';
import { useSelector } from "react-redux";

export const MenuContext = createContext();

export const useMenuContext = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error('useMenuContext must be used within a MenuProvider');
    }
    return context;
};

export const MenuProvider = ({ children }) => {
    const [surveyDiv,setSurveyDiv] = useState("가이드");
    const [surveyTitle,setSurveyTitle] = useState("");
    const surveyData = useSelector((store) => store.Survey).data;

    console.log("surveyDiv",surveyDiv);

    const menuEnum = 
    surveyData.base?.marryYn==="Y"
    ? {
        GUIDE : "가이드",
        BASE : "기본정보",
        BASE_MODE : "1. 싱글/듀오",
        BASE_INDEX : "2. 지수",
        MY : "내 정보",
        MY_AGE : "3. 나이",
        MY_ASSET : "4. 자산",
        MY_INCOME : "5. 수입",
        MY_SPENDING : "6. 지출",
        YOUR : "배우자 정보",
        YOUR_AGE : "7. 나이",
        YOUR_ASSET : "8. 자산",
        YOUR_INCOME : "9. 수입",
        YOUR_SPENDING : "10. 지출",
        ADD : "추가 정보",
        ADD_MARRY : "11. 결혼",
        ADD_BABY : "12. 아기",
        ADD_HOUSE : "13. 집",
        ADD_CAR : "14. 자동차",
        ADD_PARENT : "15. 부모님 부양",
        ADD_RETIRE : "16. 재취업",
        ADD_ETC : "17. 기타 이벤트 추가"
    }
    : {
        GUIDE : "가이드",
        BASE : "기본정보",
        BASE_MODE : "1. 싱글/듀오",
        BASE_INDEX : "2. 지수",
        MY : "내 정보",
        MY_AGE : "3. 나이",
        MY_ASSET : "4. 자산",
        MY_INCOME : "5. 수입",
        MY_SPENDING : "6. 지출",
        YOUR : "배우자 정보",
        YOUR_AGE : "7. 나이",
        YOUR_ASSET : "8. 자산",
        YOUR_INCOME : "9. 수입",
        YOUR_SPENDING : "10. 지출",
        ADD : "추가 정보",
        ADD_MARRY : "11. 결혼",
        ADD_BABY : "12. 아기",
        ADD_HOUSE : "13. 집",
        ADD_CAR : "14. 자동차",
        ADD_PARENT : "15. 부모님 부양",
        ADD_RETIRE : "16. 재취업",
        ADD_ETC : "17. 기타 이벤트 추가"
    };
    
    

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
            = div===menuEnum.GUIDE? menuEnum.GUIDE
            : div===menuEnum.BASE_MODE? menuEnum.BASE + " 〉 " + menuEnum.BASE_MODE
            : div===menuEnum.BASE_INDEX? menuEnum.BASE + " 〉 " + menuEnum.BASE_INDEX
            
            : div===menuEnum.MY_AGE? menuEnum.MY + " 〉 " + menuEnum.MY_AGE
            : div===menuEnum.MY_ASSET? menuEnum.MY + " 〉 " + menuEnum.MY_ASSET
            : div===menuEnum.MY_INCOME? menuEnum.MY + " 〉 " + menuEnum.MY_INCOME
            : div===menuEnum.MY_SPENDING? menuEnum.MY + " 〉 " + menuEnum.MY_SPENDING
            
            : div===menuEnum.YOUR_AGE? menuEnum.YOUR + " 〉 " + menuEnum.YOUR_AGE
            : div===menuEnum.YOUR_ASSET? menuEnum.YOUR + " 〉 " + menuEnum.YOUR_ASSET
            : div===menuEnum.YOUR_INCOME? menuEnum.YOUR + " 〉 " + menuEnum.YOUR_INCOME
            : div===menuEnum.YOUR_SPENDING? menuEnum.YOUR + " 〉 " + menuEnum.YOUR_SPENDING

            : div===menuEnum.ADD_MARRY? menuEnum.ADD + " 〉 " + menuEnum.ADD_MARRY
            : div===menuEnum.ADD_BABY? menuEnum.ADD + " 〉 " + menuEnum.ADD_BABY
            : div===menuEnum.ADD_HOUSE? menuEnum.ADD + " 〉 " + menuEnum.ADD_HOUSE
            : div===menuEnum.ADD_CAR? menuEnum.ADD + " 〉 " + menuEnum.ADD_CAR
            : div===menuEnum.ADD_PARENT? menuEnum.ADD + " 〉 " + menuEnum.ADD_PARENT
            : div===menuEnum.ADD_RETIRE? menuEnum.ADD + " 〉 " + menuEnum.ADD_RETIRE
            : div===menuEnum.ADD_ETC? menuEnum.ADD + " 〉 " + menuEnum.ADD_ETC
            : "";
        setSurveyTitle(surveyTitle);
    }

    return (
        <MenuContext.Provider value={{surveyDiv, setSurveyDiv, surveyTitle, setSurveyTitle, 
                                        menuEnum, setSurveyDivition}}>
            {children}
        </MenuContext.Provider>
    );
}