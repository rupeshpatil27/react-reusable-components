import FileUpload from "./component/FileUpload"

function App() {

  return (
    <div className='h-screen w-full flex items-center justify-center gap-2 p-10'>
      <div className='h-full w-full p-[15] rounded-2xl'>

        <h1 className='text-4xl font-extrabold text-center my-5'>File Upload</h1>
        <FileUpload />
      </div>
    </div>
  )
}

export default App
