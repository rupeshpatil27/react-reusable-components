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
      <br/>
      <br/>
      <br/>
      <br/>
      <CustomButton
        buttonText={"Click"}
        onclick={checkButton}
        rounded={"4px"}
      />
    </div>
  )
}

export default App
