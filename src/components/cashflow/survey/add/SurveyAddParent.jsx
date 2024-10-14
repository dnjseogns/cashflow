import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { numRound } from "@/utils/util";
import Mapping from '@/components/common/Mapping.jsx';
import { isValueExist, expCheckInt, expCheckDouble, toKoreanMoneyUnit } from '@/utils/util.js';
import minusIcon from "@/images/icon_del.png";

const SurveyAddParent = ({completeBtnClickCnt, commonCompleteLogic}) => {
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;

    const parentCareYn = surveyData?.add?.parentCareYn ?? "N";
    const parentCurrentAge = surveyData?.add?.parentCurrentAge ?? 55;
    const parentNursingHomeAge = surveyData?.add?.parentNursingHomeAge ?? 84;
    const parentNursingHomePeriod = surveyData?.add?.parentNursingHomePeriod ?? 5;
    const parentNursingHomePriceMonthly = surveyData?.add?.parentNursingHomePriceMonthly ?? 800000;
    
    const dispatchValue = (div, value) => {
        if(value === null){return;}
        else{ surveyData.add[div] = value;}
    }
    const surveyOnChange = (e, div) => {
        if(div==="parentCareYn"){
            surveyData.add.parentCareYn = e.target.value;
        } else if (div === "parentCurrentAge"){
            dispatchValue(div, expCheckInt(e.target.value, 0, 100));
        } else if (div === "parentNursingHomeAge"){
            dispatchValue(div, expCheckInt(e.target.value, 0, 100));
        } else if (div === "parentNursingHomePeriod"){
            dispatchValue(div, expCheckInt(e.target.value, 0, 15));
        } else if (div === "parentNursingHomePriceMonthly"){
            dispatchValue(div, expCheckInt(e.target.value, 0, 10000000000));
        }
        
        dispatch(SvSave(surveyData));
    };

    useEffectNoMount(()=>{
        if(surveyData.add.parentCareYn === "Y"){
            surveyData.add.parentCareYn = parentCareYn;
            surveyData.add.parentCurrentAge = parentCurrentAge;
            surveyData.add.parentNursingHomeAge = parentNursingHomeAge;
            surveyData.add.parentNursingHomePeriod = parentNursingHomePeriod;
            surveyData.add.parentNursingHomePriceMonthly = parentNursingHomePriceMonthly;
        }else{
            surveyData.add.parentCareYn = parentCareYn;
            surveyData.add.parentCurrentAge = undefined;
            surveyData.add.parentNursingHomeAge = undefined;
            surveyData.add.parentNursingHomePeriod = undefined;
            surveyData.add.parentNursingHomePriceMonthly = undefined;
        }

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return (
        <Fragment>
        <div>
            <p className="question">(1) 부모님 요양원 비용을 추가하시겠습니까?</p>
            <p className="radio-wrap">
                <input type="radio" name="parentCareYn" id="parentCareYn_N" value="N" checked={parentCareYn==="N"?true:false} onChange={(e)=>{surveyOnChange(e,"parentCareYn")}}/><label htmlFor="parentCareYn_N">아니오</label>
                <input type="radio" name="parentCareYn" id="parentCareYn_Y" value="Y" checked={parentCareYn==="Y"?true:false} onChange={(e)=>{surveyOnChange(e,"parentCareYn")}}/><label htmlFor="parentCareYn_Y">예</label>
            </p>
        </div>
        {parentCareYn === "Y"
        ? <Fragment>
        <div>
            <p className="question">(2) 요양 대상 부모님의 정보를 입력해주세요.</p>
            <p>- 현재 연세 : <input className='btn1' value={parentCurrentAge.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"parentCurrentAge")}}/>세</p>
            <p>- 요양원 입원 연세 : <input className='btn1' value={parentNursingHomeAge.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"parentNursingHomeAge")}}/>세</p>
            <p className='note'>※ 평균 요양원 / 요양병원 입원 연세 : 84세</p>
            <p>- 요양 기간 : <input className='btn1' value={parentNursingHomePeriod.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"parentNursingHomePeriod")}}/>년</p>
            <p className='note'>※ 평균 기대 수명 : 남성 85세, 여성 90세</p>
        </div>
        <div>
            <p className="question">(3) 요양원/요양병원 한 달 금액을 입력해주세요.</p>
            <p>- <input className='btn1' value={parentNursingHomePriceMonthly.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"parentNursingHomePriceMonthly")}}/>원<i> ({toKoreanMoneyUnit(parentNursingHomePriceMonthly)})</i></p>
            <p className='note'>※ 장기요양등급을 받을 경우 매달 80만원 이내의 금액</p>
            <p className='note'>※ 고급 요양원 또는 요양병원의 경우 300만원대 이상 금액</p>
        </div>
        </Fragment>
        : null}
        </Fragment>
    )
}
export default SurveyAddParent;