import { Fragment, useEffect, useRef, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { numRound } from "@/utils/util";
import plusIcon from "@/images/icon_add.png";
import minusIcon from "@/images/icon_del.png";
import Mapping from '@/components/common/Mapping.jsx';
import {expCheckInt, expCheckDouble, toKoreanMoneyUnit} from "@/utils/util.js";


function SurveyMyIncome({completeBtnClickCnt, commonCompleteLogic}){
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;




    const salaryMonthly = surveyData.my?.salaryMonthly ?? 2000000;
    const workYear = surveyData.my?.workYear ?? 1;
    const salaryRiseRate1 = surveyData.my?.salaryRiseRate1 ?? 6.5;
    const salaryRiseRate25 = surveyData.my?.salaryRiseRate25 ?? 2.0;
    const retireAge = surveyData.my?.retireAge ?? 55;
    const sideJobMonthly = surveyData.my?.sideJobMonthly ?? 0;

    // const tmpPensionYear = 65 - (surveyData.my?.age - workYear) - 20;
    // const pensionMonthly = Math.round((1.2 * ((salaryMonthly*surveyData.my.over40salaryRate) + 2989237) * (1 + (tmpPensionYear < 0 ? 0 : tmpPensionYear)*0.05))/12);
    const pensionMonthly = surveyData.my?.pensionMonthly ?? 0;



    

    const dispatchValue = (div, value) => {
        if(value === null){return;}
        else{ surveyData.my[div] = value;}
    }
    const surveyOnChange = (e, div) => {
        if(div==="salaryMonthly"){
            dispatchValue(div, expCheckInt(e.target.value, 0, 10000000000));
        } else if(div==="workYear"){
            dispatchValue(div, expCheckInt(e.target.value, 0, 100));
        } else if(div==="salaryRiseRate1"){
            dispatchValue(div, expCheckDouble(e.target.value, 0, 100, 5));
        } else if(div==="salaryRiseRate25"){
            dispatchValue(div, expCheckDouble(e.target.value, 0, 100, 5));
        } else if(div === "retireAge"){
            dispatchValue(div, expCheckInt(e.target.value, 0, 100));
        }else if(div === "sideJobMonthly"){
            dispatchValue(div, expCheckInt(e.target.value, 0, 10000000000));
        }
        
        dispatch(SvSave(surveyData));
    };




    useEffectNoMount(()=>{
        surveyData.my.salaryMonthly = salaryMonthly;
        surveyData.my.workYear = workYear;
        surveyData.my.salaryRiseRate1 = salaryRiseRate1;
        surveyData.my.salaryRiseRate25 = salaryRiseRate25;
        surveyData.my.retireAge = retireAge;
        surveyData.my.pensionMonthly = pensionMonthly;
        surveyData.my.sideJobMonthly = sideJobMonthly;

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);






    return(
        <Fragment>
        <div>
            <p className="question">(1) 현재 세후 월급을 입력해주세요.</p>
            <p>- <Mapping txt="ⓐ"/> : 
                월 <input className='btn1' value={salaryMonthly.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"salaryMonthly")}}/>원
                <i> (연봉 {toKoreanMoneyUnit(salaryMonthly*12)})</i>
            </p>
            <p className='note'>※ 모든 소득은 세후로 계산하고 있습니다.</p>
        </div>
        <div>
            <p className="question">(2) 현재 총 연차수를 입력해주세요.(이직포함)</p>
            <p>- <input className='btn1' value={workYear} onChange={(e)=>{surveyOnChange(e,"workYear")}}/>년차</p>
        </div>
        <div>
            <p className="question">(3) 연차수별 시뮬레이션 연봉상승률을 입력해주세요.</p>
            <p>- 1년차 : <input className='btn1' value={salaryRiseRate1} onChange={(e)=>{surveyOnChange(e,"salaryRiseRate1")}}/>%
            → 25년차 이상 : <input className='btn1' value={salaryRiseRate25} onChange={(e)=>{surveyOnChange(e,"salaryRiseRate25")}}/>%</p>
            <p className='note'>※ 평균 연봉 상승률은 약 6.5% → 2%으로 25년에 걸쳐 점차 감소합니다.</p>
            <p className='note'>※ 참고사이트 : 임금직무정보시스템(https://www.wage.go.kr/whome/index.do)</p>
        </div>
        <div>
            <p className="question">(4) 은퇴 나이를 입력해주세요.</p>
            <p>- <input className='btn1' value={retireAge.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"retireAge")}}/> 세</p>
            <p className='note'>※ 평균 은퇴연령은 55세입니다.</p>
            <p className='note'>※ 퇴직금 계산 : (퇴직 전 3개월 평균 월급) x 연차수</p>
        </div>
        <div>
            <p className="question">(5) 65세 국민연금 추정 수령액을 계산합니다.</p>
            <p>- <Mapping txt="ⓑ"/> : <input className='btn1 readonly' readOnly={true} value={pensionMonthly.toLocaleString('ko-KR')}/>원
                <i> ({toKoreanMoneyUnit(pensionMonthly)})</i>
            </p>
            <p className='note'>※ 국민연금 예상 수령액 계산 : 소득대체율상수 × (A+B) × (1 + 0.05×n/12) </p>
            <p className='note'>※ 소득대체율상수 : 1.2(1.8 → 1.2로 감소 중)</p>
            <p className='note'>※ A : 298만9237원(연금수급 전 3년간 전체 가입자의 평균소득월액의 평균액을 뜻하는 것으로 매년 국민연금공단에서 발표하고 있습니다)</p>
            <p className='note'>※ B : 가입자 개인의 가입기간 중 기준소득월액의 평균값을 뜻하는 것으로 과거의 기준소득월액은 현재의 소득으로 환산하여 평균을 계산합니다.</p>
            <p className='note'>※ n : 20년 초과한 국민연금 가입 월수.</p>
            {/* <p className='note'>※ 국민연금 계산 = 국민연금 x 물가상승률</p> */}
        </div>
        <div>
            <p className="question">(6) 부업을 하고 계시다면, 입력해주세요.</p>
            <p>- <Mapping txt="ⓒ"/> : 
                월 <input className='btn1' value={sideJobMonthly.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"sideJobMonthly")}}/>원
                <i> ({toKoreanMoneyUnit(sideJobMonthly)})</i>
            </p>
            <p className='note'>※ 모든 소득은 세후로 계산하고 있습니다.</p>
            {/* <p className='note'>※ 부업소득 계산 = 부업소득 x 물가상승률</p> */}
        </div>
    </Fragment>);
}
export default SurveyMyIncome;