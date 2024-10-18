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
    const houseYn = surveyData.my?.houseYn ?? "N";
    const house = surveyData.my?.house ?? [{
        seq:1,
        age:-1,
        livingType:"본가",
        housePriceTotal:0,
        houseCostMonthly:0,
        isReadOnly:true
    }];
    const houseLoanPrice = surveyData.my?.houseLoanPrice ?? 0;
    const houseLoanRate = surveyData.my?.houseLoanRate ?? surveyData.base.loanInterest;

    //car
    const carYn = surveyData.my?.carYn ?? "N";
    const carLoan = surveyData.my?.carLoan ?? 0;
    const carLoanRate = surveyData.my?.carLoanRate ?? surveyData.base.loanInterest;
    const carCostMonthly = surveyData.my?.carCostMonthly ?? 0;

    // asset
    const loan = (Array.isArray(surveyData.my?.loan) && surveyData.my?.loan?.length >= 1) ? JSON.parse(JSON.stringify(surveyData.my?.loan)) : [];
    const currAssetSaving = surveyData.my?.currAssetSaving ?? 0;
    const currAssetInvest = surveyData.my?.currAssetInvest ?? 0;





    const dispatchValue = (div, value) => {
        if(value === null){return;}
        else{ surveyData.my[div] = value;}
    }
    const surveyOnChange = (e, div) => {
        // 집
        if(div === "houseYn"){
            surveyData.my.houseYn = e.target.value;
        }
        if(div === "houseLoanPrice"){
            dispatchValue(div, expCheckInt(e.target.value, 0, house[0].housePriceTotal));
        }else if(div === "houseLoanRate"){
            dispatchValue(div, expCheckDouble(e.target.value, 0, 100, 5));
        }

        // 차
        if(div === "carYn"){
            surveyData.my.carYn = e.target.value;
        } else if(div === "carLoan"){
            dispatchValue(div, expCheckInt(e.target.value, 0, 10000000000));
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
        // 집
        if(surveyData.my?.houseYn === "N"){
            surveyData.my.houseYn = houseYn;
            surveyData.my.house = [{
                seq:1,
                age:-1,
                livingType:"본가",
                housePriceTotal:0,
                houseCostMonthly:0,
                isReadOnly:true
            }];
            surveyData.my.houseLoanPrice = 0;
            surveyData.my.houseLoanRate = houseLoanRate;
        }else{
            surveyData.my.houseYn = houseYn;
            surveyData.my.house = house;
            surveyData.my.houseLoanPrice = houseLoanPrice;
            surveyData.my.houseLoanRate = houseLoanRate;
        }

        // 차
        if(carYn === "Y"){
            surveyData.my.carLoan = carLoan;
            surveyData.my.carLoanRate = carLoanRate;
            surveyData.my.carCostMonthly = carCostMonthly;
        }else{
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

    const houseListOnChange = (e, div, _item, keyName) => {
        if(div==="EDIT"){
            let newValue = e.target.value;

            if(keyName === "livingType"){
                if(newValue === "본가"){
                    _item.housePriceTotal = 0;
                    _item.houseCostMonthly = 0;
                }
            } else if(keyName === "housePriceTotal" || keyName === "houseCostMonthly"){
                const ret = expCheckInt(e.target.value, 0, 10000000000);
                if(ret === null){return;}
                else{newValue = ret;}
            }

            let newHouse = JSON.parse(JSON.stringify(house));
            newHouse = newHouse.map((item, i)=>{
                if(item.seq == _item?.seq){
                    return {..._item, [keyName] : newValue};
                }else{
                    return item;
                }
            });

            surveyData.my.house = newHouse;
            dispatch(SvSave(surveyData));
        }
    }

    return(
    <Fragment>
        <div>
            <p className="question">(1) 독립하여 거주 중이신가요?</p>
            <p className="radio-wrap">
                <input type="radio" name="houseYn" id="houseYn_N" value="N" checked={houseYn==="N"?true:false} onChange={(e)=>{surveyOnChange(e,"houseYn")}}/><label htmlFor="houseYn_N">아니오</label>
                <input type="radio" name="houseYn" id="houseYn_Y" value="Y" checked={houseYn==="Y"?true:false} onChange={(e)=>{surveyOnChange(e,"houseYn")}}/><label htmlFor="houseYn_Y">예</label>
            </p>
            {houseYn === "Y"
            ?<Fragment>
                <p className="question-add">※ 거주 정보를 입력해주세요.</p>
                <table className='survey-table'>
                    <colgroup>
                        <col width={"10%"}/>
                        <col width={"10%"}/>
                        <col width={"20%"}/>
                        <col width={"30%"}/>
                        <col width={"30%"}/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>순번</th>
                            <th>나이</th>
                            <th>주거 형태</th>
                            <th>보증금<i style={{fontSize:"14px"}}>(전/월세)</i> 또는 주택가<i style={{fontSize:"14px"}}>(매매)</i></th>
                            <th>월 주거비<i style={{fontSize:"14px"}}>(월세+ 관리비+ 공과금 등)</i></th>
                            {/* <th><button className='btnAdd' onClick={(e)=>{houseListOnChange(e, "ADD")}}>추가(+)</button></th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {house.map((item, i)=>{
                            return (
                            <Fragment key={i}>
                            <tr>
                                <td>{item?.seq}</td>
                                <td>
                                    <input readOnly={true} className={'readonly'} style={{textAlign:"right"}} value={item?.age}/> {/* onChange={(e)=>{houseListOnChange(e, "EDIT", item, "age")}} */}
                                </td>
                                <td>
                                    <select name="color" value={item?.livingType} className='combo' onChange={(e)=>{houseListOnChange(e, "EDIT", item, "livingType")}}>
                                        <option value="본가">본가</option>
                                        <option value="월/전세">월/전세</option>
                                        <option value="매매">매매</option>
                                    </select>
                                </td>
                                <td style={{textAlign:"left"}}> 
                                    <input readOnly={item?.livingType === "본가" ? true : false} className={item?.livingType === "본가" ? "readonly" : ""} style={{textAlign:"right", width:"150px"}} value={item?.housePriceTotal?.toLocaleString('ko-KR')} onChange={(e)=>{houseListOnChange(e, "EDIT", item, "housePriceTotal")}}/>
                                    <span>원({toKoreanMoneyUnit(item?.housePriceTotal)})</span>
                                </td>
                                <td style={{textAlign:"left"}}> 
                                    <input style={{textAlign:"right", width:"150px"}} value={item?.houseCostMonthly?.toLocaleString('ko-KR')} onChange={(e)=>{houseListOnChange(e, "EDIT", item, "houseCostMonthly")}}/>
                                    <span>원({toKoreanMoneyUnit(item?.houseCostMonthly)})</span>
                                </td>
                            </tr>
                            </Fragment>
                            )
                        })}
                    </tbody>
                </table>

            </Fragment>
            : null}
            
            {house[0].livingType==="월/전세" || house[0].livingType==="매매"
            ? <Fragment>
            <p className="question-add">※ {house[0].livingType==="월/전세" ? "보증금" : "주택가"}<i>({toKoreanMoneyUnit(house[0].housePriceTotal)})</i>의 중 대출 정보를 입력해주세요.</p>
            <p>- 잔여 대출금 : <input className='btn1' value={houseLoanPrice.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"houseLoanPrice")}}/>({toKoreanMoneyUnit(houseLoanPrice)})</p>
            <p>- 대출 금리 : <input className='btn1' value={houseLoanRate} onChange={(e)=>{surveyOnChange(e,"houseLoanRate")}}/>%</p>
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
            <p>- <Mapping txt="ⓓ"/>잔여 대출금 : <input className='btn1' value={carLoan.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"carLoan")}}/>({toKoreanMoneyUnit(carLoan)}),
            대출금리 : <input className='btn1' value={carLoanRate.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"carLoanRate")}}/> %
            <span> (월 대출이자 : {toKoreanMoneyUnit(Math.round(carLoan*(carLoanRate/100)/12))})</span>
            
            </p>
            <p className="question-add">② 월 평균 차량 유지비 입력해주세요.(주유비 + 보험료 + 유지보수비 등...)</p>
            <p>- <Mapping txt="ⓔ"/> : <input className='btn1' value={carCostMonthly.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"carCostMonthly")}}/>({toKoreanMoneyUnit(carCostMonthly)})</p>
            <p className='note'>※ 차량 가격의 1.5% 이상의 월 유지비가 나옵니다. ex) 3000만원 자동차의 유지비 → 45만원</p>
        </Fragment>
        : null}
        </div>




        <div>
            <p className="question">(3) 현재 자산 현황을 입력해주세요.</p>
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