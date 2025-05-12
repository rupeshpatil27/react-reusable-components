import './App.css';

import CustomButton from "./component/CustomButton"

function App() {

  function checkButton() {
    alert("checked")
  }

  return (
    <div className="main-container">
      <CustomButton
        buttonText={"Click"}
        onclick={checkButton}
      />
    </div>
  )
}

export default App
