import { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import { numRound } from "@/utils/util";
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';

export const useCashflowTableData = () => {
    //redux
    const dispatch = useDispatch();
    const surveyDataOrgin = useSelector((store) => store.Survey).data;
    const cashflowData = useSelector((store) => store.Cashflow).data;

    const [isCompleteStep1, setIsCompleteStep1] = useState(false);
    const [isCompleteStep2, setIsCompleteStep2] = useState(false);
    const [isCompleteStep3, setIsCompleteStep3] = useState(false);

    //survey 값 다시 한 번 세팅
    useEffectNoMount(()=>{
        if(isCompleteStep1){
            return;
        }

        // 기본 변수
        const surveyData = JSON.parse(JSON.stringify(surveyDataOrgin));
        let isCompleted = surveyData.isCompleted;
        let base = surveyData.base;

        

        dispatch(SvSave(surveyData));
        setIsCompleteStep1(true);
    },[surveyDataOrgin]);
    
    //cfRedux 값 다시 한 번 세팅
    useEffectNoMount(()=>{
        if(isCompleteStep2){
            return;
        }else{
            setIsCompleteStep1(false);
        }

        // 기본 변수
        const surveyData = JSON.parse(JSON.stringify(surveyDataOrgin));
        let isCompleted = surveyData.isCompleted;
        let base = surveyData.base;

        // //추가 대출(시스템 계산용)
        // {
        //     base.loan = base.loan.filter((item)=>(item.loanId !== "systemLoan"));
        //     base.loan.push({loanId:"systemLoan", loanName:"추가대출", loanAmount:0, loanInterest: base?.loanInterest ?? 6.0, isReadOnly:true});
        //     base.loan = base.loan.map((item)=> ({...item, "loanAmountStack":-1*item.loanAmount})) // loanAmountStack 컬럼 추가
        //                         .sort((a,b)=>(b.loanInterest - a.loanInterest)); // 대출금리 높은 걸 위로
        // }


        //결과 변수
        let rows = [];
        // //과정 누적 변수
        // let loopCnt = 0;
        // let salaryRiseRateStack = 1.0;
        // let inflationStack = 1.0;
        // let assetSavingStack = base?.currAssetSaving ?? 0;
        // let assetInvestStack = base?.currAssetInvest ?? 0;
        // let curHouse = base?.house?.find((item)=>(item.age === -1));
        // let assetHousePriceStack = curHouse?.amount ?? 0;

        cashflowData.timeline = rows;
        dispatch(CfSave(cashflowData));

        setIsCompleteStep2(true);
    },[isCompleteStep1]);

    useEffectNoMount(()=>{
        // 기본 변수
        const surveyData = JSON.parse(JSON.stringify(surveyDataOrgin));
        let isCompleted = surveyData.isCompleted;
        let base = surveyData.base;

        if(isCompleteStep3){
            return;
        }else{
            //나중에 계산 결과 여기서 통합
            console.log("surveyData",surveyData);
            console.log("cashflowData",cashflowData);
            setIsCompleteStep2(false);
        }

        resetComplete();
    },[isCompleteStep2])

    const resetComplete = () => {
        setIsCompleteStep1(false);
        setIsCompleteStep2(false);
        setIsCompleteStep3(false);
    }
    // //예외처리
    // useEffect(()=>{
    //     let isCompleted = surveyData.isCompleted;
    //     let base = surveyData.base;
    //     savingMonthly
    //     : 
    //     100
    //     sideJobMonthly
    //     : 
    //     0
    // },[surveyDataOrgin])
}