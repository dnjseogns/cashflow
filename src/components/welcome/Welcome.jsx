import Button from 'react-bootstrap/Button';
import './Welcome.css';
function Welcome({setIsCalcCashflow, setIsCaseStudy}){
    return (
    <div className='welcome'>
      <div className='welcome-content-wrap'>
        <p>
          내 미래는 안정적일까? <br/>
          노후대비를 하기 위해선 지금부터 얼마나 저축하고 투자해야 할까? <br/>
        </p>
        <div className='welcome-btn-wrap'>
          <button onClick={()=>{setIsCalcCashflow(true)}}>100세까지 현금흐름 계산하기</button>
          <button onClick={()=>{setIsCaseStudy(true)}}>현금흐름으로 사회이슈 보기</button>
        </div>
        <p style={{marginRight:"0px"}}>
          버전: 1.0 (마지막 수정 : 2024-10-30)
        </p>
      </div>
  </div>)
}
export default Welcome;