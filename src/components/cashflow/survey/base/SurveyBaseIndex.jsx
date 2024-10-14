import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { numRound } from "@/utils/util";
import Mapping from '@/components/common/Mapping.jsx';
import { isValueExist, expCheckInt, expCheckDouble } from '@/utils/util.js';

//나이
function SurveyBaseIndex({completeBtnClickCnt, commonCompleteLogic}){
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;

    const indexInflation = surveyData.base?.indexInflation ?? "3.0";
    const bankInterest = surveyData.base?.bankInterest ?? "2.7";
    const loanInterest = surveyData.base?.loanInterest ?? "5.0";
    const realEstateGrouthRate = surveyData.base?.realEstateGrouthRate ?? "4.0";
    // const carDepreciationRate = surveyData.base?.carDepreciationRate ?? "15.0";
    const investIncomeRate = surveyData.base?.investIncomeRate ?? "3.5";

    const dispatchValue = (div, value) => {
        if(value === null){return;}
        else{ surveyData.base[div] = value;}
        dispatch(SvSave(surveyData));
    }
    const surveyOnChange = (e, div) => {
        dispatchValue(div, expCheckDouble(e.target.value, 0, 100, 5));
    };

    useEffectNoMount(()=>{
        surveyData.base.indexInflation = indexInflation;
        surveyData.base.bankInterest = bankInterest;
        surveyData.base.loanInterest = loanInterest;
        surveyData.base.realEstateGrouthRate = realEstateGrouthRate;
        // surveyData.base.carDepreciationRate = carDepreciationRate;
        surveyData.base.investIncomeRate = investIncomeRate;
        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return(
    <Fragment>
        <div>
            <p className="question">(1) 물가상승률을 입력해주세요.</p>
            <p>- <Mapping txt="ⓐ"/> : <input className='btn1' value={indexInflation} onChange={(e)=>{surveyOnChange(e,"indexInflation")}}/>%</p>
            <p className='note'>※ 2000년 ~ 2023년 평균 물가상승률은 약 3.0%입니다.(통계청 소비자물가지수 참고)</p>
        </div>
        <div>
            <p className="question">(2) 예금금리 / 대출금리를 입력해주세요.</p>
            <p>- 예금금리 : <input className='btn1' value={bankInterest} onChange={(e)=>{surveyOnChange(e,"bankInterest")}}/> %</p>
            <p className='note'>※ 2000년 ~ 2023년 평균 기준금리(약 2.5%) 고려할 때, 예금금리는 2.5 ~ 3.0% 사이의 값을 추천합니다.</p>
            <p>- 대출금리 : <input className='btn1' value={loanInterest} onChange={(e)=>{surveyOnChange(e,"loanInterest")}}/> %</p>
            <p className='note'>※ 2000년 ~ 2023년 평균 기준금리(약 2.5%) 고려할 때, 대출금리는 4.0 ~ 6.0% 사이의 값을 추천합니다.</p>
        </div>
        <div>
            <p className="question">(3) 부동산 상승률을 입력해주세요.</p>
            <p>- <input className='btn1' value={realEstateGrouthRate} onChange={(e)=>{surveyOnChange(e,"realEstateGrouthRate")}}/> %</p>
            <p className='note'>※ 2012년 ~ 2024년 전국 주택가격 상승률은 약 4.0%입니다.(한국부동산원 통계 참고)</p>
            <p className='note'>※ 실거주 주택값 상승률 계산에 사용됩니다.</p>
        </div>
        <div>
            <p className="question">(4) 개인 투자수익률을 입력해주세요.</p>
            <p>- <input className='btn1' value={investIncomeRate} onChange={(e)=>{surveyOnChange(e,"investIncomeRate")}}/> %</p>
            <p className='note'>※ 투자대상 : 주식, 금, 코인, 실거주 외 주택</p>
            <p className='note'>※ 아래 내용을 참고하여 작성해주세요.</p>
            <p className='note'>- 저축만 할 경우 : {bankInterest}%</p>
            <p className='note'>- 주식 배당,금 등을 소극적으로 투자하고 있는 경우 : {bankInterest}% ~ {loanInterest}%</p>
            <p className='note'>- 빚투하여 수익 낼 자신이 있는 경우 : {loanInterest}% 이상</p>
        </div>
    </Fragment>);
}
export default SurveyBaseIndex;