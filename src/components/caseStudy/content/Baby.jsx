import '@/components/caseStudy/caseStudy.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import newCashflowData from "@/components/caseStudy/chartData/Baby.json";

const Baby = ({children}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(CfSave(newCashflowData));
    });

    return (
        <Fragment>
        <div className="case-study-conten-top">
            <h4 className='title'>Case5. 아기를 낳으면?</h4>
            <p>2023년 대한민국 합계출산율은 0.721명으로 OECD 최하위 수치를 기록했다.
            <span className='note'> (참고 - https://www.casenews.co.kr/news/articleView.html?idxno=15135)</span>
            </p>
        </div>
        <div className="case-study-conten-top">
            <h4 className='title'>시뮬레이션</h4>
        </div>
        {children}
        
        <div className="case-study-conten-bottom">
        <h4 className='title'>시나리오</h4>
            <p>
                A : 28~55세(초봉2900만, 저축 월90만원 이상) → 34세(결혼 맞벌이, 전세3억, 아반떼구매) → 40세(집매매6억) → 56~65세(재취업,기존연봉60%수준) → 65세(국민연금수령)
                <br/>B : 28~55세(초봉2900만, 저축 월90만원 이상) → 34세(결혼 맞벌이, 전세3억, 아반떼구매) → 36세(아이 1명 출산) → 40세(집매매6억) → 56~65세(재취업,기존연봉60%수준) → 65세(국민연금수령)
                <br/>C : 28~55세(초봉2900만, 저축 월90만원 이상) → 34세(결혼 맞벌이, 전세3억, 아반떼구매) → 36/38세(아이 2명 출산) → 40세(집매매6억) → 56~65세(재취업,기존연봉60%수준) → 65세(국민연금수령)
            </p>

            <h4 className='title'>사견</h4>
            <p>
                합계출산율이 큰 사회적 이슈 중 하나이다. 아이를 낳을 경우 경제적인 타격이 어느정도인지 시뮬레이션하고자 하였습니다
                <br/> A vs B : 아이 한 명 키우는데 필요한 금액은 3억5천 정도라고 합니다. 맞벌이하며 부부가 착실히 저축했을 경우 한 아이 키우는 정도의 여력은 있어보입니다.
                <br/> B vs C : 아이가 둘이 되는 순간 지금처럼 적당히 성실하게 살았다간 노후에 거지꼴을 면하지 못할 것 같습니다. 마음 독하게 먹고 소비를 줄이고, 투자공부도 해야할 것 같습니다.
                {/* <br/><span style={{marginLeft:"75px"}}>만약 위 그래프대로라면, 둘째를 가지기는 쉽지 않을 것 같습니다.</span> */}
            </p>
        </div>
        </Fragment>
    )
}
export default Baby;