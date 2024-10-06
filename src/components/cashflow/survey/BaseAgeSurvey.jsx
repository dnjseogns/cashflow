import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { numRound } from "@/utils/util";
import Mapping from '@/components/common/Mapping.jsx';
import { isValueExist, expCheckInt, expCheckDouble } from '@/utils/util.js';

//나이
function BaseAgeSurvey({completeBtnClickCnt, commonCompleteLogic}){
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;

    const age = surveyData.base?.age ?? 22;
    const indexInflation = surveyData.base?.indexInflation ?? 3.5;
    const marryYn = surveyData?.base?.marryYn ?? "N";

    const surveyOnChange = (e, div) => {
        if(div==="age"){
            const ret = expCheckInt(e.target.value, 0, 100);
            if(ret === null){return;}
            else{ surveyData.base.age = ret; }
        } else if(div==="indexInflation"){
            const ret = expCheckDouble(e.target.value, 0, 100, 5);
            if(ret === null){return;}
            else{surveyData.base.indexInflation = ret;}
        } else if(div==="marryYn"){
            surveyData.base.marryYn = e.target.value;
        }
        
        dispatch(SvSave(surveyData));
    };

    useEffectNoMount(()=>{
        surveyData.base.age = age;
        surveyData.base.indexInflation = indexInflation;

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return(
    <Fragment>
        <div>
            <p className="question">(1) 만 나이를 입력해주세요.</p>
            <p>- <Mapping txt="ⓐ"/> : <input className='btn1' value={age} onChange={(e)=>{surveyOnChange(e,"age")}}/> 세</p>
        </div>
        <div>
            <p className="question">(2) 시뮬레이션 물가상승률을 입력해주세요.</p>
            <p>- <Mapping txt="ⓑ"/> : <input className='btn1' value={indexInflation} onChange={(e)=>{surveyOnChange(e,"indexInflation")}}/>%</p>
            <p className='note'>※ 2000년 ~ 2023년 평균 물가상승률은 약 3.5%입니다.(통계청 소비자물가지수 참고)</p>
        </div>
        <div>
            <p className="question">(3) 기혼자이신가요?</p>
            <p className="radio-wrap">
                <input type="radio" name="marryYn" id="marryYn_N" value="N" checked={marryYn==="N"?true:false} onChange={(e)=>{surveyOnChange(e,"marryYn")}}/><label htmlFor="marryYn_N">아니오</label>
                <input type="radio" name="marryYn" id="marryYn_Y" value="Y" checked={marryYn==="Y"?true:false} onChange={(e)=>{surveyOnChange(e,"marryYn")}}/><label htmlFor="marryYn_Y">예</label>
            </p>
            {marryYn === "Y" ? <p className='note'>※ 부부합산 자산 및 수입/지출을 입력해주시길 바랍니다.</p>:null}
        </div>
    </Fragment>);
}
export default BaseAgeSurvey;