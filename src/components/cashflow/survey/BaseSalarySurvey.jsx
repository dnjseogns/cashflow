import { Fragment, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import Mapping from '@/components/common/Mapping.jsx';

function BaseSalarySurvey({completeBtnClickCnt, commonCompleteLogic}){
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;

    const [salaryMonthly, setSalaryMonthly] = useState(surveyData.base?.salaryMonthly ?? 200);
    const [workYear, setWorkYear] = useState(surveyData.base?.workYear ?? 1);
    const [salaryRiseRate1, setSalaryRiseRate1] = useState(surveyData.base?.salaryRiseRate1 ?? 7);
    const [salaryRiseRate25, setSalaryRiseRate25] = useState(surveyData.base?.salaryRiseRate25 ?? 2);
    const [retireAge, setRetireAge] = useState(surveyData.base?.retireAge ?? 55);
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
        } else if(div === "retireAge"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            const valInt = Math.floor(number); //정수변환

            if(0 <= valInt && valInt <= 100){
                setRetireAge(valInt);
            }else if(100 < valInt){
                return;
            }else{
                setRetireAge(0);
                return;
            }
        }else if(div === "sideJobMonthly"){
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
        surveyData.base.retireAge = retireAge;
        surveyData.base.sideJobMonthly = sideJobMonthly;

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return(<Fragment>
        <div>
            <p className="question">(1) 현재 세후 월급을 입력해주세요.</p>
            <p> - <Mapping txt="ⓐ"/> : 
                월 <input className='btn1' value={salaryMonthly.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"salaryMonthly")}}/>만원
                <i> (연봉 {(salaryMonthly*12).toLocaleString('ko-KR')}만원)</i>
            </p>
            <p className='note'>※ 모든 소득은 세후로 계산하고 있습니다.</p>
        </div>
        <div>
            <p className="question">(2) 총 연차수를 입력해주세요.(이직포함)</p>
            <p> - <Mapping txt="ⓑ"/> : <input className='btn1' value={workYear} onChange={(e)=>{surveyOnChange(e,"workYear")}}/>년차</p>
        </div>
        <div>
            <p className="question">(3) 연차수별 시뮬레이션 연봉상승률을 입력해주세요.</p>
            <p> - <Mapping txt="ⓒ"/> : 1년차 : <input className='btn1' value={salaryRiseRate1} onChange={(e)=>{surveyOnChange(e,"salaryRiseRate1")}}/>%
            → 25년차 이상 : <input className='btn1' value={salaryRiseRate25} onChange={(e)=>{surveyOnChange(e,"salaryRiseRate25")}}/>%</p>
            <p className='note'>※ 평균 연봉 상승률은 약 7% → 2%으로 25년에 걸쳐 점차 감소합니다.</p>
            <p className='note'>※ 참고사이트 : 임금직무정보시스템(https://www.wage.go.kr/whome/index.do)</p>
        </div>
        <div>
            <p className="question">(4) 은퇴 나이를 입력해주세요.</p>
            <p> - <Mapping txt="ⓓ"/> : <input className='btn1' value={retireAge.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"retireAge")}}/> 세</p>
            <p className='note'>※ 퇴직금 계산 : (퇴직 전 평균 월급) x 연차수</p>
            {/* 예를 들어 계산
해 볼까요? 소득대체율은 가입할 때부터 50%로 변함없으며, A값은 1,935,977원, B값은
3,000,000원이고, 가입기간은 40년이라고 가정하면, 14,807,931원(1.5×(1,935,977원
+3.000.000원)×(1+0.05×20년×12월/12))을 기본연금액으로 계산할 수 있습니다. 이는 연
지급액이므로 12개월로 나누면 월 지급액 1,233,994원을 구할 수 있습니다.  */}
            {/* <p className='note'>※ 국민연금 예상 수령액 계산 : 소득대체율상수 × (A+B) × (1 + 0.05×n/12) </p> */}
            {/* file:///C:/Users/dhwon/Downloads/pension1%20(1).pdf */}
            {/* 한국투자증권 국민연금으로 재테크하기 */}
            {/* 국민연금은 매년 물가 상승률을 반영하여 연금액이 인상됩니다. */}
            {/* 이건... base에서 못하고 add쪽으로 옮겨야할 뜻*/}
        </div>
        <div>
            <p className="question">(5) 부업을 하고 계시다면, 입력해주세요.</p>
            <p> - <Mapping txt="ⓔ"/> : 
                월 <input className='btn1' value={sideJobMonthly.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"sideJobMonthly")}}/>만원
                <i> (연 {(sideJobMonthly*12).toLocaleString('ko-KR')}만원)</i>
            </p>
            <p className='note'>※ 모든 소득은 세후로 계산하고 있습니다.</p>
        </div>
    </Fragment>);
}
export default BaseSalarySurvey;