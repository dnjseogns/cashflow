import { Fragment, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import Mapping from '@/components/common/Mapping.jsx';
import {expCheckInt, expCheckDouble, toKoreanMoneyUnit} from "@/utils/util.js";

const BaseHouseSurvey = ({completeBtnClickCnt, commonCompleteLogic}) => {
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;

    const livingType = surveyData?.base?.livingType ?? "parent";

    const housePriceTotal = surveyData?.base?.housePriceTotal ?? 0;
    const housePriceLoan = surveyData?.base?.housePriceLoan ?? 0;
    const housePriceLoanRate = surveyData?.base?.housePriceLoanRate ?? "6.0";

    const houseCostMonthly = surveyData?.base?.houseCostMonthly ?? 0;

    const surveyOnChange = (e, div) => {
        if(div === "livingType"){
            surveyData.base.livingType = e.target.value;
        }
        else if(div === "housePriceTotal"){
            const ret = expCheckInt(e.target.value, 0, 10000000000);
            if(ret === null){return;}
            else{surveyData.base.housePriceTotal = ret;}
        }else if(div === "housePriceLoanRate"){
            const ret = expCheckDouble(e.target.value, 0, 100, 5);
            if(ret === null){return;}
            else{surveyData.base.housePriceLoanRate = ret;}
        }else if(div === "housePriceLoan"){
            const ret = expCheckInt(e.target.value, 0, housePriceTotal);
            if(ret === null){return;}
            else{surveyData.base.housePriceLoan = ret;}
        }else if(div === "houseCostMonthly"){
            const ret = expCheckInt(e.target.value, 0, 1000000000);
            if(ret === null){return;}
            else{surveyData.base.houseCostMonthly = ret;}
        }
        
        dispatch(SvSave(surveyData));
    };

    useEffectNoMount(()=>{
        surveyData.base.livingType = livingType;
        if(livingType === "parent"){
            surveyData.base.housePriceTotal = 0;
            surveyData.base.housePriceLoan = 0;
            surveyData.base.housePriceLoanRate = housePriceLoanRate;
            surveyData.base.housePriceOwn = 0;
            surveyData.base.houseCostMonthly = 0;
        }else{
            surveyData.base.housePriceTotal = housePriceTotal;
            surveyData.base.housePriceLoan = housePriceLoan;
            surveyData.base.housePriceLoanRate = housePriceLoanRate;
            surveyData.base.housePriceOwn = housePriceTotal - housePriceLoan;
            surveyData.base.houseCostMonthly = houseCostMonthly;
        }

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return (
        <Fragment>
            <div>
                <p className="question">(1) 현재 거주 형태를 선택해주세요.</p>
                <p className="radio-wrap">
                    <input type="radio" name="livingType" id="livingType_parent" value="parent" checked={livingType==="parent"?true:false} onChange={(e)=>{surveyOnChange(e,"livingType")}}/><label htmlFor="livingType_parent">본가</label>
                    <input type="radio" name="livingType" id="livingType_rent" value="rent" checked={livingType==="rent"?true:false} onChange={(e)=>{surveyOnChange(e,"livingType")}}/><label htmlFor="livingType_rent">월세·반전세·전세</label>
                    <input type="radio" name="livingType" id="livingType_jeonse" value="own" checked={livingType==="own"?true:false} onChange={(e)=>{surveyOnChange(e,"livingType")}}/><label htmlFor="livingType_jeonse">자가</label>
                </p>
            </div>
            {livingType==="rent"
            ? <Fragment>
                <div>
                    <p className="question">(2) 보증금 정보를 입력해주세요.</p>
                    <p>- 보증금 : <input className='btn1' value={housePriceTotal.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"housePriceTotal")}}/>({toKoreanMoneyUnit(housePriceTotal)})</p>
                    <p>
                        <span>- <Mapping txt="ⓐ"/>전·월세자금대출금 : </span>
                        <input className='btn1' value={housePriceLoan.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"housePriceLoan")}}/>({toKoreanMoneyUnit(housePriceLoan)}),
                        <span style={{marginLeft:"20px"}}>대출금리 : </span>
                        <input className='btn1' value={housePriceLoanRate.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"housePriceLoanRate")}}/> %
                    </p>
                    <p>- <Mapping txt="ⓑ"/>보증금 중 자기자본(자동계산) : <input className='btn1 readonly' value={(housePriceTotal - housePriceLoan).toLocaleString('ko-KR')} readOnly={true}/>({toKoreanMoneyUnit(housePriceTotal - housePriceLoan)})</p>
                </div>
                <div>
                    <p className="question">(3) 월 주거비(월세 + 관리비 + 공과금 등...)를 입력해주세요.</p>
                    <p>- <Mapping txt="ⓒ"/> : <input className='btn1' value={houseCostMonthly.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"houseCostMonthly")}}/>({toKoreanMoneyUnit(houseCostMonthly)})</p>
                </div>
            </Fragment>
            : null}
            {livingType==="own"
            ? <Fragment>
                <div>
                    <p className="question">(2) 주택 매매 가격을 입력해주세요.</p>
                    <p>- <Mapping txt="ⓑ"/>매매가격 : <input className='btn1' value={housePriceTotal.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"housePriceTotal")}}/>({toKoreanMoneyUnit(housePriceTotal)})</p>
                    <p>
                        <span>- <Mapping txt="ⓐ"/>주택담보대출 잔여 대출금 : </span>
                        <input className='btn1' value={housePriceLoan.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"housePriceLoan")}}/>({toKoreanMoneyUnit(housePriceLoan)}),
                        <span style={{marginLeft:"20px"}}><Mapping txt="ⓓ"/>대출금리 : </span>
                        <input className='btn1' value={housePriceLoanRate.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"housePriceLoanRate")}}/> %
                    </p>
                    <p>- 자기자본(자동계산) : <input className='btn1 readonly' value={(housePriceTotal - housePriceLoan).toLocaleString('ko-KR')} readOnly={true}/>({toKoreanMoneyUnit(housePriceTotal - housePriceLoan)})</p>
                </div>
                <div>
                    <p className="question">(3) 월 관리비를 입력해주세요.</p>
                    <p>- <Mapping txt="ⓒ"/> : <input className='btn1' value={houseCostMonthly.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"houseCostMonthly")}}/>({toKoreanMoneyUnit(houseCostMonthly)})</p>
                </div>
            </Fragment>
            : null}
    </Fragment>)
}
export default BaseHouseSurvey;