import { Fragment, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {SvSave, SvClean} from '@/redux/action/SurveyAction';
import useEffectNoMount from '@/hooks/useEffectNoMount.jsx';

const PrevHouseSurvey = ({completeBtnClickCnt, commonCompleteLogic}) => {
    const dispatch = useDispatch();
    const surveyData = useSelector((store) => store.Survey).data;

    const [livingType, setLivingType] = useState(surveyData?.prev?.livingType ?? "parent");

    const [housePriceTotal, setHousePriceTotal] = useState(surveyData?.prev?.housePriceTotal ?? 0);
    const [housePriceLoan, setHousePriceLoan] = useState(surveyData?.prev?.housePriceLoan ?? 0);
    const [housePriceLoanRate, setHousePriceLoanRate] = useState(surveyData?.prev?.housePriceLoanRate ?? "6.0");
    // const [housePriceOwn, setHousePriceOwn] = useState(surveyData?.prev?.setHousePriceOwn ?? 0);

    const [houseCostMonthly, setHouseCostMonthly] = useState(surveyData?.prev?.houseCostMonthly ?? 0);

    const surveyOnChange = (e, div) => {
        if(div === "livingType"){
            setLivingType(e.target.value);
        }
        else if(div === "housePriceTotal"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            const valInt = Math.floor(number); //정수변환

            if(0 <= valInt && valInt <= 10000000){
                if(valInt - housePriceLoan >= 0){ //good case
                    setHousePriceTotal(valInt);
                }else{ //bad case
                    setHousePriceTotal(valInt);
                    setHousePriceLoan(0);
                }
            }else if(10000000 < valInt){
                return;
            }else{
                setHousePriceTotal(0);
                return;
            }
        }else if(div === "housePriceLoanRate"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            if(number.toString().length >= 5){return;}//길이체크

            if(number === 0 || number === ""){
                setHousePriceLoanRate(0);
                return;
            }
            else if(0 <= number && number <= 100){
                if(/^0\d/.test(number)){
                    setHousePriceLoanRate(Number(number).toString());
                }else{
                    setHousePriceLoanRate(number);
                }
            }else if(100 < number){
                return;
            }else{
                setHousePriceLoanRate(0);
                return;
            }
        }else if(div === "housePriceLoan"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            const valInt = Math.floor(number); //정수변환

            if(0 <= valInt && valInt <= housePriceTotal){
                setHousePriceLoan(valInt);
            }else if(housePriceTotal < valInt){
                return;
            }else{
                setHousePriceLoan(0);
                return;
            }
        }else if(div === "houseCostMonthly"){
            const number = e.target.value.replaceAll(",",""); //쉼표제거
            if(isNaN(number)){return;} //문자 체크
            const valInt = Math.floor(number); //정수변환

            if(0 <= valInt && valInt <= 10000000){
                setHouseCostMonthly(valInt);
            }else if(10000000 < valInt){
                return;
            }else{
                setHouseCostMonthly(0);
                return;
            }
        }
    };

    useEffectNoMount(()=>{
        surveyData.prev.livingType = livingType;
        if(livingType === "parent"){
            surveyData.prev.housePriceTotal = 0;
            surveyData.prev.housePriceLoan = 0;
            surveyData.prev.housePriceLoanRate = 0;
            surveyData.prev.housePriceOwn = 0;
            surveyData.prev.houseCostMonthly = 0;
        }else{
            surveyData.prev.housePriceTotal = housePriceTotal;
            surveyData.prev.housePriceLoan = housePriceLoan;
            surveyData.prev.housePriceLoanRate = housePriceLoanRate;
            surveyData.prev.housePriceOwn = housePriceTotal - housePriceLoan;
            surveyData.prev.houseCostMonthly = houseCostMonthly;
        }

        dispatch(SvSave(surveyData));
        commonCompleteLogic();
    },[completeBtnClickCnt]);

    return (
        <Fragment>
            <div>
                <p className="question">(1) 현재 거주 형태를 선택해주세요.</p>
                <p className="radio-wrap">
                    <input type="radio" name="livingType" id="livingType_parent" value="parent" checked={livingType==="parent"?true:false} onChange={(e)=>{surveyOnChange(e,"livingType")}}/><label htmlFor="livingType_parent">본가</label>
                    <input type="radio" name="livingType" id="livingType_rent" value="rent" checked={livingType==="rent"?true:false} onChange={(e)=>{surveyOnChange(e,"livingType")}}/><label htmlFor="livingType_rent">월세·반전세·전세</label>
                    <input type="radio" name="livingType" id="livingType_jeonse" value="own" checked={livingType==="own"?true:false} onChange={(e)=>{surveyOnChange(e,"livingType")}}/><label htmlFor="livingType_jeonse">자가</label>
                </p>
            </div>
            {livingType==="rent"
            ? <Fragment>
                <div>
                    <p className="question">(2) 보증금 정보를 입력해주세요.</p>
                    <p>- 보증금 : <input className='btn1' value={housePriceTotal.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"housePriceTotal")}}/> 만원</p>
                    <p>
                        <span>- 전·월세자금대출금 : </span>
                        <input className='btn1' value={housePriceLoan.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"housePriceLoan")}}/> 만원,
                        <span style={{marginLeft:"20px"}}>대출금리 : </span>
                        <input className='btn1' value={housePriceLoanRate.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"housePriceLoanRate")}}/> %
                    </p>
                    <p>- 보증금 중 자기자본(자동계산) : <input className='btn1 readonly' value={(housePriceTotal - housePriceLoan).toLocaleString('ko-KR')} readOnly={true}/> 만원</p>
                </div>
                <div>
                    <p className="question">(3) 월 주거비(월세 + 관리비 + 공과금 등...)를 입력해주세요.</p>
                    <p><input className='btn1' value={houseCostMonthly.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"houseCostMonthly")}}/> 만원</p>
                </div>
            </Fragment>
            : null}
            {livingType==="own"
            ? <Fragment>
                <div>
                    <p className="question">(2) 주택 매매 가격을 입력해주세요.</p>
                    <p>- 매매가격 : <input className='btn1' value={housePriceTotal.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"housePriceTotal")}}/> 만원</p>
                    <p>
                        <span>- 주택담보대출 잔여 대출금 : </span>
                        <input className='btn1' value={housePriceLoan.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"housePriceLoan")}}/> 만원,
                        <span style={{marginLeft:"20px"}}>대출금리 : </span>
                        <input className='btn1' value={housePriceLoanRate.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"housePriceLoanRate")}}/> %
                    </p>
                    <p>- 자기자본(자동계산) : <input className='btn1 readonly' value={(housePriceTotal - housePriceLoan).toLocaleString('ko-KR')} readOnly={true}/> 만원</p>
                </div>
                <div>
                    <p className="question">(3) 월 관리비를 입력해주세요.</p>
                    <p><input className='btn1' value={houseCostMonthly.toLocaleString('ko-KR')} onChange={(e)=>{surveyOnChange(e,"houseCostMonthly")}}/> 만원</p>
                </div>
            </Fragment>
            : null}
    </Fragment>)
}
export default PrevHouseSurvey;