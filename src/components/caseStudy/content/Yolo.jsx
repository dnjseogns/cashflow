import '@/components/caseStudy/caseStudy.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import newCashflowData from "@/components/caseStudy/chartData/Yolo.json";

const Yolo = ({children}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(CfSave(newCashflowData));
    });

    return (
        <Fragment>
        <div className="case-study-conten-top">
            <h4 className='title'>Case2. YOLO로 살면?</h4>
            <p>You Only Live Once의 약자로, "인생은 오직 한 번뿐"이라는 의미를 가졌다.</p>
        </div>
        <div className="case-study-conten-top">
            <h4 className='title'>시뮬레이션</h4>
        </div>
        {children}
        
        <div className="case-study-conten-bottom">
            <h4 className='title'>요약</h4>
            <p>A : 28~55세(초봉2900만,저축10%이상) → 34세(아반떼구매) → 40세(집매매3억) → 55세~65세(재취업,기존연봉60%) → 65세(국민연금수령)</p>
            
            <h4 className='title'>욜로 이야기</h4>
            <p>
                28~55세 : 초봉은 2900만원입니다. 욜로 라이프를 즐기며 소비를 아끼지 않고 친구들과의 소중한 지금 이 순간을 더 중요하게 생각합니다. 하지만 미래에 대한 막연한 두려움으로 10% 이상의 저축을 합니다.
                <br/>34세 : 급여가 오른 만큼 여유자금이 생기게 되어, 아반떼 차량을 구매합니다.
                <br/>40세 : 약 1억5천가량 모았으며, 주거비를 줄이고자 혼자 살기 적당한 3억대 빌라를 매매합니다.
                <br/>56~65세 : 55세 은퇴 후, 재취업하여 65세까지 근무합니다. 연봉은 기존연봉의 60%대로 떨어집니다. 이전의 소비패턴을 유지하여 자산이 점차 감소합니다.
                <br/>72세 : 근로소득이 끊기는 시점으로부터 멀지 않는 나이인 72세에 마이너스 유동자산에 도달합니다.
                <br/>83세 : 마이너스 자산에 도달합니다.
            </p>
            <h4 className='title'>사견</h4>
            <p>
                YOLO는 평생 일하고 싶다는 말인 것 같습니다.
            </p>
        </div>
        </Fragment>
    )
}
export default Yolo;