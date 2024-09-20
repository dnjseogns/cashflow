import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { numRound } from "@/utils/util";
import plusIcon from "@/images/icon_add.png";
import minusIcon from "@/images/icon_del.png";

//나이
function BaseAssetSurvey({completeBtnClickCnt, commonCompleteLogic}){
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;
    const base = surveyData.base;

    const [currAssetLoan, setCurrAssetLoan] = useState(base?.currAssetLoan ?? 0);
    const [currAssetSaving, setCurrAssetSaving] = useState(base?.currAssetSaving ?? 0);
    const [currAssetInvest, setCurrAssetInvest] = useState(base?.currAssetInvest ?? 0);

    const [loanInterest, setLoanInterest] = useState(base?.loanInterest ?? "6.0");
    const [bankInterest, setBankInterest] = useState(base?.bankInterest ?? "3.0");
    const [investIncome, setInvestIncome] = useState(base?.investIncome ?? "6.0");

    const [loan, setLoan] = useState(base?.loan.length >= 1 ? base?.loan : []);

    useEffect(()=>{
        let newLoan = [...loan].filter((item)=>{return item.loanId != "carLoan" && item.loanId != "houseLoan"});
        if(surveyData.prev?.carLoan > 0){
            newLoan.push({loanId:"carLoan", loanName:"자동차 대출(사전정보)", loanAmout:surveyData.prev?.carLoan ?? 0, loanInterest:surveyData.prev?.carLoanRate ?? 0, isReadOnly:true});
        }
        if(surveyData.prev?.housePriceLoan > 0){
            if(surveyData.prev?.livingType == "rent"){
                newLoan.push({loanId:"houseLoan", loanName:"전·월세자금대출금(사전정보)", loanAmout:surveyData.prev?.housePriceLoan ?? 0, loanInterest:surveyData.prev?.housePriceLoanRate ?? 0, isReadOnly:true});
            }else if(surveyData.prev?.livingType == "own"){
                newLoan.push({loanId:"houseLoan", loanName:"주택담보대출(사전정보)", loanAmout:surveyData.prev?.housePriceLoan ?? 0, loanInterest:surveyData.prev?.housePriceLoanRate ?? 0, isReadOnly:true});
            }
        }
        setLoan(newLoan);

        console.log("newLoan",newLoan);
    },[]);
    console.log("loan",loan);

    const surveyOnChange = (e, div) => {
        if(div==="currAssetLoan"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            const valInt = numRound(number, 0); //정수변환

            if(0 <= valInt && valInt <= 100000000){
                setCurrAssetLoan(valInt);
            }else if(100000000 < valInt){
                return;
            }else{
                setCurrAssetLoan(0);
                return;
            }
        }else if(div==="currAssetSaving"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            const valInt = numRound(number, 0); //정수변환

            if(0 <= valInt && valInt <= 100000000){
                setCurrAssetSaving(valInt);
            }else if(100000000 < valInt){
                return;
            }else{
                setCurrAssetSaving(0);
                return;
            }
        }else if(div==="currAssetInvest"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            const valInt = numRound(number, 0); //정수변환

            if(0 <= valInt && valInt <= 100000000){
                setCurrAssetInvest(valInt);
            }else if(100000000 < valInt){
                return;
            }else{
                setCurrAssetInvest(0);
                return;
            }
        }else if(div==="loanInterest"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            if(number.toString().length >= 5){return;}//길이체크

            if(number === 0 || number === ""){
                setLoanInterest(0);
                return;
            }
            else if(0 <= number && number <= 100){
                if(/^0\d/.test(number)){
                    setLoanInterest(Number(number).toString());
                }else{
                    setLoanInterest(number);
                }
            }else if(100 < number){
                return;
            }else{
                setLoanInterest(0);
                return;
            }
        }else if(div==="bankInterest"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            if(number.toString().length >= 5){return;}//길이체크

            if(number === 0 || number === ""){
                setBankInterest(0);
                return;
            }
            else if(0 < number && number <= 100){
                if(/^0\d/.test(number)){
                    setBankInterest(Number(number).toString());
                }else{
                    setBankInterest(number);
                }
            }else if(100 < number){
                return;
            }else{
                setBankInterest(0);
                return;
            }
        }else if(div==="investIncome"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            if(number.toString().length >= 5){return;}//길이체크

            if(number === 0 || number === ""){
                setInvestIncome(0);
                return;
            }
            else if(0 <= number && number <= 100){
                if(/^0\d/.test(number)){
                    setInvestIncome(Number(number).toString());
                }else{
                    setInvestIncome(number);
                }
            }else if(100 < number){
                return;
            }else{
                setInvestIncome(0);
                return;
            }
        }
    };

    useEffectNoMount(()=>{
        base.currAssetLoan = currAssetLoan;
        base.currAssetSaving = currAssetSaving;
        base.currAssetInvest = currAssetInvest;

        base.loanInterest = loanInterest;
        base.bankInterest = bankInterest;
        base.investIncome = investIncome;

        surveyData.base = base;

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return(
    <Fragment>
        <div>
            <p>(1) 자산 현황을 입력해주세요.</p>
            <p>- 예·적금 : <input className='btn1' value={currAssetSaving.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"currAssetSaving")}}/> 만원</p>
            <p>- 투자금 : <input className='btn1' value={currAssetInvest.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"currAssetInvest")}}/> 만원</p>
            <p>- 대출금</p>
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
                        <th>금액(만원)</th>
                        <th>금리(%)</th>
                        <th><img src={plusIcon} alt="(+)" style={{width:"22px"}} onClick={()=>{alert("추가구현!")}}></img></th>
                    </tr>
                </thead>
                <tbody>
                    {loan.map((loanItem, i)=>{
                        return ( <tr key={i}>
                            <td>{i+1}</td>
                            <td><input readOnly={loanItem?.isReadOnly ?? false} className={loanItem?.isReadOnly ? 'readonly' : ''} value={loanItem?.loanName}/></td>
                            <td><input readOnly={loanItem?.isReadOnly ?? false} className={loanItem?.isReadOnly ? 'readonly' : ''} style={{textAlign:"right"}} value={loanItem?.loanAmout.toLocaleString('ko-KR')}/></td>
                            <td><input readOnly={loanItem?.isReadOnly ?? false} className={loanItem?.isReadOnly ? 'readonly' : ''} style={{textAlign:"right"}} value={loanItem?.loanInterest}/></td>
                            <td>{loanItem?.isReadOnly === true ? null : <img src={minusIcon} alt="(-)" style={{width:"20px"}} onClick={()=>{alert("삭제구현!")}}></img>}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        <div>
            <p>(4) 시뮬레이션 금리 및 투자수익률을 입력해주세요.</p>
            <p>- 대출금리 : <input className='btn1' value={loanInterest} onChange={(e)=>{surveyOnChange(e,"loanInterest")}}/> %</p>
            <p className='note'>※ 2000년 ~ 2023년 1금융권 평균 대출금리는 약 6.0%입니다.</p>
            <p>- 예금금리 : <input className='btn1' value={bankInterest} onChange={(e)=>{surveyOnChange(e,"bankInterest")}}/> %</p>
            <p className='note'>※ 2000년 ~ 2023년 1금융권 평균 대출금리는 약 3.0%입니다.</p>
            <p>- 투자수익률 : <input className='btn1' value={investIncome} onChange={(e)=>{surveyOnChange(e,"investIncome")}}/> %</p>
            <p>※ 투자수익률은 미래자산에 매우 큰 영향을 끼칩니다. 현실적인 누적자산을 확인하기 위해선, 대출금리({loanInterest}%)를 크게 벗어나지 않는 수익률로 설정해주시길 바랍니다.</p>
            <p>※ 투자대상 : 주식, 금, 코인, 실거주 아닌 주택 등...(실거주 주택은 별도로 계산되므로, 투자대상에 포함하지 않습니다.)</p>
        </div>
    </Fragment>);
}
export default BaseAssetSurvey;