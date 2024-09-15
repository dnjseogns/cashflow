import { Fragment, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';

function BaseSalarySurvey({completeBtnClickCnt, commonCompleteLogic}){
    const surveyData = useSelector((store) => store.Survey).data;
    const dispatch = useDispatch();

    const [salaryMonthly, setSalaryMonthly] = useState(surveyData.base?.salaryMonthly ?? 200);
    const [workYear, setWorkYear] = useState(surveyData.base?.workYear ?? 1);
    const [salaryRiseRate1, setSalaryRiseRate1] = useState(surveyData.base?.salaryRiseRate1 ?? 7);
    const [salaryRiseRate25, setSalaryRiseRate25] = useState(surveyData.base?.salaryRiseRate25 ?? 2);
    const [sideJobMonthly, setSideJobMonthly] = useState(surveyData.base?.sideJobMonthly ?? 0);
    
    const surveyOnChange = (e, div) => {
        if(div==="salaryMonthly"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            const valInt = Math.floor(number); //정수변환

            if(0 <= valInt && valInt <= 10000){
                setSalaryMonthly(valInt);
            }else if(10000 < valInt){
                return;
            }else{
                setSalaryMonthly(0);
                return;
            }
        } else if(div==="workYear"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            const valInt = Math.floor(number); //정수변환

            if(0 <= valInt && valInt <= 100){
                setWorkYear(valInt);
            }else if(100 < valInt){
                return;
            }else{
                setWorkYear(0);
                return;
            }
        } else if(div==="salaryRiseRate1"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            const valInt = Math.floor(number); //정수변환

            if(0 <= valInt && valInt <= 100){
                setSalaryRiseRate1(valInt);
            }else if(100 < valInt){
                return;
            }else{
                setSalaryRiseRate1(0);
                return;
            }
        } else if(div==="salaryRiseRate25"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            const valInt = Math.floor(number); //정수변환

            if(0 <= valInt && valInt <= 100){
                setSalaryRiseRate25(valInt);
            }else if(100 < valInt){
                return;
            }else{
                setSalaryRiseRate25(0);
                return;
            }
        } else if(div === "sideJobMonthly"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            const valInt = Math.floor(number); //정수변환

            if(0 <= valInt && valInt <= 10000){
                setSideJobMonthly(valInt);
            }else if(10000 < valInt){
                return;
            }else{
                setSideJobMonthly(0);
                return;
            }
        }
    };

    useEffectNoMount(()=>{
        surveyData.base.salaryMonthly = salaryMonthly;
        surveyData.base.workYear = workYear;
        surveyData.base.salaryRiseRate1 = salaryRiseRate1;
        surveyData.base.salaryRiseRate25 = salaryRiseRate25;
        surveyData.base.sideJobMonthly = sideJobMonthly;

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return(<Fragment>
        <div>
            <p>(1) 현재 세후 월급을 입력해주세요.</p>
            <p>
                월 <input value={salaryMonthly.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"salaryMonthly")}}/>만원
                <span> (연봉 {(salaryMonthly*12).toLocaleString('ko-KR')}만원)</span>
            </p>
            <p className='note'>※ 모든 소득은 세후로 계산하고 있습니다.</p>
        </div>
        <div>
            <p>(2) 현재 근속년수를 입력해주세요.</p>
            <p><input value={workYear} onChange={(e)=>{surveyOnChange(e,"workYear")}}/>년차</p>
        </div>
        <div>
            <p>(3) 근속년수별 연봉상승률을 입력해주세요.</p>
            <p>1년차 : <input value={salaryRiseRate1} onChange={(e)=>{surveyOnChange(e,"salaryRiseRate1")}}/>%
            → 25년차 이상 : <input value={salaryRiseRate25} onChange={(e)=>{surveyOnChange(e,"salaryRiseRate25")}}/>%</p>
            <p className='note'>※ 평균 연봉 상승률은 약 7% → 2% 입니다.</p>
            <p className='note'>※ 참고사이트 : 임금직무정보시스템(https://www.wage.go.kr/whome/index.do)</p>
        </div>
        <div>
            <p>(4) 부업을 하고 계시다면, 입력해주세요.</p>
            <p>
                월 <input value={sideJobMonthly.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"sideJobMonthly")}}/>만원
                <span> (연 {(sideJobMonthly*12).toLocaleString('ko-KR')}만원)</span>
            </p>
            <p className='note'>※ 모든 소득은 세후로 계산하고 있습니다.</p>
        </div>
    </Fragment>);
}
export default BaseSalarySurvey;