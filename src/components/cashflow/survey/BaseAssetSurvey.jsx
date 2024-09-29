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
function BaseAssetSurvey({completeBtnClickCnt, commonCompleteLogic}){
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;

    // const [currAssetLoan, setCurrAssetLoan] = useState(surveyData.base?.currAssetLoan ?? 0);
    const loan = (Array.isArray(surveyData.base?.loan) && surveyData.base?.loan?.length >= 1) ? surveyData.base?.loan : [];
    const currAssetSaving = surveyData.base?.currAssetSaving ?? 0;
    const currAssetInvest = surveyData.base?.currAssetInvest ?? 0;

    const loanInterest = surveyData.base?.loanInterest ?? "6.0";
    const bankInterest = surveyData.base?.bankInterest ?? "3.0";
    const investIncome = surveyData.base?.investIncome ?? "6.0";

    useEffect(()=>{
        let newLoan = [...loan].filter((item)=>{return item.loanId != "carLoan" && item.loanId != "houseLoan"});
        if(surveyData.base?.housePriceLoan > 0){
            if(surveyData.base?.livingType == "rent"){
                newLoan.unshift({loanId:"houseLoan", loanName:"전·월세자금대출금(사전입력 : 2-ⓐ)", loanAmount:surveyData.base?.housePriceLoan ?? 0, loanInterest:surveyData.base?.housePriceLoanRate ?? 0, isReadOnly:true});
            }else if(surveyData.base?.livingType == "own"){
                newLoan.unshift({loanId:"houseLoan", loanName:"주택담보대출(사전입력 : 2-ⓐ)", loanAmount:surveyData.base?.housePriceLoan ?? 0, loanInterest:surveyData.base?.housePriceLoanRate ?? 0, isReadOnly:true});
            }
        }
        if(surveyData.base?.carLoan > 0){
            newLoan.unshift({loanId:"carLoan", loanName:"자동차 대출(사전입력 : 1-ⓐ)", loanAmount:surveyData.base?.carLoan ?? 0, loanInterest:surveyData.base?.carLoanRate ?? 0, isReadOnly:true});
        }

        surveyData.base.loan = newLoan;
        dispatch(SvSave(surveyData));
    },[]);

    const surveyOnChange = (e, div) => {
        if(div==="currAssetSaving"){
            const ret = expCheckInt(e.target.value, 0, 10000000000);
            if(ret === null){return;}
            else{surveyData.base.currAssetSaving = ret;}
        }else if(div==="currAssetInvest"){
            const ret = expCheckInt(e.target.value, 0, 10000000000);
            if(ret === null){return;}
            else{surveyData.base.currAssetInvest = ret;}
        }else if(div==="loanInterest"){
            const ret = expCheckDouble(e.target.value, 0, 100, 5);
            if(ret === null){return;}
            else{surveyData.base.loanInterest = ret;}
        }else if(div==="bankInterest"){
            const ret = expCheckDouble(e.target.value, 0, 100, 5);
            if(ret === null){return;}
            else{surveyData.base.bankInterest = ret;}
        }else if(div==="investIncome"){
            const ret = expCheckDouble(e.target.value, 0, 100, 5);
            if(ret === null){return;}
            else{surveyData.base.investIncome = ret;}
        }

        dispatch(SvSave(surveyData));
    };

    useEffectNoMount(()=>{
        surveyData.base.loan = [...loan];
        surveyData.base.currAssetSaving = currAssetSaving;
        surveyData.base.currAssetInvest = currAssetInvest;

        surveyData.base.loanInterest = loanInterest;
        surveyData.base.bankInterest = bankInterest;
        surveyData.base.investIncome = investIncome;

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    const addLoan = () => {
        const newLoan = [...loan];
        const loanNumber = (loan.length + 1).toString();
        const newObj = {loanId : "loan"+loanNumber, loanName : "대출"+loanNumber, loanAmount : 1000000, loanInterest : "6.0", isReadOnly : false};
        newLoan.push(newObj);

        surveyData.base.loan = newLoan;
        dispatch(SvSave(surveyData));
    }
    const deleteLoan = (e, clickedItem) => {
        const newLoan = JSON.parse(JSON.stringify(loan.filter((item)=>(item.loanId != clickedItem?.loanId))));
        
        surveyData.base.loan = newLoan;
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

        surveyData.base.loan = newLoan;
        dispatch(SvSave(surveyData));
    }

    return(
    <Fragment>
        <div>
            <p className="question">(1) 현재 자산 현황을 입력해주세요.</p>
            <p>- <Mapping txt="ⓐ"/>대출금</p>
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
                        <th><img src={plusIcon} alt="(+)" style={{width:"22px"}} onClick={()=>{addLoan()}}></img></th>
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
            <p>- <Mapping txt="ⓑ"/>예·적금 : <input className='btn1' value={currAssetSaving.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"currAssetSaving")}}/>({toKoreanMoneyUnit(currAssetSaving)})</p>
            <p>- <Mapping txt="ⓒ"/>투자금 : <input className='btn1' value={currAssetInvest.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"currAssetInvest")}}/>({toKoreanMoneyUnit(currAssetInvest)})</p>
            
        </div>
        <div>
            <p className="question">(2) 시뮬레이션 금리 및 개인 투자수익률을 입력해주세요.</p>
            <p>- <Mapping txt="ⓐ"/>대출금리 : <input className='btn1' value={loanInterest} onChange={(e)=>{surveyOnChange(e,"loanInterest")}}/> %</p>
            <p className='note'>※ 2000년 ~ 2023년 1금융권 평균 대출금리는 약 6.0%입니다.</p>
            <p>- <Mapping txt="ⓑ"/>예금금리 : <input className='btn1' value={bankInterest} onChange={(e)=>{surveyOnChange(e,"bankInterest")}}/> %</p>
            <p className='note'>※ 2000년 ~ 2023년 1금융권 평균 대출금리는 약 3.0%입니다.</p>
            <p>- <Mapping txt="ⓒ"/>개인 투자수익률 : <input className='btn1' value={investIncome} onChange={(e)=>{surveyOnChange(e,"investIncome")}}/> %</p>
            <p className='note'>※ 투자수익률은 미래자산에 매우 큰 영향을 끼칩니다. 현실적인 누적자산을 확인하기 위해선, <i>대출금리({loanInterest}%)</i>를 크게 벗어나지 않는 수익률로 설정해주시길 바랍니다.</p>
            <p className='note'>※ 투자대상 : 주식, 금, 코인, 실거주 아닌 주택 등...(실거주 주택은 별도로 계산되므로, 투자대상에 포함하지 않습니다.)</p>
        </div>
    </Fragment>);
}
export default BaseAssetSurvey;