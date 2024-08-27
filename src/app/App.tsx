import './global.css'

import { UiButton } from '../shared/ui';
import { UiCircularProgressBar } from '../entities'
import { useState } from 'react'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        
      </div>
      <h1 className="text-teal-400">Counter App</h1>
      <UiCircularProgressBar  selectedValue={count}/>
      <div>
        <p>{count}</p>
      </div>
      <div className="card">
        <UiButton onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </UiButton>
      </div>
    </>
  )
}

