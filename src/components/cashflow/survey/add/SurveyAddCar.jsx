import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { numRound } from "@/utils/util";
import Mapping from '@/components/common/Mapping.jsx';
import { isValueExist, expCheckInt, expCheckDouble, toKoreanMoneyUnit } from '@/utils/util.js';
import minusIcon from "@/images/icon_del.png";

const SurveyAddCar = ({completeBtnClickCnt, commonCompleteLogic}) => {
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;

    const car = surveyData.add?.car ?? [];

    const carListOnChange = (e, div, _item, keyName) => {
        if(div === "DELETE"){
            const newCar = JSON.parse(JSON.stringify(car.filter((item)=>(item.seq != _item?.seq))))
                            .sort((a,b)=>(Number(a.age) - Number(b.age)))
                            .map((item,ii)=>{return {...item, seq:ii+1}});

            surveyData.add.car = newCar;
            dispatch(SvSave(surveyData));
        }
        if(div === "ADD"){
            const newCar = [...car];
            let maxAge = surveyData.my.age;
            if(newCar.length >= 1){ maxAge = newCar[newCar.length - 1].age; }

            newCar.push({
                seq:newCar.length + 1,
                age:maxAge,
                sellPrice:0,
                buyPrice:0,
                carCostMonthly:0,
                isReadOnly:false
            });
    
            surveyData.add.car = newCar;
            dispatch(SvSave(surveyData));
        }
        if(div==="EDIT"){
            let newValue = e.target.value;

            if(keyName === "age"){
                const ret = expCheckInt(e.target.value, 0, 100);
                if(ret === null){return;}
                else{newValue = ret;}
            } else if(keyName === "sellPrice" || keyName === "buyPrice" || keyName === "carCostMonthly"){
                const ret = expCheckInt(e.target.value, 0, 10000000000);
                if(ret === null){return;}
                else{newValue = ret;}
            }

            let newCar = JSON.parse(JSON.stringify(car));
            newCar = newCar.map((item, i)=>{
                if(item.seq == _item?.seq){
                    return {..._item, [keyName] : newValue};
                }else{
                    return item;
                }
            });

            surveyData.add.car = newCar;
            dispatch(SvSave(surveyData));
        }
    };

    useEffectNoMount(()=>{
        // 예외 체크
        let carCheck = {};
        car.forEach((item)=>{
            if(carCheck[item.age.toString()]){
                carCheck[item.age.toString()] += 1;
            }else{
                carCheck[item.age.toString()] = 1;
            }
        });
        let isCarValid = true;
        Object.keys(carCheck).forEach((keyItem)=>{
            if(carCheck[keyItem] >= 2){
                isCarValid = false;
            }
        })
        if(isCarValid === false){
            alert("중복된 나이를 입력하실 수 없습니다.");
            return;
        }

        //sort
        const newCar = [...surveyData.add.car]
                        .sort((a,b)=>(Number(a.age) - Number(b.age)))
                        .map((item,ii)=>{return {...item, seq:ii+1}});
        surveyData.add.car = newCar;

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return (
        <Fragment>
        <div>
            <p className="question">(1) 향후 차량 구매 정보를 입력해주세요.</p>
            <table className='survey-table'>
                <colgroup>
                    <col width={"10%"}/>
                    <col width={"10%"}/>
                    <col width={"25%"}/>
                    <col width={"25%"}/>
                    <col width={"20%"}/>
                    <col width={"10%"}/>
                </colgroup>
                <thead>
                    <tr>
                        <th>순번</th>
                        <th>나이</th>
                        <th>기존 차 판매가</th>
                        <th>신규 차 구매가</th>
                        <th>매월 차량유지비<br/><i style={{fontSize:"14px"}}>(주유비 + 보험료 + 유지보수비 등)</i></th>
                        <th><button className='btnAdd' onClick={(e)=>{carListOnChange(e, "ADD")}}>구매(+)</button></th>
                    </tr>
                </thead>
                <tbody>
                {surveyData.my.carYn == "Y"
                ? <tr>
                    <td>0</td>
                    <td>현재</td>
                    <td>-</td>
                    <td>-</td>
                    <td>{surveyData.my.carCostMonthly.toLocaleString('ko-KR')}원</td>
                    <td></td>
                </tr>
                : null}
                {car.map((item, i)=>{
                    return (
                        <tr key={i}>
                            <td>{item.seq}</td>
                            <td>
                                {item?.age == -1
                                ? "현재"
                                : <input style={{textAlign:"right"}} 
                                value={item?.age}
                                onChange={(e)=>{carListOnChange(e, "EDIT", item, "age")}}/>}
                            </td>
                            <td>
                                <input readOnly={(item.seq == 1 && surveyData.my.carYn == "N") ? true : false} 
                                        className={(item.seq == 1 && surveyData.my.carYn == "N") ? "readonly":""} 
                                        style={{textAlign:"right", width:"90%"}} 
                                        value={item?.sellPrice?.toLocaleString('ko-KR')}
                                        onChange={(e)=>{carListOnChange(e, "EDIT", item, "sellPrice")}}/>
                                <span style={{width:"10%"}}>원</span>
                            </td>
                            <td>
                                <input style={{textAlign:"right", width:"90%"}} 
                                        value={item?.buyPrice?.toLocaleString('ko-KR')}
                                        onChange={(e)=>{carListOnChange(e, "EDIT", item, "buyPrice")}}/>
                                <span style={{width:"10%"}}>원</span>
                            </td>
                            <td>
                                <input style={{textAlign:"right", width:"90%"}} 
                                        value={item?.carCostMonthly?.toLocaleString('ko-KR')}
                                        onChange={(e)=>{carListOnChange(e, "EDIT", item, "carCostMonthly")}}/>
                                <span style={{width:"10%"}}>원</span>
                            </td>
                            <td>{item?.isReadOnly === true ? null : <img src={minusIcon} alt="(-)" style={{width:"20px"}} onClick={(e)=>{carListOnChange(e, "DELETE", item)}}></img>}</td>
                        </tr>
                    )})}
                </tbody>
            </table>
        </div>
        </Fragment>
    )
}
export default SurveyAddCar;