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
        </div>
        {children}
        
        <div className="case-study-conten-bottom">
            <h4 className='title'>요약</h4>
            <p>
                A : 28~42세(초봉2900만,저축50%이상,투자수익10%) → 42세(은퇴, 집매매3억, 차량구매) → 65세(국민연금수령)
                <br/>B : 28~42세(초봉1억만,저축80%이상,투자수익4%) → 42세(은퇴, 집매매3억, 차량구매) → 65세(국민연금수령)
            </p>
            <h4 className='title'>사견</h4>
            <p>
                15년간 근무 후 파이어족이 되기 위해선, 극단적인 저축 또는 투자수익률이 있어야 한다는 점을 시뮬레이션하고자 하였습니다.
                <br/>특히, 연 투자수익률 12% 이상은 엄청난 투자수익률이란 점도 보여주고 있습니다.
            </p>
        </div>
        </Fragment>
    )
}
export default Fire;