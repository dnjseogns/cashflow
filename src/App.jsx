import '@/css/App.css';
import { Fragment, useState } from 'react';
import Welcome from "@/components/welcome/Welcome";
import Cashflow from "@/components/cashflow/Cashflow";
import { MenuProvider } from '@/components/cashflow/MenuContext';

function App() {
  const [isWelcome,setIsWelcome] = useState(true);
  
  return (
    <Fragment>
      {isWelcome
      ?<Welcome setIsWelcome={setIsWelcome}></Welcome>
      :<MenuProvider>
        <Cashflow />
      </MenuProvider>
      }
    </Fragment>
  )
}

export default App



      {/* <p className='app-title'>100세까지 현금흐름 파악하기</p>
          <p className='app-note'>각종 데이터 입력 방법을 선택해주세요</p>
          <button className='app-guide-mode'>최소 데이터 입력하기(첫방문자 추천)</button>
          <button className='app-custom-mode'>상세 데이터 입력하기</button> */}
      {/* <div className='app-header'>header</div>
      <div className='app-content'>
        <div className='app-content-left'>app-content-left</div>
        <div className='app-content-middle'>
          <div className='guider-msg-wrap'>
            <img src='src/images/guider.jpg' alt=""></img>
            <span>지킴이</span>
            <p>자료를 어떻게 입력하시겠습니까?</p>
          </div>
          <Button>자동 입력하기(튜토리얼)</Button>
          <Button>정보 직접 입력하기</Button>
        </div>
        <div className='app-content-right'>app-content-right</div>
      </div>
      <div className='app-footer'>footer</div> */}