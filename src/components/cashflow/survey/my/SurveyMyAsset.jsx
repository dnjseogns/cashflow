import { Fragment, useEffect, useRef, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { numRound } from "@/utils/util";
import plusIcon from "@/images/icon_add.png";
import minusIcon from "@/images/icon_del.png";
import Mapping from '@/components/common/Mapping.jsx';
import {expCheckInt, expCheckDouble, toKoreanMoneyUnit} from "@/utils/util.js";

//나이
function SurveyMyAsset({completeBtnClickCnt, commonCompleteLogic}){
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;

    //house
    const livingType = surveyData.my?.livingType ?? "parent";
    const housePriceTotal = surveyData.my?.housePriceTotal ?? 0;
    const housePriceLoan = surveyData.my?.housePriceLoan ?? 0;
    const housePriceLoanRate = surveyData.my?.housePriceLoanRate ?? "5.0";
    const houseCostMonthly = surveyData.my?.houseCostMonthly ?? 0;

    //car
    const carYn = surveyData.my?.carYn ?? "N";
    const carPrice = surveyData.my?.carPrice ?? 30000000;
    const carLoan = surveyData.my?.carLoan ?? 0;
    const carLoanRate = surveyData.my?.carLoanRate ?? "5.0";
    const carCostMonthly = surveyData.my?.carCostMonthly ?? 0;

    // asset
    const loan = (Array.isArray(surveyData.my?.loan) && surveyData.my?.loan?.length >= 1) ? JSON.parse(JSON.stringify(surveyData.my?.loan)) : [];
    const currAssetSaving = surveyData.my?.currAssetSaving ?? 0;
    const currAssetInvest = surveyData.my?.currAssetInvest ?? 0;
    // const currAssetHousePrice = surveyData.my?.livingType=="rent" ? surveyData.my?.housePriceOwn
    //                             : surveyData.my?.livingType=="own" ? surveyData.my?.housePriceTotal
    //                             : 0;

    const dispatchValue = (div, value) => {
        if(value === null){return;}
        else{ surveyData.my[div] = value;}
    }
    const surveyOnChange = (e, div) => {
        // 집
        if(div === "livingType"){
            surveyData.my.livingType = e.target.value;
        }else if(div === "housePriceTotal"){
            dispatchValue(div, expCheckInt(e.target.value, 0, 10000000000));
        }else if(div === "housePriceLoanRate"){
            dispatchValue(div, expCheckDouble(e.target.value, 0, 100, 5));
        }else if(div === "housePriceLoan"){
            dispatchValue(div, expCheckInt(e.target.value, 0, housePriceTotal));
        }else if(div === "houseCostMonthly"){
            dispatchValue(div, expCheckInt(e.target.value, 0, 1000000000));
        }

        // 차
        if(div === "carYn"){
            surveyData.my.carYn = e.target.value;
        } else if(div === "carPrice"){
            dispatchValue(div, expCheckInt(e.target.value, 0, 10000000000));
        } else if(div === "carLoan"){
            dispatchValue(div, expCheckInt(e.target.value, 0, carPrice));
        } else if(div === "carLoanRate"){
            dispatchValue(div, expCheckDouble(e.target.value, 0, 100, 5));
        } else if(div === "carCostMonthly"){
            dispatchValue(div, expCheckInt(e.target.value, 0, 1000000000));
        }

        // 자산
        if(div==="currAssetSaving"){
            dispatchValue(div, expCheckInt(e.target.value, 0, 10000000000));
        }else if(div==="currAssetInvest"){
            dispatchValue(div, expCheckInt(e.target.value, 0, 10000000000));
        }

        dispatch(SvSave(surveyData));
    };


    
    const addLoan = () => {
        const newLoan = [...loan];
        const loanNumber = (loan.length + 1).toString();
        const newObj = {loanId : "loan"+loanNumber, loanName : "대출"+loanNumber, loanAmount : 1000000, loanInterest : "6.0", isReadOnly : false};
        newLoan.push(newObj);

        surveyData.my.loan = newLoan;
        dispatch(SvSave(surveyData));
    }
    const deleteLoan = (e, clickedItem) => {
        const newLoan = JSON.parse(JSON.stringify(loan.filter((item)=>(item.loanId != clickedItem?.loanId))));
        
        surveyData.my.loan = newLoan;
        dispatch(SvSave(surveyData));
    }
    const loanInputOnChange = (e, clickedItem, keyName) => {
        let newValue = e.target.value;
        if(keyName === "loanInterest"){
            const ret = expCheckDouble(e.target.value, 0, 100, 5);
            if(ret === null){return;}
            else{newValue = ret;}
        }else if(keyName === "loanAmount"){
            const ret = expCheckInt(e.target.value, 0, 10000000000);
            if(ret === null){return;}
            else{newValue = ret;}
        }else if(keyName === "loanName"){
            if(newValue.length > 10){
                return;
            }
        }

        // console.log("e.target.value",e.target.value);
        let newLoan = JSON.parse(JSON.stringify(loan));
        newLoan = newLoan.map((item, i)=>{
            if(item.loanId == clickedItem?.loanId){
                return {...item, [keyName] : newValue};
            }else{
                return item;
            }
        });

        surveyData.my.loan = newLoan;
        dispatch(SvSave(surveyData));
    }



    useEffectNoMount(()=>{
        // 집
        if(livingType === "parent"){
            surveyData.my.housePriceTotal = 0;
            surveyData.my.housePriceLoan = 0;
            surveyData.my.housePriceLoanRate = housePriceLoanRate;
            surveyData.my.housePriceOwn = 0;
            surveyData.my.houseCostMonthly = 0;
        }else{
            surveyData.my.housePriceTotal = housePriceTotal;
            surveyData.my.housePriceLoan = housePriceLoan;
            surveyData.my.housePriceLoanRate = housePriceLoanRate;
            surveyData.my.housePriceOwn = housePriceTotal - housePriceLoan;
            surveyData.my.houseCostMonthly = houseCostMonthly;
        }

        // 차
        if(carYn === "Y"){
            surveyData.my.carPrice = carPrice;
            surveyData.my.carLoan = carLoan;
            surveyData.my.carLoanRate = carLoanRate;
            surveyData.my.carCostMonthly = carCostMonthly;
        }else{
            surveyData.my.carPrice = 0;
            surveyData.my.carLoan = 0;
            surveyData.my.carLoanRate = carLoanRate;
            surveyData.my.carCostMonthly = 0;
        }

        //자산
        surveyData.my.loan = [...loan];
        surveyData.my.currAssetSaving = currAssetSaving;
        surveyData.my.currAssetInvest = currAssetInvest;

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return(
    <Fragment>
        <div>
            <p className="question">(1) 현재 거주 형태를 선택해주세요.</p>
            <p className="radio-wrap">
                <input type="radio" name="livingType" id="livingType_parent" value="parent" checked={livingType==="parent"?true:false} onChange={(e)=>{surveyOnChange(e,"livingType")}}/><label htmlFor="livingType_parent">본가</label>
                <input type="radio" name="livingType" id="livingType_rent" value="rent" checked={livingType==="rent"?true:false} onChange={(e)=>{surveyOnChange(e,"livingType")}}/><label htmlFor="livingType_rent">월세·반전세·전세</label>
                <input type="radio" name="livingType" id="livingType_jeonse" value="own" checked={livingType==="own"?true:false} onChange={(e)=>{surveyOnChange(e,"livingType")}}/><label htmlFor="livingType_jeonse">자가</label>
            </p>
            {livingType==="rent"
            ? <Fragment>
                    <p className="question-add">① 보증금 정보를 입력해주세요.</p>
                    <p>- 보증금 : <input className='btn1' value={housePriceTotal.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"housePriceTotal")}}/>({toKoreanMoneyUnit(housePriceTotal)})</p>
                    <p>
                        <span>- <Mapping txt="ⓐ"/>전·월세자금대출금 : </span>
                        <input className='btn1' value={housePriceLoan.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"housePriceLoan")}}/>({toKoreanMoneyUnit(housePriceLoan)}),
                        <span style={{marginLeft:"20px"}}>대출금리 : </span>
                        <input className='btn1' value={housePriceLoanRate.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"housePriceLoanRate")}}/> %
                        <span> (월 대출이자 : {toKoreanMoneyUnit(Math.round(housePriceLoan*(housePriceLoanRate/100)/12))})</span>
                    </p>
                    <p>- <Mapping txt="ⓑ"/>보증금 중 자기자본(자동계산) : <input className='btn1 readonly' value={(housePriceTotal - housePriceLoan).toLocaleString('ko-KR')} readOnly={true}/>({toKoreanMoneyUnit(housePriceTotal - housePriceLoan)})</p>
                
                <div>
                    <p className="question-add">② 월 주거비(월세 + 관리비 + 공과금 등...)를 입력해주세요.</p>
                    <p>- <Mapping txt="ⓒ"/> : <input className='btn1' value={houseCostMonthly.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"houseCostMonthly")}}/>({toKoreanMoneyUnit(houseCostMonthly)})</p>
                </div>
            </Fragment>
            : null}

            {livingType==="own"
            ? <Fragment>
                <p className="question-add">① 주택 매매 가격을 입력해주세요.</p>
                <p>- <Mapping txt="ⓑ"/>매매가격 : <input className='btn1' value={housePriceTotal.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"housePriceTotal")}}/>({toKoreanMoneyUnit(housePriceTotal)})</p>
                <p>
                    <span>- <Mapping txt="ⓐ"/>주택담보대출 잔여 대출금 : </span>
                    <input className='btn1' value={housePriceLoan.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"housePriceLoan")}}/>({toKoreanMoneyUnit(housePriceLoan)}),
                    <span style={{marginLeft:"20px"}}><Mapping txt="ⓓ"/>대출금리 : </span>
                    <input className='btn1' value={housePriceLoanRate.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"housePriceLoanRate")}}/> %
                    <span> (월 대출이자 : {toKoreanMoneyUnit(Math.round(housePriceLoan*(housePriceLoanRate/100)/12))})</span>
                </p>
                <p className="question-add">② 월 주거비(관리비 + 공과금 등...)를 입력해주세요.</p>
                <p>- <Mapping txt="ⓒ"/> : <input className='btn1' value={houseCostMonthly.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"houseCostMonthly")}}/>({toKoreanMoneyUnit(houseCostMonthly)})</p>
            </Fragment>
            : null}
        </div>



        <div>
            <p className="question">(2) 현재 자동차를 소유하고 계신가요?</p>
            <p className="radio-wrap">
                <input type="radio" name="carYn" id="carYn_N" value="N" checked={carYn==="N"?true:false} onChange={(e)=>{surveyOnChange(e,"carYn")}}/><label htmlFor="carYn_N">아니오</label>
                <input type="radio" name="carYn" id="carYn_Y" value="Y" checked={carYn==="Y"?true:false} onChange={(e)=>{surveyOnChange(e,"carYn")}}/><label htmlFor="carYn_Y">예</label>
            </p>
        {carYn === "Y"
        ? <Fragment>
            <p className="question-add">① 자동차 대출 정보를 입력해주세요.</p>
            <p>- 가격(현재시세) : <input className='btn1' value={carPrice.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"carPrice")}}/>({toKoreanMoneyUnit(carPrice)})</p>
            <p>- <Mapping txt="ⓐ"/>잔여 대출금 : <input className='btn1' value={carLoan.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"carLoan")}}/>({toKoreanMoneyUnit(carLoan)}),
            대출금리 : <input className='btn1' value={carLoanRate.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"carLoanRate")}}/> %
            <span> (월 대출이자 : {toKoreanMoneyUnit(Math.round(carLoan*(carLoanRate/100)/12))})</span>
            
            </p>
            <p className="question-add">② 월 평균 차량 유지비 입력해주세요.(주유비 + 보험료 + 유지보수비 등...)</p>
            <p>- <Mapping txt="ⓑ"/> : <input className='btn1' value={carCostMonthly.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"carCostMonthly")}}/>({toKoreanMoneyUnit(carCostMonthly)})</p>
            <p className='note'>※ 차량 가격의 1.5% 이상의 월 유지비가 나옵니다. ex) 3000만원 자동차의 유지비 → 45만원</p>
        </Fragment>
        : null}
        </div>




        <div>
            <p className="question">(3) 현재 자산 현황을 입력해주세요.</p>
            <p>- <Mapping txt="ⓐ"/>예·적금 : <input className='btn1' value={currAssetSaving.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"currAssetSaving")}}/>({toKoreanMoneyUnit(currAssetSaving)})</p>
            <p>- <Mapping txt="ⓑ"/>투자금 : <input className='btn1' value={currAssetInvest.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"currAssetInvest")}}/>({toKoreanMoneyUnit(currAssetInvest)})</p>
            <p>- <Mapping txt="ⓒ"/>대출금</p>
            <table className='survey-table'>
                <colgroup>
                    <col width={"7%"}/>
                    <col width={"33%"}/>
                    <col width={"30%"}/>
                    <col width={"20%"}/>
                    <col width={"10%"}/>
                </colgroup>
                <thead>
                    <tr>
                        <th>순번</th>
                        <th>대출명</th>
                        <th>금액(원)</th>
                        <th>금리(%)</th>
                        <th><button className='btnAdd' onClick={()=>{addLoan()}}>추가(+)</button></th>
                    </tr>
                </thead>
                <tbody>
                    {loan.map((loanItem, i)=>{
                        return ( <tr key={i}>
                            <td>{i+1}</td>
                            <td>
                                <input readOnly={loanItem?.isReadOnly ?? false} className={loanItem?.isReadOnly ? 'readonly' : ''} 
                                style={{textAlign:"left"}} value={loanItem?.loanName} onChange={(e)=>{loanInputOnChange(e, loanItem, "loanName")}}/>
                            </td>
                            <td>
                                <input readOnly={loanItem?.isReadOnly ?? false} className={loanItem?.isReadOnly ? 'readonly' : ''} 
                                style={{textAlign:"right"}} value={loanItem?.loanAmount.toLocaleString('ko-KR')} onChange={(e)=>{loanInputOnChange(e, loanItem, "loanAmount")}}/>
                            </td>
                            <td><input readOnly={loanItem?.isReadOnly ?? false} className={loanItem?.isReadOnly ? 'readonly' : ''} 
                                style={{textAlign:"right"}} value={loanItem?.loanInterest} onChange={(e)=>{loanInputOnChange(e, loanItem, "loanInterest")}}/>
                            </td>
                            <td>{loanItem?.isReadOnly === true ? null : <img src={minusIcon} alt="(-)" style={{width:"20px"}} onClick={(e)=>{deleteLoan(e, loanItem)}}></img>}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </Fragment>);
}
export default SurveyMyAsset;