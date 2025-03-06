import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // StrictMode 가 걸려있으면, 상태나 생명주기 메소드를 검사를 해서 2번 호출하게 됨
  // <StrictMode>
    <App />
  // </StrictMode>,
)
