import { Fragment, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { numRound } from "@/utils/util";

//나이
function BaseAssetSurvey({completeBtnClickCnt, commonCompleteLogic}){
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;
    const base = surveyData.base;

    const [currAssetLoan, setCurrAssetLoan] = useState(base?.currAssetLoan ?? 0);
    const [currAssetSaving, setCurrAssetSaving] = useState(base?.currAssetSaving ?? 0);
    const [currAssetInvest, setCurrAssetInvest] = useState(base?.currAssetInvest ?? 0);

    const [loanInterest, setLoanInterest] = useState(base?.loanInterest ?? "6.0");
    const [bankInterest, setBankInterest] = useState(base?.bankInterest ?? "3.0");
    const [investIncome, setInvestIncome] = useState(base?.investIncome ?? "5.0");

    const surveyOnChange = (e, div) => {
        if(div==="currAssetLoan"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            const valInt = numRound(number, 0); //정수변환

            if(0 <= valInt && valInt <= 100000000){
                setCurrAssetLoan(valInt);
            }else if(100000000 < valInt){
                return;
            }else{
                setCurrAssetLoan(0);
                return;
            }
        }else if(div==="currAssetSaving"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            const valInt = numRound(number, 0); //정수변환

            if(0 <= valInt && valInt <= 100000000){
                setCurrAssetSaving(valInt);
            }else if(100000000 < valInt){
                return;
            }else{
                setCurrAssetSaving(0);
                return;
            }
        }else if(div==="currAssetInvest"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            const valInt = numRound(number, 0); //정수변환

            if(0 <= valInt && valInt <= 100000000){
                setCurrAssetInvest(valInt);
            }else if(100000000 < valInt){
                return;
            }else{
                setCurrAssetInvest(0);
                return;
            }
        }else if(div==="loanInterest"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            if(number.toString().length >= 5){return;}//길이체크

            if(0 <= number && number <= 100){
                setLoanInterest(number);
            }else if(100 < number){
                return;
            }else{
                setLoanInterest(0);
                return;
            }
        }else if(div==="bankInterest"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            if(number.toString().length >= 5){return;}//길이체크

            if(0 <= number && number <= 100){
                setBankInterest(number);
            }else if(100 < number){
                return;
            }else{
                setBankInterest(0);
                return;
            }
        }else if(div==="investIncome"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            if(number.toString().length >= 5){return;}//길이체크

            if(0 <= number && number <= 100){
                setInvestIncome(number);
            }else if(100 < number){
                return;
            }else{
                setInvestIncome(0);
                return;
            }
        }
    };

    useEffectNoMount(()=>{
        base.currAssetLoan = currAssetLoan;
        base.currAssetSaving = currAssetSaving;
        base.currAssetInvest = currAssetInvest;

        base.loanInterest = loanInterest;
        base.bankInterest = bankInterest;
        base.investIncome = investIncome;

        surveyData.base = base;

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return(
    <Fragment>
        <div>
            <p>(1) 현재 자산을 입력해주세요.</p>
            <p>- 대출금 : <input value={currAssetLoan} onChange={(e)=>{surveyOnChange(e,"currAssetLoan")}}/> 만원</p>
            <p>- 예금 : <input value={currAssetSaving} onChange={(e)=>{surveyOnChange(e,"currAssetSaving")}}/> 만원</p>
            <p>- 투자금 : <input value={currAssetInvest} onChange={(e)=>{surveyOnChange(e,"currAssetInvest")}}/> 만원</p>
        </div>
        <div>
            <p>(2) 미래 지표를 입력해주세요.</p>
            <p>- 대출금리 : <input value={loanInterest} onChange={(e)=>{surveyOnChange(e,"loanInterest")}}/> %</p>
            <p className='note'>※ 2000년 ~ 2023년 1금융권 평균 대출금리는 약 6.0%입니다.</p>
            <p>- 예금금리 : <input value={bankInterest} onChange={(e)=>{surveyOnChange(e,"bankInterest")}}/> %</p>
            <p className='note'>※ 2000년 ~ 2023년 1금융권 평균 대출금리는 약 3.0%입니다.</p>
            <p>- 투자수익률 : <input value={investIncome} onChange={(e)=>{surveyOnChange(e,"investIncome")}}/> %</p>
            <p>※ 세계적인 투자자 워런버핏의 평균 수익률이 20%라고 하죠. 투자수익률은 미래 자산에 영향도가 매우 크므로, 현실적인 수치를 입력해주시길 바랍니다.</p>
        </div>
    </Fragment>);
}
export default BaseAssetSurvey;