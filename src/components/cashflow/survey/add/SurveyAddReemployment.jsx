import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { numRound } from "@/utils/util";
import Mapping from '@/components/common/Mapping.jsx';
import { isValueExist, expCheckInt, expCheckDouble, toKoreanMoneyUnit } from '@/utils/util.js';
import minusIcon from "@/images/icon_del.png";

const SurveyAddReemployment = ({completeBtnClickCnt, commonCompleteLogic}) => {
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;

    const reemploymentYn = surveyData?.add?.reemploymentYn ?? "N";
    const reemploymentAge = surveyData?.add?.reemploymentAge ?? 65;
    
    const dispatchValue = (div, value) => {
        if(value === null){return;}
        else{ surveyData.add[div] = value;}
    }
    const surveyOnChange = (e, div) => {
        if(div==="reemploymentYn"){
            surveyData.add.reemploymentYn = e.target.value;
        } else if(div==="reemploymentAge"){
            dispatchValue(div, expCheckInt(e.target.value, 0, 100));
        }
        
        dispatch(SvSave(surveyData));
    };

    useEffectNoMount(()=>{
        if(surveyData.add.reemploymentYn === "Y"){
            surveyData.add.reemploymentYn = reemploymentYn;
            surveyData.add.reemploymentAge = reemploymentAge;
        }else{
            surveyData.add.reemploymentYn = reemploymentYn;
            surveyData.add.reemploymentAge = undefined;
        }

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return (
        <Fragment>
        <div>
            <p className="question">(1) 재취업 하시겠습니까?</p>
            <p className="radio-wrap">
                <input type="radio" name="reemploymentYn" id="reemploymentYn_N" value="N" checked={reemploymentYn==="N"?true:false} onChange={(e)=>{surveyOnChange(e,"reemploymentYn")}}/><label htmlFor="reemploymentYn_N">아니오</label>
                <input type="radio" name="reemploymentYn" id="reemploymentYn_Y" value="Y" checked={reemploymentYn==="Y"?true:false} onChange={(e)=>{surveyOnChange(e,"reemploymentYn")}}/><label htmlFor="reemploymentYn_Y">예</label>
            </p>
        </div>
        {reemploymentYn === "Y"
        ? <Fragment>
            <div>
                <p className="question">(2) 몇 세까지 일하시겠습니까?</p>
                <p>-  <input className='btn1' value={reemploymentAge.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"reemploymentAge")}}/>세</p>
                <p className='note'>※ 재취업 급여 : 퇴직 전 3개월 간 평균 임금의 60%</p>
            </div>
        </Fragment>
        : null}
        </Fragment>
    )
}
export default SurveyAddReemployment;