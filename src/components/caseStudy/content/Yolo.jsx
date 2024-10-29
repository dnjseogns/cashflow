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
            <p>A : 28세(초봉2900만,저축10%이상) → 34세(아반떼구매) → 40세(집매매3억) → 55세(은퇴 후 재취업하여 65세까지 근무) → 65세(국민연금수령)</p>
        </div>
        {children}
        
        <div className="case-study-conten-bottom">
            <h4 className='title'>사견</h4>
            <p>
                <span>최소한의 저축은 유지하는 YOLO를 시뮬레이션하고자 하였습니다.</span>
                <br/><span>특이한 점은, 55세~65세 재취업하여 근소소득이 있음에도 이전의 소비패턴을 통제하지 못하여 자산이 계속해서 감소한다는 점입니다.</span>
                <br/><span>근로소득이 끊기는 시점으로부터 멀지 않는 나이인 73세에 마이너스 유동자산을, 84세에 마이너스 자산에 도달하게 됩니다.</span>
                <br/><span>YOLO로 산다는 말은 다르게 표현하면 평생 일하고 싶다는 말인 것 같습니다.</span>
            </p>
        </div>
        </Fragment>
    )
}
export default Yolo;