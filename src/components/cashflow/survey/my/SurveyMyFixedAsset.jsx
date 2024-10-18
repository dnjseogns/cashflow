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
function SurveyMyFixedAsset({completeBtnClickCnt, commonCompleteLogic}){
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;

    //house
    const houseYn = surveyData.my?.houseYn ?? "N";
    const house = surveyData.my?.house ?? [{
        seq:1,
        age:-1,
        livingType:"월/전세",
        housePriceTotal:0,
        houseCostMonthly:0,
        isReadOnly:true
    }];
    const houseLoanPrice = surveyData.my?.houseLoanPrice ?? 0;
    const houseLoanRate = surveyData.my?.houseLoanRate ?? surveyData.base.loanInterest;

    //car
    const carYn = surveyData.my?.carYn ?? "N";
    const carLoanPrice = surveyData.my?.carLoanPrice ?? 0;
    const carLoanRate = surveyData.my?.carLoanRate ?? surveyData.base.loanInterest;
    const carCostMonthly = surveyData.my?.carCostMonthly ?? 0;




    const dispatchValue = (div, value) => {
        if(value === null){return;}
        else{ surveyData.my[div] = value;}
    }
    const surveyOnChange = (e, div) => {
        // 집
        if(div === "houseYn"){
            surveyData.my.houseYn = e.target.value;
            if(surveyData.my.houseYn === "N"){surveyData.my.houseLoanPrice = 0;}
        }
        if(div === "houseLoanPrice"){
            dispatchValue(div, expCheckInt(e.target.value, 0, house[0].housePriceTotal));
        }else if(div === "houseLoanRate"){
            dispatchValue(div, expCheckDouble(e.target.value, 0, 100, 5));
        }

        // 차
        if(div === "carYn"){
            surveyData.my.carYn = e.target.value;
        } else if(div === "carLoanPrice"){
            dispatchValue(div, expCheckInt(e.target.value, 0, 10000000000));
        } else if(div === "carLoanRate"){
            dispatchValue(div, expCheckDouble(e.target.value, 0, 100, 5));
        } else if(div === "carCostMonthly"){
            dispatchValue(div, expCheckInt(e.target.value, 0, 1000000000));
        }

        dispatch(SvSave(surveyData));
    };




    useEffectNoMount(()=>{
        // 집
        if(surveyData.my?.houseYn === "N"){
            surveyData.my.houseYn = houseYn;
            surveyData.my.house = [{
                seq:1,
                age:-1,
                livingType:"월/전세",
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
            surveyData.my.carYn = carYn;
            surveyData.my.carLoanPrice = carLoanPrice;
            surveyData.my.carLoanRate = carLoanRate;
            surveyData.my.carCostMonthly = carCostMonthly;
        }else{
            surveyData.my.carYn = carYn;
            surveyData.my.carLoan = 0;
            surveyData.my.carLoanRate = carLoanRate;
            surveyData.my.carCostMonthly = 0;
        }

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    
    const houseListOnChange = (e, div, _item, keyName) => {
        if(div==="EDIT"){
            let newValue = e.target.value;

            if(keyName === "housePriceTotal" || keyName === "houseCostMonthly"){
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
            <p className="question">(1) 독립하여 살고 계신가요?</p>
            <p className="radio-wrap">
                <input type="radio" name="houseYn" id="houseYn_N" value="N" checked={houseYn==="N"?true:false} onChange={(e)=>{surveyOnChange(e,"houseYn")}}/><label htmlFor="houseYn_N">아니오</label>
                <input type="radio" name="houseYn" id="houseYn_Y" value="Y" checked={houseYn==="Y"?true:false} onChange={(e)=>{surveyOnChange(e,"houseYn")}}/><label htmlFor="houseYn_Y">예</label>
            </p>
            {houseYn === "Y"
            ?<Fragment>
                <p className="question-add">※ 거주 정보를 입력해주세요.</p>
                <table className='survey-table'>
                    <colgroup>
                        {/* <col width={"10%"}/>
                        <col width={"10%"}/> */}
                        <col width={"20%"}/>
                        <col width={"30%"}/>
                        <col width={"30%"}/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>주거 형태</th>
                            <th><Mapping txt="(ⓔ)"/>{house[0].livingType==="월/전세" ? "보증금" : "주택가"}</th>
                            <th><Mapping txt="(ⓒ)"/>월 주거비<i style={{fontSize:"14px"}}>{house[0].livingType==="월/전세" ? "(월세+ 관리비+ 공과금 등)" : "(관리비+ 공과금 등)"}</i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {house.map((item, i)=>{
                            return (
                            <Fragment key={i}>
                            <tr>
                                <td>
                                    <select name="color" value={item?.livingType} className='combo' onChange={(e)=>{houseListOnChange(e, "EDIT", item, "livingType")}}>
                                        <option value="월/전세">월/전세</option>
                                        <option value="매매">매매</option>
                                    </select>
                                </td>
                                <td style={{textAlign:"left"}}> 
                                    <input style={{textAlign:"right", width:"50%"}} value={item?.housePriceTotal?.toLocaleString('ko-KR')} onChange={(e)=>{houseListOnChange(e, "EDIT", item, "housePriceTotal")}}/>
                                    <i style={{display:"inline-block", width:"50%"}}>원 ({toKoreanMoneyUnit(item?.housePriceTotal)})</i>
                                </td>
                                <td style={{textAlign:"left"}}> 
                                    <input style={{textAlign:"right", width:"50%"}} value={item?.houseCostMonthly?.toLocaleString('ko-KR')} onChange={(e)=>{houseListOnChange(e, "EDIT", item, "houseCostMonthly")}}/>
                                    <i style={{display:"inline-block", width:"50%"}}>원 ({toKoreanMoneyUnit(item?.houseCostMonthly)})</i>
                                </td>
                            </tr>
                            </Fragment>
                            )
                        })}
                    </tbody>
                </table>

                <p className="question-add">※ {house[0].livingType==="월/전세" ? "보증금" : "주택가"}<i>({toKoreanMoneyUnit(house[0].housePriceTotal)})</i>의 중 대출 정보를 입력해주세요.</p>
                <p>- 잔여 대출금<Mapping txt="(ⓐ)"/> : <input className='btn1' value={houseLoanPrice.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"houseLoanPrice")}}/>({toKoreanMoneyUnit(houseLoanPrice)})</p>
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
            <p className="question-add">※ 자동차 대출 정보를 입력해주세요.</p>
            <p>- 잔여 대출금<Mapping txt="(ⓑ)"/> : <input className='btn1' value={carLoanPrice.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"carLoanPrice")}}/>({toKoreanMoneyUnit(carLoanPrice)})</p>
            <p>- 대출 금리 : <input className='btn1' value={carLoanRate} onChange={(e)=>{surveyOnChange(e,"carLoanRate")}}/>%</p>

            <p className="question-add">※ 월 평균 차량 유지비 입력해주세요.<i style={{fontSize:"14px"}}>(주유비 + 보험료 + 유지보수비 등)</i></p>
            <p>- <Mapping txt="ⓓ"/> : <input className='btn1' value={carCostMonthly.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"carCostMonthly")}}/>({toKoreanMoneyUnit(carCostMonthly)})</p>
            <p className='note'>※ 차량 가격의 1.5% 이상의 월 유지비가 나옵니다. ex) 3000만원 자동차의 유지비 → 45만원</p>
        </Fragment>
        : null}
        </div>
    </Fragment>);
}
export default SurveyMyFixedAsset;