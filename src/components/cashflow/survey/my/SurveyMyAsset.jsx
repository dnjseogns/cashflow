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


    // asset
    const loan = (Array.isArray(surveyData.my?.loan) && surveyData.my?.loan?.length >= 1) ? JSON.parse(JSON.stringify(surveyData.my?.loan)) : [];
    const currAssetSaving = surveyData.my?.currAssetSaving ?? 0;
    const currAssetInvest = surveyData.my?.currAssetInvest ?? 0;


    const dispatchValue = (div, value) => {
        if(value === null){return;}
        else{ surveyData.my[div] = value;}
    }
    const surveyOnChange = (e, div) => {
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
        const newObj = {loanId : "loan"+loanNumber, loanName : "대출"+loanNumber, loanAmount : 1000000, loanInterest : "5.0", isReadOnly : false};
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
            <p className="question">(1) 현재 자산 현황을 입력해주세요.</p>
            <p>- <Mapping txt="ⓕ"/>예·적금 : <input className='btn1' value={currAssetSaving.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"currAssetSaving")}}/>({toKoreanMoneyUnit(currAssetSaving)})</p>
            <p>- <Mapping txt="ⓖ"/>투자금 : <input className='btn1' value={currAssetInvest.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"currAssetInvest")}}/>({toKoreanMoneyUnit(currAssetInvest)})</p>
            <p>- <Mapping txt="ⓗ"/>대출금</p>
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