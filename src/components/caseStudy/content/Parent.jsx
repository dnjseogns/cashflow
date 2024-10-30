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
        </div>
        {children}
        
        <div className="case-study-conten-bottom">
            <h4 className='title'>시나리오</h4>
            <p>
                A : 28~55세(초봉2900만, 저축 월90만원 이상) → 34세(매매3억, 아반떼구매) → 56~65세(재취업,기존연봉60%수준) → 65세(국민연금수령)
                <br/>B : 28~55세(초봉2900만, 저축 월90만원 이상) → 34세(매매3억, 아반떼구매) → 56~65세(재취업,기존연봉60%수준) → 56~61세(요양비 월80만원) → 65세(국민연금수령)
                <br/>C : 28~55세(초봉2900만, 저축 월90만원 이상) → 34세(매매3억, 아반떼구매) → 56~65세(재취업,기존연봉60%수준) → 56~61세(요양비 월300만원) → 65세(국민연금수령)
            </p>

            <h4 className='title'>사견</h4>
            <p>
                요양원 및 요양병원비는 월 80만원 ~ 300만원대로 금액이 다양하며, 노후준비가 제대로 안되신 부모님을 부양했을 경우를 시뮬레이션 하고자 하였습니다.
                <br/>A vs B : 장기요양등급을 받아 저렴하게 요양원에 부모님을 모실 경우, 어느정도 감내할만한 수준인 것 같습니다.
                <br/>B vs C : 5년 간의 부모님 요양병원비 지출만으로 자신의 노후 또한 위태로워지는 모습을 보여줍니다.
            </p>
        </div>
        </Fragment>
    )
}
export default Parent;