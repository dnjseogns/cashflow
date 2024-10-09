import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { numRound } from "@/utils/util";
import Mapping from '@/components/common/Mapping.jsx';
import { isValueExist, expCheckInt, expCheckDouble } from '@/utils/util.js';

//나이
function SurveyBaseMode({completeBtnClickCnt, commonCompleteLogic}){
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;

    const marryYn = surveyData?.base?.marryYn ?? "N";
    const myAge = surveyData?.base?.myAge ?? "25";
    const yourAge = surveyData?.base?.yourAge ?? "25";

    const surveyOnChange = (e, div) => {
        if(div==="marryYn"){
            surveyData.base.marryYn = e.target.value;
        }else if(div==="myAge"){
            surveyData.base.myAge = e.target.value;
        }if(div==="yourAge"){
            surveyData.base.yourAge = e.target.value;
        }
        
        dispatch(SvSave(surveyData));
    };

    useEffectNoMount(()=>{
        if(surveyData?.base?.marryYn === "Y"){
            surveyData.base.marryYn = marryYn;
            surveyData.base.myAge = myAge;
            surveyData.base.yourAge = yourAge;
        }else{
            surveyData.base.marryYn = marryYn;
            surveyData.base.myAge = myAge;
            surveyData.base.yourAge = undefined;
        }
        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return(
    <Fragment>
        <div>
            <p className="question">(1) 기혼자이신가요?</p>
            <p className="radio-wrap">
                <input type="radio" name="marryYn" id="marryYn_N" value="N" checked={marryYn==="N"?true:false} onChange={(e)=>{surveyOnChange(e,"marryYn")}}/><label htmlFor="marryYn_N">아니오(싱글모드)</label>
                <input type="radio" name="marryYn" id="marryYn_Y" value="Y" checked={marryYn==="Y"?true:false} onChange={(e)=>{surveyOnChange(e,"marryYn")}}/><label htmlFor="marryYn_Y">예(듀오모드)</label>
            </p>
        </div>
        <div>
            <p className="question">(2) 본인 나이를 입력해주세요.</p>
            <p>- <Mapping txt="ⓐ"/> : <input className='btn1' value={myAge} onChange={(e)=>{surveyOnChange(e,"myAge")}}/> 세</p>
        </div>
        {marryYn === "Y"
        ? <div>
            <p className="question">(3) 배우자 나이를 입력해주세요.</p>
            <p>- <Mapping txt="ⓐ"/> : <input className='btn1' value={yourAge} onChange={(e)=>{surveyOnChange(e,"yourAge")}}/> 세</p>
        </div>
        : null}
        
    </Fragment>);
}
export default SurveyBaseMode;