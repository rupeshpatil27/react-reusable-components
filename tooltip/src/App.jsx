import Tooltip from "./component/Tooltip"

function App() {

  return (
    <div className='w-full h-screen bg-neutral-100 relative'>
      <div className="absolute top-0 left-0">
        <div className='bg-amber-200 rounded-full text-black font-bold text-2xl px-3 py-1.5 cursor-pointer tooltip-container'
        >
          <span>React js tooltip</span>
          <Tooltip text={"React"} />
        </div>
      </div>
      <div className="absolute bottom-0 left-0">
        <div className='bg-amber-200 rounded-full text-black font-bold text-2xl px-3 py-1.5 cursor-pointer tooltip-container'
        >
          <span>React js tooltip</span>
          <Tooltip text={"React"} />
        </div>
      </div>
      <div className="absolute top-0 right-0">
        <div className='bg-amber-200 rounded-full text-black font-bold text-2xl px-3 py-1.5 cursor-pointer tooltip-container'
        >
          <span>React js tooltip</span>
          <Tooltip text={"React"} />
        </div>
      </div>
      <div className="absolute bottom-0 right-0">
        <div className='bg-amber-200 rounded-full text-black font-bold text-2xl px-3 py-1.5 cursor-pointer tooltip-container'
        >
          <span>React js tooltip</span>
          <Tooltip text={"React"} />
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
        <div className='bg-amber-200 rounded-full text-black font-bold text-2xl px-3 py-1.5 cursor-pointer tooltip-container'
        >
          <span>React js tooltip</span>
          <Tooltip text={"React"} />
        </div>
      </div>
    </div>
  )
}

export default App
