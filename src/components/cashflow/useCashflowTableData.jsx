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




        dispatch(SvSave(surveyData));
    };
    
    //cfRedux 값 다시 한 번 세팅
    const step2 = () => {
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
        let loopCnt = 0;
        // let salaryRiseRateStack = 1.0;
        // let inflationStack = 1.0;
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