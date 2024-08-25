import './Cashflow.css';
import { Fragment, useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import {CfSave, CfClean} from '@/redux/action/CashflowAction';

/* 입력해주신 자료는 이번 계산에만 활용합니다. 이 사이트는 어떤 개인 정보도 저장하지 않습니다. */

function Cashflow(){
    //기본
    const dispatch = useDispatch();

    //redux
    const svRedux = useSelector((store) => store.Survey);
    const cfRedux = useSelector((store) => store.Cashflow);
    console.log("svRedux",svRedux);
    console.log("cfRedux",cfRedux);

    //svDiv
    const [svDiv,setSvDiv] = useState("");
    function setSurveyDivition(div){
        if(svDiv === div){
            setSvDiv("");
        }
        else{
            setSvDiv(div);
        }
    };

    //cfRedux 값 세팅
    useEffect(()=>{
        let svBasic = svRedux.data.base;
        let initTimeLine = [];

        // 누적 변수
        let loopCnt = 0;
        let inflationStack = 1.0;
        let incomeRiseRateStack = 1;
        // 이전 변수
        let assetSavingPrev = 0;
        let assetInvestPrev = 0;
        for(var i=0; i<=100; i++){
            //기초(나이)
            if(i < svBasic.age){
                continue;
            }
            loopCnt++;
            //기초(인플레이션)
            if(loopCnt <= 1){
                inflationStack = 1.0;
            }else{
                inflationStack = inflationStack * (1 + svBasic.indexInflation/100);
                inflationStack = Math.round(inflationStack * 10000) / 10000;
            }

            //근로소득(연봉상승률)
            let incomeRiseRate = 0;
            let incomeRiseRate_M = 0;
            if(loopCnt <= 1){
                incomeRiseRate_M = -1 * svBasic.incomeRiseRate1;
            }else if(loopCnt <= 26) {
                incomeRiseRate_M = (svBasic.incomeRiseRate25 - svBasic.incomeRiseRate1) / 25
                                    * (svBasic.workingExperienceYear - 1 + loopCnt - 2);
            }else{
                incomeRiseRate_M = (svBasic.incomeRiseRate25 - svBasic.incomeRiseRate1);
            }
            incomeRiseRate = svBasic.incomeRiseRate1 + incomeRiseRate_M;
            incomeRiseRate = (incomeRiseRate + 100) / 100;
            incomeRiseRate = Math.round(incomeRiseRate * 10000) / 10000;
            incomeRiseRateStack = incomeRiseRateStack * incomeRiseRate;
            incomeRiseRateStack = Math.round(incomeRiseRateStack * 10000) / 10000;
            //근로소득(세후연봉)
            let incomeAfterTaxYearly = Math.round(svBasic.incomeAfterTaxMonthly * 12 * incomeRiseRateStack);
            if(i>50){
                incomeAfterTaxYearly = 0;//50세 은퇴
            }
            //근로소득(부업)
            let additionalIncomeYearly = svBasic.additionalIncomeMonthly * 12;
            //근로소득(합계)
            let workIncomeTotSum = incomeAfterTaxYearly + additionalIncomeYearly;
            

            //실거주(주거비)
            let houseCostYearly = svBasic.houseCost * 12;
            houseCostYearly = Math.round(houseCostYearly * inflationStack);
            //실거주(보증금)
            let houseGuarantee = svBasic.houseGuarantee;
            //차량비
            let carCostYearly = svBasic.carCost * 12;
            carCostYearly = Math.round(carCostYearly * inflationStack);
            //소비금액(소비)
            let consumAmountYearly = svBasic.consumAmountMonthly * 12;
            consumAmountYearly = Math.round(consumAmountYearly * inflationStack);
            consumAmountYearly = consumAmountYearly - houseCostYearly - carCostYearly;
            //소비금액(합계)
            let consumTotSum = consumAmountYearly + houseCostYearly + carCostYearly;


            //저축+투자
            let saveAmountYealy = Math.round((workIncomeTotSum - consumTotSum) * svBasic.savingRate);
            let investAmountYealy = Math.round((workIncomeTotSum - consumTotSum) * (1 - svBasic.savingRate));


            // 누적자산(저축)
            let assetSaving = svBasic.curAsset.saving;
            if(loopCnt <= 1){
                assetSaving = Math.round(assetSaving * (1+svBasic.indexBankInterest/100));//+자본수익
                assetSaving = assetSaving + saveAmountYealy;//+저축
                assetSavingPrev = assetSaving;
            }else{
                assetSaving = assetSavingPrev;
                assetSaving = Math.round(assetSaving * (1+svBasic.indexBankInterest/100));//+자본수익
                assetSaving = assetSaving + saveAmountYealy;//+저축
                assetSavingPrev = assetSaving;
            }
            // 누적자산(투자)
            let assetInvest = svBasic.curAsset.invest;
            if(loopCnt <= 1){
                assetInvest = Math.round(assetInvest * (1+svBasic.investIncome/100));//+자본수익
                assetInvest = assetInvest + investAmountYealy;//+저축
                assetInvestPrev = assetInvest;
            }else{
                assetInvest = assetInvestPrev;
                assetInvest = Math.round(assetInvest * (1+svBasic.investIncome/100));//+자본수익
                assetInvest = assetInvest + investAmountYealy;//+저축
                assetInvestPrev = assetInvest;
            }
            
            //result
            let result = {
                        //기초
                        age : i, 
                        inflation : inflationStack,
                        //근로소득
                        incomeRiseRate : incomeRiseRate,
                        incomeRiseRateStack : incomeRiseRateStack,
                        incomeAfterTaxYearly : incomeAfterTaxYearly,
                        additionalIncomeYearly : additionalIncomeYearly,
                        workIncomeTotSum : workIncomeTotSum,

                        //부동산
                        houseCostYearly:houseCostYearly,
                        houseGuarantee:houseGuarantee,
                        //자동차
                        carCostYearly:carCostYearly,
                        //소비금액
                        consumAmountYearly : consumAmountYearly,
                        consumTotSum : consumTotSum,

                        //저축금액
                        saveAmountYealy : saveAmountYealy,
                        investAmountYealy : investAmountYealy,

                        //자산
                        assetSaving : assetSaving,
                        assetInvest : assetInvest,
                        };
            initTimeLine.push(result);
        }
        cfRedux.data.timeline = initTimeLine;
        dispatch(CfSave(cfRedux.data));
    },[svRedux]);

    return (
    <>
    <div className='header'></div>
    <div className='cf-wrap'>
        <div className='cf-left'>
            <div className='left-title'><span>정보입력하기</span></div>
            <ul className={'guide ' + (svDiv==="guide"?"on":"")} onClick={()=>{setSurveyDivition("guide")}}>1. 가이드 {svDiv==="guide"?<span>〉</span>:null}</ul>
            <ul className='basic '>2. 기본정보
                <li className={(svDiv==="index"?"on":"")} onClick={()=>{setSurveyDivition("index")}}>1) 미래 지표 {svDiv==="index"?<span>〉</span>:null}</li>
                <li className={(svDiv==="age"?"on":"")} onClick={()=>{setSurveyDivition("age")}}>2) 나이 {svDiv==="age"?<span>〉</span>:null}</li>
                <li className={(svDiv==="house"?"on":"")} onClick={()=>{setSurveyDivition("house")}}>3) 실거주 {svDiv==="house"?<span>〉</span>:null}</li>
                <li className={(svDiv==="salary"?"on":"")} onClick={()=>{setSurveyDivition("salary")}}>4) 노동소득 {svDiv==="salary"?<span>〉</span>:null}</li>
                <li className={(svDiv==="saving"?"on":"")} onClick={()=>{setSurveyDivition("saving")}}>5) 저축/소비 {svDiv==="saving"?<span>〉</span>:null}</li>
                <li className={(svDiv==="asset"?"on":"")} onClick={()=>{setSurveyDivition("asset")}}>6) 자산/자본소득 {svDiv==="asset"?<span>〉</span>:null}</li>
            </ul>
            <ul className='add'>3. 추가정보
                <li className={(svDiv==="marry"?"on":"")} onClick={()=>{setSurveyDivition("marry")}}>1) 결혼 {svDiv==="marry"?<span>〉</span>:null}</li>
                <li className={(svDiv==="baby"?"on":"")} onClick={()=>{setSurveyDivition("baby")}}>2) 아기 {svDiv==="baby"?<span>〉</span>:null}</li>
                <li className={(svDiv==="retire"?"on":"")} onClick={()=>{setSurveyDivition("retire")}}>3) 은퇴/재취업 {svDiv==="retire"?<span>〉</span>:null}</li>
                <li className={(svDiv==="parent"?"on":"")} onClick={()=>{setSurveyDivition("parent")}}>4) 부모님 부양 {svDiv==="parent"?<span>〉</span>:null}</li>
                <li className={(svDiv==="lotto"?"on":"")} onClick={()=>{setSurveyDivition("lotto")}}>5) 복권 {svDiv==="lotto"?<span>〉</span>:null}</li>
            </ul>
        </div>
        <div className='cf-right'>
            <div className='cf-header'></div>
            <div className='cf-content'>
                {svDiv===""?null:<div className={'survey-area '+svDiv}>
                    {svDiv==="guide"?<GuideSurvey/>
                    :svDiv==="index"?<BasicIndexSurvey/>
                    :svDiv==="age"?<BasicAgeSurvey/>
                    :svDiv==="house"?<BasicHouseSurvey/>
                    :svDiv==="salary"?<BasicSalarySurvey/>
                    :svDiv==="saving"?<BasicSavingSurvey/>
                    :svDiv==="asset"?<BasicAssetSurvey/>
                    :svDiv==="marry"?<AddMarry/>
                    :svDiv==="baby"?<AddBaby/>
                    :svDiv==="retire"?<AddRetire/>
                    :svDiv==="parent"?<AddParent/>
                    :svDiv==="lotto"?<AddLotto/>
                    :null
                    }
                </div>
                }
                <div className='data-area'>
                    <table>
                        <colgroup>
                            <col width="40px"/>
                            <col width="60px"/>

                            <col width="80px"/>
                            <col width="80px"/>
                            <col width="80px"/>
                            <col width="100px"/>

                            <col width="80px"/>
                            <col width="80px"/>
                            <col width="80px"/>
                            <col width="100px"/>

                            <col width="80px"/>
                            <col width="80px"/>
                            <col width="100px"/>

                            <col width="100px"/>
                            <col width="100px"/>
                            <col width="100px"/>
                            <col width="100px"/>
                            <col width="100px"/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th colSpan="2"></th>
                                <th colSpan="4">노동소득</th>
                                <th colSpan="4">소비금액</th>
                                <th colSpan="3">저축금액(노동소득 - 소비)</th>
                                <th colSpan="5">누적자산(저축 + 자본소득)</th>
                            </tr>
                            <tr>
                                <th>나이</th>
                                <th>인플레</th>

                                <th>연봉상승률(가릴예정)</th>
                                <th>주소득</th>
                                <th>부소득</th>
                                <th>합계</th>

                                <th>소비</th>
                                <th>주거비</th>
                                <th>차량비</th>
                                <th>합계</th>

                                <th>저축({svRedux.data.base.savingRate*10}할)</th>
                                <th>투자({10 - svRedux.data.base.savingRate*10}할)</th>
                                <th>합계</th>

                                <th>부채(2.1%)</th>
                                {/* <th>부채(5.0%)</th> */}
                                <th>저축({svRedux.data.base.indexBankInterest}%)</th>
                                <th>투자({svRedux.data.base.investIncome}%)</th>
                                <th>보증금(0%)</th>
                                <th>합계</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cfRedux.data.timeline.map((row) => {
                               return(
                                <tr>
                                    <td>{row.age}</td>
                                    <td>{row.inflation}</td>

                                    <td>{row.incomeRiseRateStack}</td>
                                    <td>{row.incomeAfterTaxYearly}</td>
                                    <td>{row.additionalIncomeYearly}</td>
                                    <td className='sum'>{row.incomeAfterTaxYearly + row.additionalIncomeYearly}</td>
                                    
                                    <td>{row.consumAmountYearly}</td>
                                    <td>{row.houseCostYearly}</td>
                                    <td>{row.carCostYearly}</td>
                                    <td className='sum'>{row.consumAmountYearly + row.houseCostYearly + row.carCostYearly}</td>

                                    <td>{row.saveAmountYealy} </td>
                                    <td>{row.investAmountYealy} </td>
                                    <td className='sum'>{Math.round( ((row.workIncomeTotSum - row.consumTotSum)) * 1)}</td>

                                    <td>내용1</td>
                                    <td>{row.assetSaving}</td>
                                    <td>{row.assetInvest}</td>
                                    <td>{row.houseGuarantee}</td>
                                    <td className='sum'>합계</td>
                                </tr>
                               ) 
                            })}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    </div>
    <div className='footer'></div>
    </>);
}
function GuideSurvey(){
    //redux
    const svData = useSelector((store) => store.Survey).data;
    const dispatch = useDispatch();

    const DataChange = (div, e) => {
        svData.base[div] = e.target.value;
        dispatch(SvSave(svData));
    };
    return(
    <>
        <div>
            가이드 추가 필요
        </div>
    </>);
}

/* 이놈 주석...
function BasicSurvey(){
    //redux
    const data = useSelector((store) => store.Cashflow).data;
    const dispatch = useDispatch();

    const [hsDiv, setHsDiv] = useState("1");
    const HouseDivition = (e) => {
        const val = e.target.value;
        setHsDiv(val);
    };

    return(<>
        <div>
            <span>1. 나이 : </span>
            <input className='age h20 w60' defaultValue={data.survey.basic.age} max={60}></input>
            <span> 세</span><br/>
            <span className='d1'>경력 : </span>
            <input className='age h20 w60' defaultValue={data.survey.basic.age} max={60}></input>
            <span> 년차</span>
        </div>

        <div>
            <span>2. 근로소득</span><br/>
            <span className='d1'>1) 세후 월급 : </span>
            <input className='h20 w60' defaultValue={data.survey.basic.incomeAfterTax} max={1000000000}></input>
            <span> 만원</span><br/>
            <span className='d2'>연봉상승률(가정) : </span>
            <span className=''> 1년 차 </span>
            <input className='h20 w30 ' defaultValue={data.survey.basic.incomeRiseRate1} max={1000000000}></input>
            <span className=''>% → 25년 차 </span>
            <input className='h20 w30 ' defaultValue={data.survey.basic.incomeRiseRate25} max={1000000000}></input>
            <span className=''>%(</span>
            <select name="salary">
                <option value="javascript">상위 25%</option>
                <option value="php">상위 50%</option>
                <option value="java">상위 75%</option>
                <option value="java">직접입력</option>
            </select>
            <span className=''>)</span>
            <br/>
            <span className='d1'>2) (매월)추가 근로소득(부업 등) : </span>
            <input className='addincome h20 w60' defaultValue={data.survey.basic.additionalIncome} max={1000000000}></input>
            <span> 만원</span>
        </div>

        <div>
            <span>3. 저축금액</span><br/>
            <span className='d1 explain'>※ 현재 세후 근로소득은 {data.survey.basic.incomeAfterTax + data.survey.basic.additionalIncome}원입니다.</span><br/>
            <span className='d1'>1) (매월)저축금액 : </span>
            <input className='h20 w60' defaultValue={data.survey.basic.savingMoney} max={1000000000}></input>
            <span> 만원</span>
            <br/>
            <span className='d2'>(매월)소비금액 : </span>
            <input className='h20 w60' defaultValue={data.survey.basic.houseMoney} max={1000000000}></input>
            <span> 만원</span>
            <br/>
        </div>

        <div>
            <p>4. 실거주</p>
            <span className='d1'>1) 실거주 형태</span><br/>
            <input className='d2' type="radio" id="houseDiv1" name="houseDiv" value="1" onClick={(e)=>{HouseDivition(e)}}/>
            <label for="houseDiv1">본가</label>
            <input type="radio" id="houseDiv2" name="houseDiv" value="2" onClick={(e)=>{HouseDivition(e)}}/>
            <label for="houseDiv2">월세/반전세</label>
            <input type="radio" id="houseDiv3" name="houseDiv" value="3" onClick={(e)=>{HouseDivition(e)}}/>
            <label for="houseDiv3">전세</label>
            <input type="radio" id="houseDiv4" name="houseDiv" value="4" onClick={(e)=>{HouseDivition(e)}}/>
            <label for="houseDiv4">매매</label>
            <br/>
            {hsDiv==="1"?<Fragment><span className='d1'></span>※ 주거비 : 0원</Fragment>
            :hsDiv==="2"?<Fragment>
                <span className='d1'>2) 보증금 : </span>
                <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input> 만원<br/>
                <span className='d2'>월세+관리비 : </span>
                <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input> 만원<br/>
                <span className='d1'>3) 보증금 대출이 있으신가요? </span><br/>
                <input className='d2' type="radio" id="HouseLoanNo" name="HouseLoanDiv" value="no" onClick={(e)=>{HouseLoanDivition(e)}}/>
                <label for="HouseLoanNo">아니오</label>
                <input type="radio" id="HouseLoanYes" name="HouseLoanDiv" value="yes" onClick={(e)=>{HouseLoanDivition(e)}}/>
                <label for="HouseLoanYes">네(대출금액 : 
                    <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input>
                    만원, 연이자 
                    <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input>
                    %)
                </label>
            </Fragment>
            :hsDiv==="3"?<Fragment>
                <span className='d1'>2) 전세가 : </span>
                <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input> 만원<br/>
                <span className='d2'>관리비 : </span>
                <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input> 만원<br/>
                <span className='d1'>3) 전세자금 대출이 있으신가요? </span><br/>
                <input className='d2' type="radio" id="HouseLoanNo" name="HouseLoanDiv" value="no" onClick={(e)=>{HouseLoanDivition(e)}}/>
                <label for="HouseLoanNo">아니오</label>
                <input type="radio" id="HouseLoanYes" name="HouseLoanDiv" value="yes" onClick={(e)=>{HouseLoanDivition(e)}}/>
                <label for="HouseLoanYes">네(대출금액 : 
                    <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input>
                    만원, 연이자 
                    <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input>
                    %)
                </label>
            </Fragment>
            :hsDiv==="4"?<Fragment>
                <span className='d1'>2) 매매가 : </span>
                <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input> 만원<br/>
                <span className='d2'>관리비 : </span>
                <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input> 만원<br/>
                <span className='d1'>3) 주택담보 대출이 있으신가요? </span><br/>
                <input className='d2' type="radio" id="HouseLoanNo" name="HouseLoanDiv" value="no" onClick={(e)=>{HouseLoanDivition(e)}}/>
                <label for="HouseLoanNo">아니오</label><br/>
                <input className='d2' type="radio" id="HouseLoanYes" name="HouseLoanDiv" value="yes" onClick={(e)=>{HouseLoanDivition(e)}}/>
                <label for="HouseLoanYes">네</label>
                <p className='d3'>(대출금액 : <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input> 만원,<br/>
                    대출만기 : <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input>년,<br/>
                    상환방법 : <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input>,<br/>
                    거치기간 : 1년,<br/>
                    대출금리 : 5%)
                </p>
            </Fragment>
            :<Fragment></Fragment>}
        </div>

        <div>
            <span>5. 자산 상태</span><br/>
            <span className='d1'>1) 부채</span>
            <ul>
                <li><span>주택담보 대출 / 40000만원 / 4.0%</span></li>
                <li><span>학자금 대출 / 2000만원 / 4.0%</span></li>
            </ul>
            <br/>
            <span className='d1'>2) 저축/투자금 : </span>
            <ul>
                <li><span>저축 / 40000만원 / 3.0%</span></li>
                <li><span>투자 / 2000만원 / 8.0%</span></li>
            </ul>
        </div>
        </>);
}
*/

//미래 지표
function BasicIndexSurvey(){
    //redux
    const svData = useSelector((store) => store.Survey).data;
    const dispatch = useDispatch();

    const DataChange = (div, e) => {
        svData.base[div] = e.target.value;
        dispatch(SvSave(svData));
    };
    return(
    <>
        <div>
            <span>1. 물가상승률 : </span>
            <input className='h20 w60' defaultValue={svData.base["indexInflation"]} onChange={(e)=>{DataChange("indexInflation", e)}}></input>
            <span> %</span><br/>
            <span>※ 2000년 ~ 2023년 평균 물가상승률은 x.x입니다. </span>
        </div>
        <div>
            <span>2. 은행예금 금리 : </span>
            <input className='h20 w60' defaultValue={svData.base["indexBankInterest"]} onChange={(e)=>{DataChange("indexBankInterest", e)}}></input>
            <span> %</span><br/>
            <span>※ 2000년 ~ 2023년 평균 은행예금금리는 x.x입니다. </span>
        </div>
        <div>
            <span>3. 대출금리 : </span>
            <input className='h20 w60' defaultValue={svData.base["indexLoanInterest"]} onChange={(e)=>{DataChange("indexLoanInterest", e)}}></input>
            <span> %</span><br/>
            <span>※ 2000년 ~ 2023년 평균 대출금리는 x.x입니다. </span>
        </div>
        <div>
            <span>4. 종합 투자수익률 : </span>
            <input className='h20 w60' defaultValue={svData.base["investIncome"]} onChange={(e)=>{DataChange("investIncome", e)}}></input>
            <span> %</span><br/>
            <span>※ 자신의 투자실력을 수치화 하여 입력해주시길 바랍니다.(주식 + 금 + 2주택 이상...)</span><br/>
            <span>※ 은행예적금/실거주 주택은 별도로 계산하므로 투자수익률에선 제외합니다.</span><br/>
            <span>※ 세계적인 투자자 워런버핏의 수익률이 20%라고 하죠. 투자수익률은 미래 자산에 큰 영향도를 미치므로, 현실적인 수치를 입력해주시길 바랍니다. </span>
        </div>
    </>);
}
//나이
function BasicAgeSurvey(){
    //redux
    const svData = useSelector((store) => store.Survey).data;
    const dispatch = useDispatch();

    const DataChange = (div, e) => {
        svData.base[div] = e.target.value;
        dispatch(SvSave(svData));
    };
    return(<><div>
        <span>1. 나이 : 만 </span>
        <input className='h20 w60' defaultValue={svData.base["age"]} onChange={(e)=>{DataChange("age", e)}}></input>
        <span> 세</span><br/>
    </div>
    </>);
}
function BasicHouseSurvey(){
    //redux
    const svData = useSelector((store) => store.Survey).data;
    const dispatch = useDispatch();

    const DataChange = (div, e) => {
        svData.base[div] = e.target.value;
        dispatch(SvSave(svData));
    };

    return(<>
    <div>
        <span>※ 실거주 형태를 먼저 파악하여, 자산과 소비금액을 세부적으로 나누도록 하겠습니다.</span><br/>
        <span>1. 실거주 형태</span><br/>
        <input className='d1' type="radio" id="houseType1" name="houseType" value="h1" onChange={(e)=>{DataChange("houseType", e)}} 
                checked={svData.base["houseType"]==="h1"? true : false}/>
        <label for="houseType1">본가</label>
        <input className='d1' type="radio" id="houseType2" name="houseType" value="h2" onChange={(e)=>{DataChange("houseType", e)}} 
                checked={svData.base["houseType"]==="h2"? true : false}/>
        <label for="houseType2">월세/반전세</label>
        <input className='d1' type="radio" id="houseType3" name="houseType" value="h3" onChange={(e)=>{DataChange("houseType", e)}} 
                checked={svData.base["houseType"]==="h3"? true : false}/>
        <label for="houseType3">전세</label>
        <input className='d1' type="radio" id="houseType4" name="houseType" value="h4" onChange={(e)=>{DataChange("houseType", e)}} 
                checked={svData.base["houseType"]==="h4"? true : false}/>
        <label for="houseType4">매매</label>
        <br/>

        {svData.base.houseType==="h1"?
        <>
            <span className='d1'>※ 본가 거주 시 주거비 0원, 보증금 0원입니다.</span><br/>
        </>:
        svData.base.houseType==="h2"?
        <>
            <span className='d1'>1) 보증금 : </span>
            <input className='h20 w60' defaultValue={svData.base["houseGuarantee"]} onChange={(e)=>{DataChange("houseGuarantee", e)}}></input>
            <span> 만원 </span>
            <br/>
            <span className='d2'>※ 보증금대출이 있으신가요?</span><br/>
            <input className='d3' type="radio" id="houseLoanNo" name="houseLoanYN" value="n" onChange={(e)=>{DataChange("houseLoanYN", e)}} 
                checked={svData.base["houseLoanYN"]==="n"? true : false}/>
            <label for="houseLoanNo">아니오.</label><br/>
            <input className='d3' type="radio" id="houseLoanYes" name="houseLoanYN" value="y" onChange={(e)=>{DataChange("houseLoanYN", e)}} 
                    checked={svData.base["houseLoanYN"]==="y"? true : false}/>
            <label for="houseLoanYes">네. (보증금 {svData.base["houseGuarantee"]}만원 중 대출 
            <input className='h20 w60' defaultValue={svData.base["houseLoanAmount"]} onChange={(e)=>{DataChange("houseLoanAmount", e)}}></input>
            만원, 대출금리
            <input className='h20 w60' defaultValue={svData.base["houseLoanRate"]} onChange={(e)=>{DataChange("houseLoanRate", e)}}></input>
            %)</label><br/>
            <span className='d1'>2) 주거비(월세+관리비) : (매월) </span>
            <input className='h20 w60' defaultValue={svData.base["houseCost"]} onChange={(e)=>{DataChange("houseCost", e)}}></input>
            <span> 만원 </span>
        </>:
        svData.base.houseType==="h3"?
        <>
        </>:
        svData.base.houseType==="h4"?
        <>h4입니다
        </>:<></>
        }
    
        {/* <span>1. 나이 : 만 </span>
        <input className='h20 w60' defaultValue={svData.base["age"]} onChange={(e)=>{DataChange("age", e)}}></input>
        <span> 세</span><br/> */}
    </div>
    </>);

    // <div>
            
    //         {hsDiv==="1"?<Fragment><span className='d1'></span>※ 주거비 : 0원</Fragment>
    //         :hsDiv==="2"?<Fragment>
    //             <span className='d1'>2) 보증금 : </span>
    //             <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input> 만원<br/>
    //             <span className='d2'>월세+관리비 : </span>
    //             <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input> 만원<br/>
    //             <span className='d1'>3) 보증금 대출이 있으신가요? </span><br/>
    //             <input className='d2' type="radio" id="HouseLoanNo" name="HouseLoanDiv" value="no" onClick={(e)=>{HouseLoanDivition(e)}}/>
    //             <label for="HouseLoanNo">아니오</label>
    //             <input type="radio" id="HouseLoanYes" name="HouseLoanDiv" value="yes" onClick={(e)=>{HouseLoanDivition(e)}}/>
    //             <label for="HouseLoanYes">네(대출금액 : 
    //                 <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input>
    //                 만원, 연이자 
    //                 <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input>
    //                 %)
    //             </label>
    //         </Fragment>
    //         :hsDiv==="3"?<Fragment>
    //             <span className='d1'>2) 전세가 : </span>
    //             <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input> 만원<br/>
    //             <span className='d2'>관리비 : </span>
    //             <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input> 만원<br/>
    //             <span className='d1'>3) 전세자금 대출이 있으신가요? </span><br/>
    //             <input className='d2' type="radio" id="HouseLoanNo" name="HouseLoanDiv" value="no" onClick={(e)=>{HouseLoanDivition(e)}}/>
    //             <label for="HouseLoanNo">아니오</label>
    //             <input type="radio" id="HouseLoanYes" name="HouseLoanDiv" value="yes" onClick={(e)=>{HouseLoanDivition(e)}}/>
    //             <label for="HouseLoanYes">네(대출금액 : 
    //                 <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input>
    //                 만원, 연이자 
    //                 <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input>
    //                 %)
    //             </label>
    //         </Fragment>
    //         :hsDiv==="4"?<Fragment>
    //             <span className='d1'>2) 매매가 : </span>
    //             <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input> 만원<br/>
    //             <span className='d2'>관리비 : </span>
    //             <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input> 만원<br/>
    //             <span className='d1'>3) 주택담보 대출이 있으신가요? </span><br/>
    //             <input className='d2' type="radio" id="HouseLoanNo" name="HouseLoanDiv" value="no" onClick={(e)=>{HouseLoanDivition(e)}}/>
    //             <label for="HouseLoanNo">아니오</label><br/>
    //             <input className='d2' type="radio" id="HouseLoanYes" name="HouseLoanDiv" value="yes" onClick={(e)=>{HouseLoanDivition(e)}}/>
    //             <label for="HouseLoanYes">네</label>
    //             <p className='d3'>(대출금액 : <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input> 만원,<br/>
    //                 대출만기 : <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input>년,<br/>
    //                 상환방법 : <input className='h20 w60' defaultValue={0+0+0+0+0+0+0} max={1000000000}></input>,<br/>
    //                 거치기간 : 1년,<br/>
    //                 대출금리 : 5%)
    //             </p>
    //         </Fragment>
    //         :<Fragment></Fragment>}
    //     </div>

    return(<>BasicHouseSurvey</>);
}
function BasicSalarySurvey(){
    return(<>BasicSalarySurvey</>);
}
function BasicSavingSurvey(){
    return(<>BasicSavingSurvey</>);
}
function BasicAssetSurvey(){
    return(<>BasicAssetSurvey</>);
}
function AddMarry(){
    return(<>AddMarry</>);
}
function AddBaby(){
    return(<>AddBaby</>);
}
function AddRetire(){
    return(<>AddRetire</>);
}
function AddParent(){
    return(<>AddParent</>);
}
function AddLotto(){
    return(<>AddLotto</>);
}
export default Cashflow;