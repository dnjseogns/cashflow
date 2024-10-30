import '@/components/caseStudy/caseStudy.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import newCashflowData from "@/components/caseStudy/chartData/Car.json";

const Car = ({children}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(CfSave(newCashflowData));
    });

    return (
        <Fragment>
        <div className="case-study-conten-top">
            <h4 className='title'>Case11. 차 사면?</h4>
            <p>지금 차를 사도 될까요? 혹시 외제차를 사도 될까요?</p>
        </div>
        <div className="case-study-conten-top">
            <h4 className='title'>시뮬레이션</h4>
        </div>
        {children}
        
        <div className="case-study-conten-bottom">
            <h4 className='title'>시나리오</h4>
            <p>
                A : 28~55세(초봉2900만, 저축 월90만원 이상) → 30세(집매매3억, 국산차구매(3천만원,유지비30만)) → 56~65세(재취업,기존연봉60%수준) → 65세(국민연금수령)
                <br/>B : 28~55세(초봉2900만, 저축 월90만원 이상) → 35세(집매매3억, 국산차구매(3천만원,유지비30만)) → 56~65세(재취업,기존연봉60%수준) → 65세(국민연금수령)
                <br/>C : 28~55세(초봉2900만, 저축 월90만원 이상) → 35세(집매매3억, 외제차구매(1억,유지비100만)) → 56~65세(재취업,기존연봉60%수준) → 65세(국민연금수령)
            </p>
            <h4 className='title'>사견</h4>
            <p>
                A vs B : 자동차를 5년 일찍 사도 인생에 큰 변화를 주진 않는 것 같습니다.
                <br/>B vs C : 다만, 유지비가 높은 자동차일수록 노후에 큰 타격을 주고 있습니다.
                <br/>친구야, 테슬라는 나중에 돈 많이 벌면 사라
            </p>
        </div>
        </Fragment>
    )
}
export default Car;