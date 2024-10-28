import '@/components/caseStudy/caseStudy.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import newCashflowData from "@/components/caseStudy/chartData/Bank.json";

const Bank = ({children}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(CfSave(newCashflowData));
    });

    return (
        <Fragment>
        <div className="case-study-conten-top">
            <h4 className='title'>Case7. 예금만 하면?</h4>
            <p>투자를 </p>
        </div>
        <div className="case-study-conten-top">
            <h4 className='title'>시뮬레이션</h4>
        </div>
        {children}
        
        <div className="case-study-conten-bottom">
            <h4 className='title'>사견</h4>
            <p>
                예금(2.7%)과 우량주배당(4.0%)의 투자비율을 조정했을 때의 상황을 시뮬레이션 하고자 하였습니다.
                제 생각과 다르게 매우 처참했습니다.
            </p>
        </div>
        </Fragment>
    )
}
export default Bank;