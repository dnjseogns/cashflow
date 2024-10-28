import '@/components/caseStudy/caseStudy.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import newCashflowData from "@/components/caseStudy/chartData/Parent.json";

const Parent = ({children}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(CfSave(newCashflowData));
    });

    return (
        <Fragment>
        <div className="case-study-conten-top">
            <h4 className='title'>Case6. 부모님을 부양하면?</h4>
            <p></p>
        </div>
        <div className="case-study-conten-top">
            <h4 className='title'>시뮬레이션</h4>
            <p>
                A : 28세(초봉2900만,저축40%) → 34세(전세3억, 차량구매) → 45세(집매매6억) → 55세(은퇴 후 재취업하여 65세까지 근무) → 65세(국민연금수령)
                <br/>B : 28세(초봉2900만,저축40%) → 34세(전세3억, 차량구매) → 45세(집매매6억) → 55세(은퇴 후 재취업하여 65세까지 근무) → 56~60세(요양비 월80만) → 65세(국민연금수령)
                <br/>C : 28세(초봉2900만,저축40%) → 34세(전세3억, 차량구매) → 45세(집매매6억) → 55세(은퇴 후 재취업하여 65세까지 근무) → 56~60세(요양비 월300만) → 65세(국민연금수령)
            </p>
        </div>
        {children}
        
        <div className="case-study-conten-bottom">
            <h4 className='title'>사견</h4>
            <p>
                요양원 및 요양병원비는 월 80만원 ~ 300만원대로 금액이 다양하며, 노후준비가 제대로 안되신 부모님을 부양했을 경우를 시뮬레이션 하고자 하였습니다.
                <br/>A vs B : 장기요양등급을 받아 저렴하게 요양원에 부모님을 모실 경우, 경제적으로 큰 문제는 없을 것 같습니다.
                <br/>B vs C : 단, 5년 간의 부모님 요양병원비 지출만으로 자신의 노후가 위태로워지는 모습을 보여줍니다.
            </p>
        </div>
        </Fragment>
    )
}
export default Parent;