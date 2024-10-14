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

    useEffectNoMount(()=>{

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return (
        <Fragment>
        <div>
            <p className="question">(1) 차량 구매 정보를 입력해주세요.</p>
            <table className='survey-table'>
                <colgroup>
                    <col width={"10%"}/>
                    <col width={"30%"}/>
                    <col width={"30%"}/>
                    <col width={"10%"}/>
                </colgroup>
                <thead>
                    <tr>
                        <th>나이</th>
                        <th>기존 자동차 판매 가격(원)</th>
                        <th>신규 자동차 구매 가격(원)</th>
                        <th><button className='btnAdd' onClick={(e)=>{houseListOnChange(e, "ADD")}}>추가(+)</button></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        </Fragment>
    )
}
export default SurveyAddCar;