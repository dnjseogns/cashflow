import { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import { numRound } from "@/utils/util";
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { useMenuContext } from "./MenuContext";

export const useCashflowTableData = () => {
    //redux
    const dispatch = useDispatch();
    const surveyDataOrgin = useSelector((store) => store.Survey).data;
    const cashflowData = useSelector((store) => store.Cashflow).data;

    const {surveyDiv, setSurveyDiv, surveyTitle, setSurveyTitle, 
        menuEnum, setSurveyDivition} = useMenuContext();
    const [isCompleteStep1, setIsCompleteStep1] = useState(false);
    const [isCompleteStep2, setIsCompleteStep2] = useState(false);
    const [isCompleteStep3, setIsCompleteStep3] = useState(false);

    useEffectNoMount(()=>{
        if(isCompleteStep1 === false){
            try{
                step1();//함수 : survey 값 다시 한 번 세팅
                setIsCompleteStep1(true);
            }catch(err){
                resetComplete();
                throw err;
            }
        }
    },[surveyDataOrgin]);

    useEffectNoMount(()=>{
        if(isCompleteStep1 === true){
            try{
                step2();//다음 함수 : table 데이터 계산
                setIsCompleteStep2(true);
            }catch(err){
                resetComplete();
                throw err;
            }
        }
    },[isCompleteStep1]);

    useEffectNoMount(()=>{
        if(isCompleteStep2 === true){
            try{
                step3();//다음 함수 : table 데이터 계산
                setIsCompleteStep3(true);
            }catch(err){
                resetComplete();
                throw err;
            }
        }
    },[isCompleteStep2]);

    useEffectNoMount(()=>{
        if(isCompleteStep3 === true){
            resetComplete();
        }
    },[isCompleteStep3]);

    const resetComplete = () => {
        setIsCompleteStep1(false);
        setIsCompleteStep2(false);
        setIsCompleteStep3(false);
    }

    //survey 값 다시 한 번 세팅
    const step1 = () => {
        // 기본 변수
        const surveyData = JSON.parse(JSON.stringify(surveyDataOrgin));
        let isCompleted = surveyData.isCompleted;
        let base = surveyData.base;
        let my = surveyData.my;
        let add = surveyData.add;

        {
            my.housePriceOwn = my?.housePriceTotal - my?.housePriceLoan;
        }
        {
            let newLoan = [...my.loan].filter((item)=>{return item.loanId != "carLoan" && item.loanId != "houseLoan"});
            if(my?.housePriceLoan > 0){
                if(my?.livingType == "rent"){
                    newLoan.unshift({loanId:"houseLoan", loanName:"전·월세자금대출금(사전입력 : 2-ⓐ)", loanAmount:my?.housePriceLoan ?? 0, loanInterest:my?.housePriceLoanRate ?? 0, isReadOnly:true});
                }else if(my?.livingType == "own"){
                    newLoan.unshift({loanId:"houseLoan", loanName:"주택담보대출(사전입력 : 2-ⓐ)", loanAmount:my?.housePriceLoan ?? 0, loanInterest:my?.housePriceLoanRate ?? 0, isReadOnly:true});
                }
            }
            if(my?.carLoan > 0){
                newLoan.unshift({loanId:"carLoan", loanName:"자동차 대출(사전입력 : 3-ⓐ)", loanAmount:my?.carLoan ?? 0, loanInterest:my?.carLoanRate ?? 0, isReadOnly:true});
            }

            my.loan = newLoan;
        }
        {
            let newHouse = [...add.house].filter((item)=>{return item.age != -1});
            if(my?.livingType == "rent"){
                newHouse.push({age:-1, price:my?.housePriceOwn, rate:0});
            }else if(my?.livingType == "own"){
                newHouse.push({age:-1, price:my?.housePriceTotal, rate:base?.realEstateGrouthRate});
            }
            add.house = newHouse;
        }
        {
            let newCar = [...add.car].filter((item)=>{return item.age != -1});
            if(my?.carYn == "Y"){
                newCar.push({age:-1, price:my?.housePrice, rate:base?.carDepreciationRate});
            }
            add.car = newCar;
        }


        dispatch(SvSave(surveyData));
    };
    
    //cfRedux 값 다시 한 번 세팅
    const step2 = () => {
        // 기본 변수
        const surveyData = JSON.parse(JSON.stringify(surveyDataOrgin));
        let isCompleted = surveyData.isCompleted;
        let base = surveyData.base;
        let my = surveyData.my;

        //추가 대출(시스템 계산용)
        {
            my.loan = my.loan.filter((item)=>(item.loanId !== "systemLoan"));
            my.loan.push({loanId:"systemLoan", loanName:"추가대출", loanAmount:0, loanInterest: my?.loanInterest ?? 6.0, isReadOnly:true});
            my.loan = my.loan.map((item)=> ({...item, "loanAmountStack":-1*item.loanAmount})) // loanAmountStack 컬럼 추가
                                .sort((a,b)=>(b.loanInterest - a.loanInterest)); // 대출금리 높은 걸 위로
        }

        //결과 변수
        let rows = [];
        // //과정 누적 변수
        let loopCnt = 0;
        let inflationStack = 1.0;
        
        // let salaryRiseRateStack = 1.0;
        // let assetSavingStack = base?.currAssetSaving ?? 0;
        // let assetInvestStack = base?.currAssetInvest ?? 0;
        // let assetHousePriceStack = curHouse?.amount ?? 0;

        for(var i=0; i<=100; i++){
            let row = {};
            //나이 설문 작성 완료 시점부터 table 만들기
            if(!isCompleted?.[menuEnum.BASE_MODE]){ return; }
            //나이보다 적으면 skip
            else if(i < base?.myAge){ continue; }

            if(isCompleted?.[menuEnum.BASE_MODE] === true){
                //나이(myAge)
                row.myAge = i;
                loopCnt++;

                //물가상승률
                if(loopCnt <= 1){
                    inflationStack = 1.0;
                }else{
                    inflationStack = inflationStack * (1 + base.indexInflation/100);
                    inflationStack = numRound(inflationStack, 3);
                }
                row.inflationStack = inflationStack;
            }

            if(isCompleted?.[menuEnum.MY_ASSET] === true){
                //집 소비
                row.houseCost = Math.round((my?.houseCostMonthly ?? 0) * 12 * row.inflationStack) * -1;

                // // 실거주 가격 ★★★여기할 차례★★★
                // const newHouse = my?.house?.find((item)=>(item.age === base.age));
                // if(newHouse){
                //     curHouse = newHouse;
                //     assetHousePriceStack = newHouse.amount;
                // }else{
                //     if(curHouse){
                //         assetHousePriceStack = assetHousePriceStack * (1 + curHouse?.interest/100);
                //     }else{
                //         assetHousePriceStack = null;
                //     }
                // }
                // row.assetHousePriceStack = assetHousePriceStack;
            }

            //결과 쌓기
            rows.push(row);
        }

        cashflowData.timeline = rows;
        dispatch(CfSave(cashflowData));
    };

    const step3 = () => {
        // 기본 변수
        const surveyData = JSON.parse(JSON.stringify(surveyDataOrgin));
        let isCompleted = surveyData.isCompleted;
        let base = surveyData.base;

        console.log("surveyData",surveyData);
        console.log("cashflowData",cashflowData);
    };

}