import { useState } from 'react'
import LoginForm from './components/LoginForm'
import Signup from './components/Signup'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <LoginForm/>
     */}
     <Signup/>
    </>
  )
}

export default App
