import { Fragment, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import Mapping from '@/components/common/Mapping.jsx';
import {expCheckInt, expCheckDouble, toKoreanMoneyUnit} from "@/utils/util.js";

const BaseCarSurvey = ({completeBtnClickCnt, commonCompleteLogic}) => {
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;

    const carYn = surveyData?.base?.carYn ?? "N";
    const carLoan = surveyData?.base?.carLoan ?? 0;
    const carLoanRate = surveyData?.base?.carLoanRate ?? "6.0";
    const carCostMonthly = surveyData?.base?.carCostMonthly ?? 0;

    const surveyOnChange = (e, div) => {
        if(div === "carYn"){
            surveyData.base.carYn = e.target.value;
        } else if(div === "carLoan"){
            const ret = expCheckInt(e.target.value, 0, 10000000000);
            if(ret === null){return;}
            else{surveyData.base.carLoan = ret;}
        } else if(div === "carLoanRate"){
            const ret = expCheckDouble(e.target.value, 0, 100, 5);
            if(ret === null){return;}
            else{surveyData.base.carLoanRate = ret;}
        } else if(div === "carCostMonthly"){
            const ret = expCheckInt(e.target.value, 0, 1000000000);
            if(ret === null){return;}
            else{surveyData.base.carCostMonthly = ret;}
        }

        if(div !== "carLoan"){surveyData.base.carLoan = carLoan;}
        if(div !== "carLoanRate"){surveyData.base.carLoanRate = carLoanRate;}
        if(div !== "carCostMonthly"){surveyData.base.carCostMonthly = carCostMonthly;}

        dispatch(SvSave(surveyData));
    };

    useEffectNoMount(()=>{
        surveyData.base.carYn = carYn;
        if(carYn === "Y"){
            surveyData.base.carLoan = carLoan;
            surveyData.base.carLoanRate = carLoanRate;
            surveyData.base.carCostMonthly = carCostMonthly;
        }else{
            surveyData.base.carLoan = 0;
            surveyData.base.carLoanRate = carLoanRate;
            surveyData.base.carCostMonthly = 0;
        }

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return (
    <Fragment>
        <div>
            <p className="question">(1) 자동차를 소유하고 계신가요?</p>
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
                <p>- <Mapping txt="ⓐ"/>잔여 대출금 : <input className='btn1' value={carLoan.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"carLoan")}}/>({toKoreanMoneyUnit(carLoan)})</p>
                <p>- 대출금리 : <input className='btn1' value={carLoanRate.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"carLoanRate")}}/> %
                    <span> (월 대출이자 : {toKoreanMoneyUnit(Math.round(carLoan*(carLoanRate/100)/12))})</span>
                </p>
            </div>
            <div>
                <p className="question">(3) 월 평균 차량 유지비 입력해주세요.(주유비 + 보험료 + 유지보수비 등...)</p>
                <p>- <Mapping txt="ⓑ"/> : <input className='btn1' value={carCostMonthly.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"carCostMonthly")}}/>({toKoreanMoneyUnit(carCostMonthly)})</p>
                <p className='note'>※ 차량 가격의 1.5% 이상의 월 유지비가 나옵니다. ex) 3000만원 자동차의 유지비 → 45만원</p>
            </div>
        </Fragment>
        : null}
    </Fragment>)
}
export default BaseCarSurvey;