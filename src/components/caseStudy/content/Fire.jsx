import '@/components/caseStudy/caseStudy.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import newCashflowData from "@/components/caseStudy/chartData/Fire.json";

const Fire = ({children}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(CfSave(newCashflowData));
    });

    return (
        <Fragment>
        <div className="case-study-conten-top">
            <h4 className='title'>Case3. 파이어족이 되려면?</h4>
            <p>경제적 자립(Financial Independence)의 'Fi'와 조기은퇴(Retire Early)의 're', '족(族)'의 합성어로, 경제적 자립을 이루어 자발적인 조기 은퇴를 추진하는 사람들을 일컫는 말이다. (주로 30대 말이나 40대 초반에 은퇴를 계획하는 경향이 있다.)</p>
        </div>
        <div className="case-study-conten-top">
            <h4 className='title'>시뮬레이션</h4>
            <p>A : 26세(초봉 2600만, 50%저축, 연 11% 수익률) → 싱글라이프 → 40세 은퇴 → 65세(국민연금수령)</p>
            <p>B : 26세(초봉 1억2000만, 80%저축, 연 4% 수익률) → 싱글라이프 → 40세 은퇴 → 65세(국민연금수령)</p>
        </div>
        {children}
        
        <div className="case-study-conten-bottom">
            <h4 className='title'>사견</h4>
            <p>
                1. 사업을 해서 단기간에 많은 수입을 벌거나
                2. 투자수익률이 높아야 함
            </p>
        </div>
        </Fragment>
    )
}
export default Fire;