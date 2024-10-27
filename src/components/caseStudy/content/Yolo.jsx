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
            <p>A : 26세(초봉2600만, 10%저축) → 싱글라이프 → 55세(은퇴 후 재취업하여 65세까지 근무) → 65세(국민연금수령)</p>
        </div>
        {children}
        
        <div className="case-study-conten-bottom">
            <h4 className='title'>사견</h4>
            <p>
                당연한 결과이지만, 일을 그만두는 순간부터 자산이 바닥남.
            </p>
        </div>
        </Fragment>
    )
}
export default Yolo;