import Button from 'react-bootstrap/Button';
import './Welcome.css';
function Welcome({setIsWelcome}){
    return (
    <div className='welcome'>
      <p>내 미래는 안정적일까? <br/>
      노후대비를 하기 위해선 지금부터 얼마나 저축하고 투자해야 할까? <br/>
      </p>
      <button onClick={()=>{setIsWelcome(false)}}>100세까지 현금흐름 계산하기</button>
  </div>)
}
export default Welcome;