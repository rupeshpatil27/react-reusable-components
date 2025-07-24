import Tooltip from "./component/ToolTip"

function App() {

  return (
    <div className='w-full h-screen bg-neutral-100 flex justify-center items-center'>
      <div className='bg-amber-200 rounded-full text-black font-bold text-2xl px-3 py-1.5 cursor-pointer tooltip-container'
      >
        <span>React js tooltip</span>
        <Tooltip text={"React"} />
      </div>
    </div>
  )
}

export default App
