import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { numRound } from "@/utils/util";
import Mapping from '@/components/common/Mapping.jsx';
import { isValueExist, expCheckInt, expCheckDouble, toKoreanMoneyUnit } from '@/utils/util.js';
import minusIcon from "@/images/icon_del.png";

const SurveyAddCustomEvent = ({completeBtnClickCnt, commonCompleteLogic}) => {
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;

    const eventList = surveyData?.add?.eventList ?? [];

    const eventListOnChange = (e, div, _item, keyName) => {
        if(div === "ADD"){
            const newData = [...eventList];
            const seq = (newData.length + 1).toString();
            const newObj = {seq:seq, age:surveyData.my.age, name:"이벤트"+seq, div:"수입", price:0};
            newData.push(newObj);
    
            surveyData.add.eventList = newData;
            dispatch(SvSave(surveyData));
        }else if(div === "DELETE"){
            const newData = [...eventList.filter((item)=>(item.seq !== _item.seq))];
            surveyData.add.eventList = newData.map((item, i)=>{return {...item, seq:i+1}});
            dispatch(SvSave(surveyData));
        }else if(div === "EDIT"){
            let newValue = e.target.value;

            if(keyName === "age"){
                const ret = expCheckInt(e.target.value, 0, 100);
                if(ret === null){return;}
                else{newValue = ret;}
            }else if(keyName === "name"){
                if(newValue.length >=9){ return; }
            }else if(keyName === "div"){
                //
            }else if(keyName === "price"){
                const ret = expCheckInt(e.target.value, 0, 100000000000);
                if(ret === null){return;}
                else{newValue = ret;}
            }

            let newData = JSON.parse(JSON.stringify(eventList));
            newData = newData.map((item, i)=>{
                if(item.seq == _item?.seq){
                    return {...item, [keyName] : newValue};
                }else{
                    return item;
                }
            });
            surveyData.add.eventList = newData;
            dispatch(SvSave(surveyData));
        }
    }

    useEffectNoMount(()=>{
        let isGood = true;
        eventList.forEach((item)=>{
            if(item.age < surveyData.my.age){
                isGood = false;
            }
        });
        if(isGood === false){
            alert("이벤트 나이가 현재 나이보다 적을 수 없습니다.");
            return;
        }
        
        surveyData.add.eventList = eventList;

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return (
        <Fragment>
        <div>
            <p className="question">(1) 원하시는 이벤트를 추가해주세요.</p>
            <table className='survey-table'>
                <colgroup>
                    <col width={"10%"}/>
                    <col width={"20%"}/>
                    <col width={"20%"}/>
                    <col width={"10%"}/>
                    <col width={"20%"}/>
                    <col width={"10%"}/>
                </colgroup>
                <thead>
                    <tr>
                        <th>순번</th>
                        <th>나이</th>
                        <th>이벤트 명</th>
                        <th>구분</th>
                        <th>금액</th>
                        <th><button className='btnAdd' onClick={(e)=>{eventListOnChange(e, "ADD")}}>추가(+)</button></th>
                    </tr>
                </thead>
                <tbody>
                {eventList.map((item, i)=>{
                    return (<tr key={i}>
                        <td>{item.seq}</td>
                        <td>
                            <input style={{textAlign:"right"}} value={item?.age} onChange={(e)=>{eventListOnChange(e, "EDIT", item, "age")}}/>
                        </td>
                        <td>
                            <input style={{textAlign:"right"}} value={item?.name} onChange={(e)=>{eventListOnChange(e, "EDIT", item, "name")}}/>
                        </td>
                        <td>
                            <select className={"combo "}
                                name="divi" value={item?.div} onChange={(e)=>{eventListOnChange(e, "EDIT", item, "div")}}>
                                <option value="수입">수입</option>
                                <option value="지출">지출</option>
                            </select>
                        </td>
                        <td>
                            <input style={{textAlign:"right"}} value={item?.price.toLocaleString('ko-KR')} onChange={(e)=>{eventListOnChange(e, "EDIT", item, "price")}}/>
                        </td>
                        <td><img src={minusIcon} alt="(-)" style={{width:"20px"}} onClick={(e)=>{eventListOnChange(e, "DELETE", item)}}></img></td>
                    </tr>)
                    })}
                </tbody>
            </table>
            <p className="note">※ 예시 : 로또 10억, 사기 -1천만원 등...</p>
        </div>
        </Fragment>
    )
}
export default SurveyAddCustomEvent;