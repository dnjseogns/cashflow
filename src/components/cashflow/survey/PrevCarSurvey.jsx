import { Fragment, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';

const PrevCarSurvey = ({completeBtnClickCnt, commonCompleteLogic}) => {
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;

    const [carYn, setCarYn] = useState(surveyData?.prev?.carYn ?? "Y");
    const [carLoan, setCarLoan] = useState(surveyData?.prev?.carLoan ?? 0);
    const [carCostMonthly, setCarCostMonthly] = useState(surveyData?.prev?.carCostMonthly ?? 0);

    const surveyOnChange = (e, div) => {
        if(div === "carYn"){
            setCarYn(e.target.value);
        } else if(div === "carLoan"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            const valInt = Math.floor(number); //정수변환

            if(0 <= valInt && valInt <= 10000000){
                setCarLoan(valInt);
            }else if(10000000 < valInt){
                return;
            }else{
                setCarLoan(0);
                return;
            }
        } else if(div === "carCostMonthly"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            const valInt = Math.floor(number); //정수변환

            if(0 <= valInt && valInt <= 10000000){
                setCarCostMonthly(valInt);
            }else if(10000000 < valInt){
                return;
            }else{
                setCarCostMonthly(0);
                return;
            }
        }
    };

    useEffectNoMount(()=>{
        surveyData.prev.carYn = carYn;
        if(carYn === "Y"){
            surveyData.prev.carLoan = carLoan;
            surveyData.prev.carCostMonthly = carCostMonthly;
        }else{
            surveyData.prev.carLoan = 0;
            surveyData.prev.carCostMonthly = 0;
        }

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return (
    <Fragment>
        <div>
            <p>(1) 자동차를 소유하고 계신가요?</p>
            <p className="radio-wrap">
                <input type="radio" name="carYn" id="carYn_Y" value="Y" checked={carYn==="Y"?true:false} onChange={(e)=>{surveyOnChange(e,"carYn")}}/><label for="carYn_Y">예</label>
                <input type="radio" name="carYn" id="carYn_N" value="N" checked={carYn==="N"?true:false} onChange={(e)=>{surveyOnChange(e,"carYn")}}/><label for="carYn_N">아니오</label>
                {/* checked={surveyData.base["houseType"]==="h1"? true : false} */}
            </p>
        </div>
        {carYn === "Y"
        ? <Fragment>
            <div>
                <p>(2) 남은 자동차 대출금을 입력해주세요.</p>
                <p><input value={carLoan.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"carLoan")}}/> 만원</p>
            </div>
            <div>
                <p>(3) 월 평균 자동차 유지비 입력해주세요.(주유비 + 관리비 + 보험금)</p>
                <p><input value={carCostMonthly.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"carCostMonthly")}}/> 만원</p>
                <p className='note'>※ 차량 가격의 1.5% 이상의 월 유지비로 나옵니다. ex) 3000만원 자동차의 유지비 → 45만원</p>
            </div>
        </Fragment>
        : null}
    </Fragment>)
}
export default PrevCarSurvey;