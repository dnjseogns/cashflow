import '@/components/caseStudy/caseStudy.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {CfSave, CfClean} from '@/redux/action/CashflowAction';
import newCashflowData from "@/components/caseStudy/chartData/NoData.json";
import 강욜로 from "@/images/강욜로.jpeg";
import 박투잘 from "@/images/박투잘.jpeg";
import 오잘나 from "@/images/오잘나.jpeg";
import 김건실 from "@/images/김건실.jpeg";

const Setting = ({children}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(CfSave(newCashflowData));
    });

    return (
        <Fragment>
        <div className="case-study-conten-top">
            <div>
                <h4 className='title'>시뮬레이션 세팅값</h4>
                <p style={{fontWeight:"600", color:"red"}}>
                    <span>⊙ 물가상승률 : 3.0%</span>
                    <span style={{marginLeft:"20px"}}>⊙ 예금 금리 : 2.7%</span>
                    <span style={{marginLeft:"20px"}}>⊙ 대출 금리 : 5.0%</span>
                    <span style={{marginLeft:"20px"}}>⊙ 부동산 상승률 : 4.0%</span>
                    <span style={{marginLeft:"20px"}}>⊙ 전체 자산 중 투자비율 : 20%</span>
                </p>
                <p>
                    {/* <span style={{marginLeft:"20px"}}>⊙ 결혼 : 32세</span> */}
                    {/* <span style={{marginLeft:"20px"}}>⊙ 아기 : 1명</span> */}
                    {/* <span style={{marginLeft:"20px"}}>⊙ </span> */}
                </p>
            </div>
            <div>
                <h4 className='title'>캐릭터 정보</h4>
                <div className='character-card-wrap'>
                    <div className='character-card'>
                        <img src={김건실} alt=""/>
                        <p>⊙ 이름 : 김건실</p>
                        <p>⊙ 나이 : 만 26세</p>
                        <p>⊙ 초봉 : 세후 월 200만원</p>
                        <p>⊙ 정년퇴직 : 55세</p>
                        <p>⊙ 연 투자수익률 : 4.0%</p>
                        <p>⊙ 저축율 : 50%</p>
                        <p>⊙ 특징 : 중소기업에서 묵묵히 일하며 성실함 하나로 꿈을 향해 한 걸음씩 나아가는 인물입니다.
                            {/* <br/>- 특유의 성실함으로 동료와 회사로부터 인정을 받아가며 정년인 55세까지 근무합니다. */}
                        </p>
                    </div>
                    <div className='character-card'>
                        <img src={오잘나} alt=""/>
                        <p>⊙ 이름 : 오잘나</p>
                        <p>⊙ 나이 : 만 26세</p>
                        <p style={{fontWeight:"600", color:"blue"}}>⊙ 초봉 : 세후 월 320만원</p>
                        <p>⊙ 정년퇴직 : 50세</p>
                        <p>⊙ 연 투자수익률 : 4.0%</p>
                        <p>⊙ 저축율 : 50%</p>
                        <p>⊙ 특징 : 대기업에서 탁월한 능력으로 빠르게 인정받으며 성공 가도를 달리고 있는 스마트한 인물입니다.
                            {/* <br/>- 갈수록 좁아지는 승진의 문을 통과하지 못하여 예상보다 빠르게 50세에 정년퇴직을 맞이하게 됩니다. */}
                        </p>
                    </div>
                    <div className='character-card'>
                        <img src={박투잘} alt=""/>
                        <p>⊙ 이름 : 박투잘</p>
                        <p>⊙ 나이 : 만 26세</p>
                        <p>⊙ 초봉 : 세후 월 200만원</p>
                        <p>⊙ 정년퇴직 : 55세</p>
                        <p style={{fontWeight:"600", color:"blue"}}>⊙ 연 투자수익률 : 12.0%</p>
                        <p>⊙ 저축율 : 50%</p>
                        <p>⊙ 특징 : 중소기업에 다니며 안정적인 직장생활을 이어가던 그는, 투자 감각을 키워가며 부를 쌓기 위해 끊임없이 노력하는 인물입니다.
                            {/* <br/>- 53세에 정년퇴직을 맞이한 후, 그간 쌓은 지식과 경험으로 본격적인 투자자로서의 삶을 시작하게 됩니다. */}
                        </p>
                    </div>
                    <div className='character-card'>
                        <img src={강욜로} alt=""/>
                        <p>⊙ 이름 : 강욜로</p>
                        <p>⊙ 나이 : 만 26세</p>
                        <p>⊙ 초봉 : 세후 월 200만원</p>
                        <p>⊙ 정년퇴직 : 55세</p>
                        <p>⊙ 연 투자수익률 : 4.0%</p>
                        <p style={{fontWeight:"600", color:"blue"}}>⊙ 저축율 : 10%</p>
                        <p>⊙ 특징 : 중소기업에 다니며 욜로 라이프를 즐기는 그는 소비를 아끼지 않고 친구들과의 소중한 순간을 더 중요하게 여기는 인물입니다.
                            {/* <br/>- 53세에 정년퇴직을 맞이한 후, 그는 자유로운 투자자로서 다양한 경험과 즐거움을 추구하며 인생을 만끽하고 있습니다. */}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
    )
}
export default Setting;