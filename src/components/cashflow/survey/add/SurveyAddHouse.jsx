import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { numRound } from "@/utils/util";
import Mapping from '@/components/common/Mapping.jsx';
import { isValueExist, expCheckInt, expCheckDouble, toKoreanMoneyUnit } from '@/utils/util.js';
import minusIcon from "@/images/icon_del.png";

const SurveyAddHouse = ({completeBtnClickCnt, commonCompleteLogic}) => {
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;

    const house = surveyData.add?.house ?? [];

    // const dispatchValue = (div, value) => {
    //     if(value === null){return;}
    //     else{ surveyData.add[div] = value;}
    // }
    // const surveyOnChange = (e, div) => {
        
    //     dispatch(SvSave(surveyData));
    // };

    
    const houseListOnChange = (e, div, _item, keyName) => {
        if(div === "ADD"){
            const newHouse = [...house];
            newHouse.push({age:surveyData.my.age, type:"전세", price:300000000, rate:0, isReadOnly:false});
    
            surveyData.add.house = newHouse;
            dispatch(SvSave(surveyData));
        }
    }

    useEffectNoMount(()=>{

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return (
        <Fragment>
        <div>
            <p className="question">(1) 주거형태를 입력해주세요.</p>
            <table className='survey-table'>
                <colgroup>
                    <col width={"10%"}/>
                    <col width={"20%"}/>
                    <col width={"30%"}/>
                    <col width={"30%"}/>
                    <col width={"10%"}/>
                </colgroup>
                <thead>
                    <tr>
                        <th>나이</th>
                        <th>주거 형태</th>
                        <th>주택가(원)</th>
                        <th>주택가 상승률(%)</th>
                        <th><button className='btnAdd' onClick={(e)=>{houseListOnChange(e, "ADD")}}>추가(+)</button></th>
                    </tr>
                </thead>
                <tbody>
                    {house.map((item, i)=>{
                        return (
                        <tr key={i}>
                            <td>
                                <input readOnly={item?.isReadOnly ?? false} className={item?.isReadOnly ? 'readonly' : ''} 
                                style={{textAlign:"right"}} value={item?.age} onChange={(e)=>{houseListOnChange(e, "EDIT", item, "age")}}/>
                            </td>
                            <td>
                                <select name="color" value={item.type} 
                                    className={'combo '+(item?.isReadOnly ? 'readonly' : '')} disabled={item?.isReadOnly ? true : false} >
                                    <option value="전세">월/전세</option>
                                    <option value="매매">매매</option>
                                </select>
                            </td>
                            <td>
                                <input readOnly={item?.isReadOnly ?? false} className={item?.isReadOnly ? 'readonly' : ''} 
                                style={{textAlign:"right"}} value={item?.price.toLocaleString('ko-KR')} onChange={(e)=>{houseListOnChange(e, "EDIT", item, "price")}}/>
                            </td>
                            <td style={{textAlign:"right"}}> {item?.rate} </td>
                            <td><img src={minusIcon} alt="(-)" style={{width:"20px"}} onClick={(e)=>{houseListOnChange(e, "DELETE", item)}}></img></td>
                        </tr>
                        )
                    })}
                    {/* {house.map((item, i)=>{
                    return (<tr key={i}>
                        <td>{item.seq}</td>
                        <td>
                            <input style={{textAlign:"right"}} value={item?.age} onChange={(e)=>{curBabyListOnChange(e, "EDIT", item, "age")}}/>
                        </td>
                        <td><img src={minusIcon} alt="(-)" style={{width:"20px"}} onClick={(e)=>{curBabyListOnChange(e, "DELETE", item)}}></img></td>
                    </tr>)
                    })} */}
                </tbody>
            </table>
        </div>
        </Fragment>
    )
}
export default SurveyAddHouse;