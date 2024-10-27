import '@/components/caseStudy/caseStudy.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import newCashflowData from "@/components/caseStudy/chartData/Old.json";

const Old = ({children}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(CfSave(newCashflowData));
    });

    return (
        <Fragment>
        <div className="case-study-conten-top">
            <h4 className='title'>Case1. 노인빈곤율 OECD 1위</h4>
            <p>
                OECD의 '한눈에 보는 연금 2023' (Pension at a glance 2023) 자료를 보면 2020년 기준으로 한국의 66세 이상 노인 인구의 소득 빈곤율은 40.4%로, OECD 회원국 평균(14.2%)보다 3배 가까이 높았다.
                <span className='note'> (참고 - https://www.yna.co.kr/view/AKR20240308073800530)</span>
            </p>
        </div>
        <div className="case-study-conten-top">
            <h4 className='title'>시뮬레이션</h4>
            {/* <p>⊙ 26 ~ 55세 : 회사 근무 ⊙ 56 ~ 65세 : 재취업
            <br/>⊙ 65세 : 국민연금수령
            </p>
            <p></p>
            <p>⊙ 65세 : 국민연금수령</p> */}
            <p>⊙ 32살(결혼) ⊙ 34살(아이 한 명 가짐) ⊙ 55세(은퇴 후 재취업하여 65세까지 근무) ⊙ 65세(국민연금수령)</p>
        </div>
        {children}
        
        <div className="case-study-conten-bottom">
            <h4 className='title'>사견</h4>
            <p>
                급전 이벤트 발생 시...
            </p>
        </div>
        </Fragment>
    )
}
export default Old;