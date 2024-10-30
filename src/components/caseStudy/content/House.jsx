import '@/components/caseStudy/caseStudy.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import newCashflowData from "@/components/caseStudy/chartData/House.json";

const House = ({children}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(CfSave(newCashflowData));
    });

    return (
        <Fragment>
        <div className="case-study-conten-top">
            <h4 className='title'>Case10. 주택매매 영끌하면?</h4>
            <p>영끌하면 자산이 늘어 풍요로워질까요?</p>
        </div>
        <div className="case-study-conten-top">
            <h4 className='title'>시뮬레이션</h4>
        </div>
        {children}
        
        <div className="case-study-conten-bottom">
            <h4 className='title'>시나리오</h4>
            <p>
                A: 28~55세(초봉2900만, 저축 월90만원 이상) → 34세(결혼 맞벌이, 전세3억, 아반떼구매) → 40세(전세5억) → 56~65세(재취업,기존연봉60%수준) → 65세(국민연금수령)
                <br/>B: 28~55세(초봉2900만, 저축 월90만원 이상) → 34세(결혼 맞벌이, 전세3억, 아반떼구매) → 40세(영끌 매매8억) → 56~65세(재취업,기존연봉60%수준) → 65세(국민연금수령)
            </p>
            <h4 className='title'>사견</h4>
            <p>
                A vs B : 40세에 5억전세 vs 40세에 8억 영끌매매를 시뮬레이션하였습니다. 
                <br/>대출규제 때문에 B와 같이 엄청난 양의 대출을 받기는 쉽지 않겠지만 극단적인 상황을 위해 40세에 2억6천만을 모은 상황에서 5억5천가량의 대출을 받는 것으로 가정하였습니다.
                <br/>주택 매매 이후 총 자산은 B가 많지만, 유동자산이 86세에 마이너스 자산에 도달한 모습입니다.
                <br/>물론 주택연금으로 노후의 생계를 유지할 수 있겠지만, 내 통장에 유동자산이 있고 없고는 심리적 안정감의 차이가 있지 않을까 싶습니다.
            </p>
        </div>
        </Fragment>
    )
}
export default House;