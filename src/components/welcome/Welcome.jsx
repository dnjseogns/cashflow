import Button from 'react-bootstrap/Button';
import './Welcome.css';
function Welcome({setIsWelcome}){
    return (
    <div className='welcome'>
      <p>내 미래는 안정적일까? <br/>
      노후대비를 하기 위해선 지금부터 얼마나 저축하고 투자해야 할까? <br/>
      {/*이 사이트는 현재부터 100세까지 현금흐름을 계산할 수 있도록 도와드립니다.*/}
      </p>
      {/* <button>시작하기</button> */}
      {/* <Button onClick={()=>{setIsWelcome(false)}}>시작하기</Button> */}
      <button onClick={()=>{setIsWelcome(false)}}>100세까지 현금흐름 계산하기</button>
  </div>)
}
export default Welcome;