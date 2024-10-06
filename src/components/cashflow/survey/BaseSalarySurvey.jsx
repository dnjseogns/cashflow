import { Fragment, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import Mapping from '@/components/common/Mapping.jsx';
import {expCheckInt, toKoreanMoneyUnit} from "@/utils/util.js";

function BaseSalarySurvey({completeBtnClickCnt, commonCompleteLogic}){
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;

    const salaryMonthly = surveyData.base?.salaryMonthly ?? 2000000;
    
    const workYear = surveyData.base?.workYear ?? 1;
    const salaryRiseRate1 = surveyData.base?.salaryRiseRate1 ?? 7;
    const salaryRiseRate25 = surveyData.base?.salaryRiseRate25 ?? 2;
    const retireAge = surveyData.base?.retireAge ?? 55;
    const sideJobMonthly = surveyData.base?.sideJobMonthly ?? 0;
    
    const surveyOnChange = (e, div) => {
        if(div==="salaryMonthly"){
            const ret = expCheckInt(e.target.value, 0, 1000000000);
            if(ret === null){return;}
            else{surveyData.base.salaryMonthly = ret;}
        } else if(div==="workYear"){
            const ret = expCheckInt(e.target.value, 0, 100);
            if(ret === null){return;}
            else{surveyData.base.workYear = ret;}
        } else if(div==="salaryRiseRate1"){
            const ret = expCheckInt(e.target.value, 0, 100);
            if(ret === null){return;}
            else{surveyData.base.salaryRiseRate1 = ret;}
        } else if(div==="salaryRiseRate25"){
            const ret = expCheckInt(e.target.value, 0, 100);
            if(ret === null){return;}
            else{surveyData.base.salaryRiseRate25 = ret;}
        } else if(div === "retireAge"){
            const ret = expCheckInt(e.target.value, 0, 100);
            if(ret === null){return;}
            else{surveyData.base.retireAge = ret;}
        }else if(div === "sideJobMonthly"){
            const ret = expCheckInt(e.target.value, 0, 1000000000);
            if(ret === null){return;}
            else{surveyData.base.sideJobMonthly = ret;}
        }

        dispatch(SvSave(surveyData));
    };

    useEffectNoMount(()=>{
        surveyData.base.salaryMonthly = salaryMonthly;
        surveyData.base.workYear = workYear;
        surveyData.base.salaryRiseRate1 = salaryRiseRate1;
        surveyData.base.salaryRiseRate25 = salaryRiseRate25;
        surveyData.base.retireAge = retireAge;
        surveyData.base.sideJobMonthly = sideJobMonthly;
        dispatch(SvSave(surveyData));

        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return(<Fragment>
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
            <p className='note'>※ 평균 연봉 상승률은 약 7% → 2%으로 25년에 걸쳐 점차 감소합니다.</p>
            <p className='note'>※ 참고사이트 : 임금직무정보시스템(https://www.wage.go.kr/whome/index.do)</p>
        </div>
        <div>
            <p className="question">(4) 은퇴 나이를 입력해주세요.</p>
            <p>- <Mapping txt="ⓑ"/> : <input className='btn1' value={retireAge.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"retireAge")}}/> 세</p>
            <p className='note'>※ 평균 은퇴연령은 55세입니다.</p>
            <p className='note'>※ 퇴직금 계산 : (퇴직 전 3개월 평균 월급) x 연차수</p>
        </div>
        <div>
            <p className="question">(5) 국민연금 수령액을 자동계산합니다.</p>
            <p>- <Mapping txt="ⓒ"/> : <input className='btn1' value={retireAge.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"retireAge")}}/> 세</p>
            <p className='note'>※ 국민연금 예상 수령액 계산 : 소득대체율상수 × (A+B) × (1 + 0.05×n/12) </p>
            <p className='note'>※ 소득대체율상수 : 1.2(1.8 → 1.2로 감소 중)</p>
            <p className='note'>※ A : 연금수급 전 3년간 전체 가입자의 평균소득월액의 평균액을 뜻하는 것으로 매년 국민연금공단에서 발표하고 있습니다.</p>
            <p className='note'>※ B : 가입자 개인의 가입기간 중 기준소득월액의 평균값을 뜻하는 것으로 과거의 기준소득월액은 현재의 소득으로 환산하여 평균을 계산합니다.</p>
            <p className='note'>※ n : 20년 초과한 국민연금 가입 월수.</p>
        </div>
        <div>
            <p className="question">(6) 부업을 하고 계시다면, 입력해주세요.</p>
            <p>- <Mapping txt="ⓓ"/> : 
                월 <input className='btn1' value={sideJobMonthly.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"sideJobMonthly")}}/>원
                <i> ({toKoreanMoneyUnit(sideJobMonthly)})</i>
            </p>
            <p className='note'>※ 모든 소득은 세후로 계산하고 있습니다.</p>
            <p className='note'>※ 부업소득 계산 = 부업소득 x 물가상승률<Mapping txt="(1-ⓑ)"/></p>
        </div>
    </Fragment>);
}
export default BaseSalarySurvey;