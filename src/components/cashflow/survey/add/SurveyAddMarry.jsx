import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { numRound } from "@/utils/util";
import Mapping from '@/components/common/Mapping.jsx';
import { isValueExist, expCheckInt, expCheckDouble, toKoreanMoneyUnit } from '@/utils/util.js';

const SurveyAddMarry = ({completeBtnClickCnt, commonCompleteLogic}) => {
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;
    const timeline = useSelector((store) => store.Cashflow)?.data?.timeline;

    const marryYn = surveyData?.add?.marryYn ?? "N";
    const marryAge = surveyData?.add?.marryAge ?? surveyData.my?.age;
    const marryPrice = surveyData?.add?.marryPrice ?? 0;
    const marryTripPrice = surveyData?.add?.marryTripPrice ?? 0;
    const furniturePrice = surveyData?.add?.furniturePrice ?? 0;
    const parentSupportPrice = surveyData?.add?.parentSupportPrice ?? 0;
    

    const marryAgeTimeline = timeline?.find((item)=>item.age === marryAge);
    // console.log("marryAgeTimeline",marryAgeTimeline);
    
    const partnerAge = surveyData?.add?.partnerAge ?? 20;
    const partnerAsset = surveyData?.add?.partnerAsset ?? 0;
    const partnerIncomePercent = surveyData?.add?.partnerIncomePercent ?? 100;
    const partnerSpendingPercent = surveyData?.add?.partnerSpendingPercent ?? 100;
    
    const myIncome = marryAgeTimeline?.totalIncome??0;
    const mySpending = ((marryAgeTimeline?.totalConsumption??0) - (marryAgeTimeline?.houseCost??0)) * -1;
    const partnerIncome = Math.round(myIncome * partnerIncomePercent/100);
    const partnerSpending = Math.round(mySpending * partnerSpendingPercent/100);

    const dispatchValue = (div, value) => {
        if(value === null){return;}
        else{ surveyData.add[div] = value;}
    }
    const surveyOnChange = (e, div) => {
        if(div==="marryYn"){
            surveyData.add.marryYn = e.target.value;
        } else if(div === "marryAge" || div === "partnerIncomePercent" || div === "partnerSpendingPercent"){
            dispatchValue(div, expCheckInt(e.target.value, 0, 100));
        } else {
            dispatchValue(div, expCheckInt(e.target.value, 0, 10000000000));
        } 
        
        dispatch(SvSave(surveyData));
    };

    useEffectNoMount(()=>{
        if(surveyData?.add?.marryYn === "Y" 
            && surveyData.add?.marryAge < surveyData.my?.age
        ){
            alert("결혼 예정 나이는 현재 나이보다 적을 수 없습니다.");
            return;
        }
        
        if(surveyData?.add?.marryYn === "Y"){
            surveyData.add.marryYn = marryYn;
            surveyData.add.marryAge = marryAge;
            surveyData.add.marryPrice = marryPrice;
            surveyData.add.marryTripPrice = marryTripPrice;
            surveyData.add.furniturePrice = furniturePrice;
            surveyData.add.parentSupportPrice = parentSupportPrice;

        }else{
            surveyData.add.marryYn = marryYn;
            surveyData.add.marryAge = undefined;
            surveyData.add.marryPrice = 0;
            surveyData.add.marryTripPrice = 0;
            surveyData.add.furniturePrice = 0;
            surveyData.add.parentSupportPrice = 0;
        }
        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return (
        <Fragment>
        <div>
            <p className="question">(1) 결혼 하시겠습니까?</p>
            <p className="radio-wrap">
                <input type="radio" name="marryYn" id="marryYn_N" value="N" checked={marryYn==="N"?true:false} onChange={(e)=>{surveyOnChange(e,"marryYn")}}/><label htmlFor="marryYn_N">아니오</label>
                <input type="radio" name="marryYn" id="marryYn_Y" value="Y" checked={marryYn==="Y"?true:false} onChange={(e)=>{surveyOnChange(e,"marryYn")}}/><label htmlFor="marryYn_Y">예</label>
                {marryYn==="N"
                ? null
                :<span>(예정 나이 : 
                    <input className={'btn1'} value={marryAge} onChange={(e)=>{surveyOnChange(e,"marryAge")}} style={{width:"60px", marginLeft:"10px"}}/> 세
                )</span>}
            </p>
        </div>
        {marryYn === "Y"
        ? <Fragment>
            <div>
            <p className="question">(2) 결혼 비용을 입력해주세요.(합계 : <i>{toKoreanMoneyUnit(marryPrice + marryTripPrice + furniturePrice - parentSupportPrice)}</i>)</p>
            <p>- 결혼식/스드메 비용 : <input className='btn1' value={marryPrice.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"marryPrice")}}/>원<i> ({toKoreanMoneyUnit(marryPrice)})</i></p>
            <p>- 신혼여행 경비: <input className='btn1' value={marryTripPrice.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"marryTripPrice")}}/>원<i> ({toKoreanMoneyUnit(marryTripPrice)})</i></p>
            <p>- 가전/가구 비용: <input className='btn1' value={furniturePrice.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"furniturePrice")}}/>원<i> ({toKoreanMoneyUnit(furniturePrice)})</i></p>
            <p>- 축의금/부모님 지원: <input className='btn1' value={parentSupportPrice.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"parentSupportPrice")}}/>원<i> ({toKoreanMoneyUnit(parentSupportPrice)})</i></p>
            
            <p className='note'>※ 집/자동차는 8번 9번 메뉴에서 작성해주세요.</p>
        </div>
        <div>
            <p className="question">(3) 배우자 정보를 입력해주세요.</p>
            <p>- 나이 : <input className='btn1' value={partnerAge.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"partnerAge")}}/>세</p>
            <p>- 자산 : <input className='btn1' value={partnerAsset.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"partnerAsset")}}/>원<i> ({toKoreanMoneyUnit(partnerAsset)})</i></p>
            <p>- 소득 : 내 ({marryAge}세)소득(<i>{toKoreanMoneyUnit(myIncome)}</i>)의 <input className='btn1' value={partnerIncomePercent.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"partnerIncomePercent")}}/>% → <i> 연 {toKoreanMoneyUnit(partnerIncome)}</i></p>
            <p>- 지출 : 내 ({marryAge}세)지출(<i>{toKoreanMoneyUnit(mySpending)}</i>)의 <input className='btn1' value={partnerSpendingPercent.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"partnerSpendingPercent")}}/>% → <i> 연 {toKoreanMoneyUnit(partnerSpending)}</i></p>
        </div>
        </Fragment>
        : null}
        </Fragment>
    )
}
export default SurveyAddMarry;