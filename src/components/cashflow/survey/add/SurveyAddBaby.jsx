import { Fragment, useEffect, useRef, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';
import { numRound } from "@/utils/util";
import plusIcon from "@/images/icon_add.png";
import minusIcon from "@/images/icon_del.png";
import Mapping from '@/components/common/Mapping.jsx';
import { isValueExist, expCheckInt, expCheckDouble, toKoreanMoneyUnit } from '@/utils/util.js';

const SurveyAddBaby = ({completeBtnClickCnt, commonCompleteLogic}) => {
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;

    const curBabyYn = surveyData?.add?.curBabyYn ?? "N";
    const curBabyList = surveyData?.add?.curBabyList ?? [];
    const willBabyYn = surveyData?.add?.willBabyYn ?? "N";
    const willBabyList = surveyData?.add?.willBabyList ?? [];

    const yearGap = (new Date().getFullYear() - 2017);
    const preSchool = surveyData?.add?.preSchool ?? Math.round(53780000/6 * Math.pow(1.03, yearGap));
    const elementarySchool = surveyData?.add?.elementarySchool ?? Math.round(87120000/6 * Math.pow(1.03, yearGap));
    const middleSchool = surveyData?.add?.middleSchool ?? Math.round(52920000/3 * Math.pow(1.03, yearGap));
    const highSchool = surveyData?.add?.highSchool ?? Math.round(67680000/3 * Math.pow(1.03, yearGap));
    const university = surveyData?.add?.university ?? Math.round(86400000/4 * Math.pow(1.03, yearGap));
    
    const dispatchValue = (div, value) => {
        if(value === null){return;}
        else{ surveyData.add[div] = value;}
    }
    const surveyOnChange = (e, div) => {
        if(div==="curBabyYn"){
            surveyData.add.curBabyYn = e.target.value;
        }else if(div==="willBabyYn"){
            surveyData.add.willBabyYn = e.target.value;
        }else{
            dispatchValue(div, expCheckInt(e.target.value, 0, 10000000000));
        }
        
        dispatch(SvSave(surveyData));
    };

    const curBabyListOnChange = (e, div, _item, keyName) => {
        if(div === "ADD"){
            const newCurBabyList = [...curBabyList];
            const seq = (newCurBabyList.length + 1).toString();
            const newObj = {seq:seq, age:0};
            newCurBabyList.push(newObj);
    
            surveyData.add.curBabyList = newCurBabyList;
            dispatch(SvSave(surveyData));
        }else if(div === "DELETE"){
            const newCurBabyList = [...curBabyList.filter((item)=>(item.seq !== _item.seq))];
            surveyData.add.curBabyList = newCurBabyList.map((item, i)=>{return {...item, seq:i+1}});
            dispatch(SvSave(surveyData));
        }else if(div === "EDIT"){
            let newValue = e.target.value;
            if(keyName === "age"){
                const ret = expCheckInt(e.target.value, 0, 100);
                if(ret === null){return;}
                else{newValue = ret;}
            }

            let newCurBabyList = JSON.parse(JSON.stringify(curBabyList));
            newCurBabyList = newCurBabyList.map((item, i)=>{
                if(item.seq == _item?.seq){
                    return {...item, [keyName] : newValue};
                }else{
                    return item;
                }
            });
            surveyData.add.curBabyList = newCurBabyList;
            dispatch(SvSave(surveyData));
        }
    }

    
    const willBabyListOnChange = (e, div, _item, keyName) => {
        if(div === "ADD"){
            const newWillBabyList = [...willBabyList];
            const seq = (newWillBabyList.length + 1).toString();
            const newObj = {seq:seq, age:surveyData.my.age};
            newWillBabyList.push(newObj);
    
            surveyData.add.willBabyList = newWillBabyList;
            dispatch(SvSave(surveyData));
        }else if(div === "DELETE"){
            const newWillBabyList = [...willBabyList.filter((item)=>(item.seq !== _item.seq))];
            surveyData.add.willBabyList = newWillBabyList.map((item, i)=>{return {...item, seq:i+1}});
            dispatch(SvSave(surveyData));
        }else if(div === "EDIT"){
            let newValue = e.target.value;
            if(keyName === "age"){
                const ret = expCheckInt(e.target.value, 0, 100);
                if(ret === null){return;}
                else{newValue = ret;}
            }

            let newWillBabyList = JSON.parse(JSON.stringify(willBabyList));
            newWillBabyList = newWillBabyList.map((item, i)=>{
                if(item.seq == _item?.seq){
                    return {...item, [keyName] : newValue};
                }else{
                    return item;
                }
            });
            surveyData.add.willBabyList = newWillBabyList;
            dispatch(SvSave(surveyData));
        }
    }

    useEffectNoMount(()=>{
        if(surveyData?.add?.curBabyYn === "Y"){
            surveyData.add.curBabyYn = curBabyYn;
            surveyData.add.curBabyList = curBabyList;
        }else{
            surveyData.add.curBabyYn = curBabyYn;
            surveyData.add.curBabyList = [];
        }

        if(surveyData?.add?.willBabyYn === "Y"){
            surveyData.add.willBabyYn = willBabyYn;
            surveyData.add.willBabyList = willBabyList;
        }else{
            surveyData.add.willBabyYn = willBabyYn;
            surveyData.add.willBabyList = [];
        }

        surveyData.add.preSchool = preSchool;
        surveyData.add.elementarySchool = elementarySchool;
        surveyData.add.middleSchool = middleSchool;
        surveyData.add.highSchool = highSchool;
        surveyData.add.university = university;

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return (
        <Fragment>
        <div>
            <p className="question">(1) 현재 아기가 있습니까?</p>
            <p className="radio-wrap">
                <input type="radio" name="curBabyYn" id="curBabyYn_N" value="N" checked={curBabyYn==="N"?true:false} onChange={(e)=>{surveyOnChange(e,"curBabyYn")}}/><label htmlFor="curBabyYn_N">아니오</label>
                <input type="radio" name="curBabyYn" id="curBabyYn_Y" value="Y" checked={curBabyYn==="Y"?true:false} onChange={(e)=>{surveyOnChange(e,"curBabyYn")}}/><label htmlFor="curBabyYn_Y">예</label>
            </p>
            {curBabyYn==="Y"
            ?<table className='survey-table'>
                <colgroup>
                    <col width={"10%"}/>
                    <col width={"30%"}/>
                    <col width={"10%"}/>
                    <col width={"50%"}/>
                </colgroup>
                <thead>
                    <tr>
                        <th>순번</th>
                        <th>아기 만 나이(세)</th>
                        <th><button className='btnAdd' onClick={(e)=>{curBabyListOnChange(e, "ADD")}}>추가(+)</button></th>
                    </tr>
                </thead>
                <tbody>
                    {curBabyList.map((item, i)=>{
                    return (<tr key={i}>
                        <td>{item.seq}</td>
                        <td>
                            <input style={{textAlign:"right"}} value={item?.age} onChange={(e)=>{curBabyListOnChange(e, "EDIT", item, "age")}}/>
                        </td>
                        <td><img src={minusIcon} alt="(-)" style={{width:"20px"}} onClick={(e)=>{curBabyListOnChange(e, "DELETE", item)}}></img></td>
                    </tr>)
                    })}
                </tbody>
            </table>
            : null}
        </div>


        <div>
            <p className="question">(2) 아기를 낳으시겠습니까?</p>
            <p className="radio-wrap">
                <input type="radio" name="willBabyYn" id="willBabyYn_N" value="N" checked={willBabyYn==="N"?true:false} onChange={(e)=>{surveyOnChange(e,"willBabyYn")}}/><label htmlFor="willBabyYn_N">아니오</label>
                <input type="radio" name="willBabyYn" id="willBabyYn_Y" value="Y" checked={willBabyYn==="Y"?true:false} onChange={(e)=>{surveyOnChange(e,"willBabyYn")}}/><label htmlFor="willBabyYn_Y">예</label>
            </p>
            {willBabyYn==="Y"
            ?<table className='survey-table'>
                <colgroup>
                    <col width={"10%"}/>
                    <col width={"30%"}/>
                    <col width={"10%"}/>
                    <col width={"50%"}/>
                </colgroup>
                <thead>
                    <tr>
                        <th>순번</th>
                        <th>나의 출산 예정 만 나이(세)</th>
                        <th><button className='btnAdd' onClick={(e)=>{willBabyListOnChange(e, "ADD")}}>추가(+)</button></th>
                    </tr>
                </thead>
                <tbody>
                    {willBabyList.map((item, i)=>{
                    return (<tr key={i}>
                        <td>{item.seq}</td>
                        <td>
                            <input style={{textAlign:"right"}} value={item?.age} onChange={(e)=>{willBabyListOnChange(e, "EDIT", item, "age")}}/>
                        </td>
                        <td><img src={minusIcon} alt="(-)" style={{width:"20px"}} onClick={(e)=>{willBabyListOnChange(e, "DELETE", item)}}></img></td>
                    </tr>)
                    })}
                </tbody>
            </table>
            : null}
        </div>
        {curBabyYn==="Y" || willBabyYn==="Y"
        ? <div>
            <p className="question">(3) 연평균 양육비를 입력해주세요.</p>
            <p>- 미취학 : <input className='btn1' value={preSchool.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"preSchool")}}/>({toKoreanMoneyUnit(preSchool)})</p>
            <p>- 초등학교 : <input className='btn1' value={elementarySchool.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"elementarySchool")}}/>({toKoreanMoneyUnit(elementarySchool)})</p>
            <p>- 중학교 : <input className='btn1' value={middleSchool.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"middleSchool")}}/>({toKoreanMoneyUnit(middleSchool)})</p>
            <p>- 고등학교 : <input className='btn1' value={highSchool.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"highSchool")}}/>({toKoreanMoneyUnit(highSchool)})</p>
            <p>- 대학교 : <input className='btn1' value={university.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"university")}}/>({toKoreanMoneyUnit(university)})</p>
            <p className='note'>※ 참고사이트 : 동아일보 - 통계로 보는 임신·출산·양육</p>
        </div>
        : null}
        </Fragment>
    )
}
export default SurveyAddBaby;