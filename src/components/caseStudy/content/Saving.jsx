import '@/components/caseStudy/caseStudy.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import newCashflowData from "@/components/caseStudy/chartData/Saving.json";

const Saving = ({children}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(CfSave(newCashflowData));
    });

    return (
        <Fragment>
        <div className="case-study-conten-top">
            <h4 className='title'>Case9. 10만원 더 아끼면?</h4>
            <p>지금 커피 끊고, 담배 끊으면 인생이 좀 달라질까요?</p>
        </div>
        <div className="case-study-conten-top">
            <h4 className='title'>시뮬레이션</h4>
        </div>
        {children}
        
        <div className="case-study-conten-bottom">
            <h4 className='title'>시나리오</h4>
            <p>
                A : 28~55세(초봉2900만, 저축 월90만원 이상) → 34세(집매매3억, 아반떼구매) → 56~65세(재취업,기존연봉60%수준) → 65세(국민연금수령)
                <br/>B : 28~55세(초봉2900만, 저축 월100만원 이상) → 34세(집매매3억, 아반떼구매) → 56~65세(재취업,기존연봉60%수준) → 65세(국민연금수령)
                <br/>C : 28~55세(초봉2900만, 저축 월110만원 이상) → 34세(집매매3억, 아반떼구매) → 56~65세(재취업,기존연봉60%수준) → 65세(국민연금수령)
            </p>
            <h4 className='title'>사견</h4>
            <p>
                A vs B vs C : 제 관점에는 10만원, 20만원 더 아끼며 산다고 인생이 드라마틱하게 변하진 않는 것 같습니다.
                <br/>짠테크만 열심해 해선 인생이 바뀌진 않고, 결국엔 짠테크로 마련한 시드머니를 굴릴 투자수익률이 뒷바침되어야 한다는 결론을 보여주는 것 같습니다.
                <br/>앱테크로 몇만원 더 벌려고 시간 쓰는 것보다, 그 시간과 에너지로 투자공부하시는 게 더욱 현명한 것 같습니다.
            </p>
        </div>
        </Fragment>
    )
}
export default Saving;