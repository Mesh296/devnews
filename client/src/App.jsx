import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-3xl font-bold stroke-stroke-1'>
        Hello world
      </h1>
      <button className='px-4 py-3 bg-brand-color cursor-pointer text-brand-color-text rounded-[7px] hover:bg-on-surface-2 hover:text-brand-color border hover:border-stroke-light transition-all duration-200'>
        Get started
      </button>
      <p>con cac du ma may
      </p>
    </>
  )
}

export default App
