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

    const houseListOnChange = (e, div, _item, keyName) => {
        if(div === "DELETE"){

        }
        if(div === "ADD"){
            const newHouse = [...house];
            newHouse.push({
                seq:newHouse.length + 1,
                age:surveyData.my.age + 1,
                livingType:"월/전세",
                housePriceTotal:0,
                houseCostMonthly:0,
                isReadOnly:false
            });
    
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
            <p className="question">(1) 주거정보를 입력해주세요.</p>
            
            <table className='survey-table'>
                <colgroup>
                    <col width={"10%"}/>
                    <col width={"10%"}/>
                    <col width={"20%"}/>
                    <col width={"30%"}/>
                    <col width={"20%"}/>
                    <col width={"10%"}/>
                </colgroup>
                <thead>
                    <tr>
                        <th>순번</th>
                        <th>나이</th>
                        <th>주거 형태</th>
                        <th>보증금<i style={{fontSize:"14px"}}>(전/월세)</i> or <br/> 주택가<i style={{fontSize:"14px"}}>(매매)</i></th>
                        <th>월 주거비<i style={{fontSize:"14px"}}><br/>(월세+ 관리비+ 공과금 등)</i></th>
                        <th><button className='btnAdd' onClick={(e)=>{houseListOnChange(e, "ADD")}}>이사(+)</button></th>
                    </tr>
                </thead>
                <tbody>
                    {house.map((item, i)=>{
                        console.log("item",item);
                        return (
                        <tr key={i}>
                            <td>{item?.seq}</td>
                            <td>
                                <input readOnly={true} className={'readonly'} style={{textAlign:"right"}} value={item?.age}/> {/* onChange={(e)=>{houseListOnChange(e, "EDIT", item, "age")}} */}
                            </td>
                            <td>
                                <select disabled={item?.isReadOnly ?? false} className={"combo " + (item?.isReadOnly ? "readonly":"")}
                                    name="color" value={item?.livingType} onChange={(e)=>{houseListOnChange(e, "EDIT", item, "livingType")}}>
                                    <option value="월/전세">월/전세</option>
                                    <option value="매매">매매</option>
                                </select>
                            </td>
                            <td style={{textAlign:"left"}}> 
                                <input readOnly={item?.isReadOnly ?? false} className={item?.isReadOnly ? "readonly":""}
                                    style={{textAlign:"right", width:"50%"}} value={item?.housePriceTotal?.toLocaleString('ko-KR')} onChange={(e)=>{houseListOnChange(e, "EDIT", item, "housePriceTotal")}}/>
                                <i style={{display:"inline-block", width:"50%"}}>원 ({toKoreanMoneyUnit(item?.housePriceTotal)})</i>
                            </td>
                            <td style={{textAlign:"left"}}> 
                                <input readOnly={item?.isReadOnly ?? false} className={item?.isReadOnly ? "readonly":""}
                                    style={{textAlign:"right", width:"50%"}} value={item?.houseCostMonthly?.toLocaleString('ko-KR')} onChange={(e)=>{houseListOnChange(e, "EDIT", item, "houseCostMonthly")}}/>
                                <i style={{display:"inline-block", width:"50%"}}>원 ({toKoreanMoneyUnit(item?.houseCostMonthly)})</i>
                            </td>
                            <td>{item?.isReadOnly === true ? null : <img src={minusIcon} alt="(-)" style={{width:"20px"}} onClick={(e)=>{houseListOnChange(e, "DELETE", item)}}></img>}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        </Fragment>
    )
}
export default SurveyAddHouse;