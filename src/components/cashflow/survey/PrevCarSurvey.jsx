import { Fragment, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import Mapping from '@/components/common/Mapping.jsx';

const PrevCarSurvey = ({completeBtnClickCnt, commonCompleteLogic}) => {
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;

    const [carYn, setCarYn] = useState(surveyData?.prev?.carYn ?? "N");
    const [carLoan, setCarLoan] = useState(surveyData?.prev?.carLoan ?? 0);
    const [carLoanRate, setCarLoanRate] = useState(surveyData?.prev?.carLoanRate ?? "6.0");
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
        } else if(div === "carLoanRate"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            if(number.toString().length >= 5){return;}//길이체크

            if(number === 0 || number === ""){
                setCarLoanRate(0);
                return;
            }
            else if(0 <= number && number <= 100){
                if(/^0\d/.test(number)){
                    setCarLoanRate(Number(number).toString());
                }else{
                    setCarLoanRate(number);
                }
            }else if(100 < number){
                return;
            }else{
                setCarLoanRate(0);
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
            surveyData.prev.carLoanRate = carLoanRate;
            surveyData.prev.carCostMonthly = carCostMonthly;
        }else{
            surveyData.prev.carLoan = 0;
            surveyData.prev.carLoanRate = 0;
            surveyData.prev.carCostMonthly = 0;
        }

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return (
    <Fragment>
        <div>
            <p className="question">(1) 자동차를 소유하고 계신가요?<Mapping txt="ⓐ"/></p>
            <p className="radio-wrap">
            <input type="radio" name="carYn" id="carYn_N" value="N" checked={carYn==="N"?true:false} onChange={(e)=>{surveyOnChange(e,"carYn")}}/><label htmlFor="carYn_N">아니오</label>
            <input type="radio" name="carYn" id="carYn_Y" value="Y" checked={carYn==="Y"?true:false} onChange={(e)=>{surveyOnChange(e,"carYn")}}/><label htmlFor="carYn_Y">예</label>
                {/* checked={surveyData.base["houseType"]==="h1"? true : false} */}
            </p>
        </div>
        {carYn === "Y"
        ? <Fragment>
            <div>
                <p className="question">(2) 자동차 대출 정보를 입력해주세요.</p>
                <p>- <Mapping txt="ⓑ"/>잔여 대출금 : <input className='btn1' value={carLoan.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"carLoan")}}/> 만원</p>
                <p>- <Mapping txt="ⓒ"/>대출금리 : <input className='btn1' value={carLoanRate.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"carLoanRate")}}/> %</p>
            </div>
            <div>
                <p className="question">(3) 월 평균 차량 유지비 입력해주세요.(주유비 + 보험료 + 유지보수비 등...)</p>
                <p>- <Mapping txt="ⓓ"/> : <input className='btn1' value={carCostMonthly.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"carCostMonthly")}}/> 만원</p>
                <p className='note'>※ 차량 가격의 1.5% 이상의 월 유지비가 나옵니다. ex) 3000만원 자동차의 유지비 → 45만원</p>
            </div>
        </Fragment>
        : null}
    </Fragment>)
}
export default PrevCarSurvey;