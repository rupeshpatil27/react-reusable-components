import { useState } from "react";
import Alert from "./component/Alert";

const App = () => {

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("info");
  const [alertMessage, setAlertMessage] = useState("");


    const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
  };

  return (

    <div className="min-h-screen pt-20 md:pt-30 z-10 flex items-center flex-col gap-5">
      {showAlert && (
        <Alert
          type={alertType}
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
      <h2 className="font-bold text-3xl md:text-4xl text-center text-white">Alert</h2>

      <button
        type="submit"
        onClick={()=>showAlertMessage("info", "You message has been sent!")}
        className="px-5 py-2 text-lg text-center rounded-md cursor-pointer bg-black-200 text-white-50 mt-30"
      >
        Show
      </button>

    </div>
  );
};

export default App;
