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
        </div>

        {children}
        
        <div className="case-study-conten-bottom">
            <h4 className='title'>시나리오</h4>
            <p>A : 28~55세(초봉2900만,저축 월90만원 이상) → 34세(결혼 맞벌이, 전세3억, 아반떼구매) → 36세(아이 1명 출산) → 40세(집매매6억) → 56~65세(재취업,기존연봉60%수준) → 65세(국민연금수령)</p>

            <h4 className='title'>평범하고 성실한 어느 회사원 이야기</h4>
            <p>
                28~33세 : 다행스럽게도 학자금대출 없이 사회생활을 시작합니다. 초봉은 2900만원입니다. 자취비로 매월 50만원씩 지출하고 있음에도, 40~60% 대의 저축을 이어가며 33세까지 약 8000만원 가량의 자금을 모으게 됩니다. 
                <br/>34~55세 : 34세에 결혼하여 3억전세 시작, 아반떼 차량을 구매합니다. 부부는 맞벌이를 유지합니다.
                <br/>36세 : 아이 1명을 출산합니다.
                <br/>40세 : 결혼 후 6년간 약 3억원까지 모았으며, 6억대 아파트를 매매합니다.
                <br/>56~65세 : 55세 은퇴 후, 재취업하여 65세까지 근무합니다. 연봉은 기존연봉의 60%대로 떨어집니다.
                <br/>65세 : 국민연금을 받습니다. 지금까지 모아둔 자산을 사용하며 노후를 보냅니다.
                <br/>97세 : 유동자산을 모두 사용하였고, 남은 여생은 주택연금으로 생계를 유지합니다.
            </p>
            <h4 className='title'>사견</h4>
            <p>
                위 그래프에선 사회초년생부터 적지 않은 금액인 40~50% 대의 저축을 이어나갔지만, 노후에 유동자금은 없고 실거주 중인 집 한 채만 남은 상황을 보여줍니다.
                <br/>만약 추가적인 지출(둘째 출산, 부모님 요양 등) 이벤트가 발생하게 된다면, 유동자금 확보를 위해 주택연금으로 노년의 생계를 유지했을 것 같습니다.
            </p>
        </div>
        </Fragment>
    )
}
export default Old;