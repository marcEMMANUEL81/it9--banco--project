import { handleServiceScanTicket } from "../../service/ticketService";
import bancoLogo from "../../assets/images/bancoLogo.png";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";

function ScannerScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  var [haveData, setHaveData] = useState(true);
  const [isRead, setIsRead] = useState(false);
  var [idTicket, setIdTicket] = useState("");

  const updateIsread = () => {
    setHaveData(false);
    setIsReady(true);
    const data = {
      qrcodeValue: idTicket,
    };
    handleServiceScanTicket(data).then(() => {
      setHaveData(true);
      setTimeout(() => {
        setIsReady(false);
        setIsRead(false);
      }, 1000);
    });
  };

  function makeReady(result) {
    setIsRead(true);
    setIsReady(true);
    setIdTicket(result);
  }

  return (
    <div>
      <div className="p-4 sm:ml-64 text-left">
        <div className="text-left text-2xl font-bold mb-4">
          Scannez le code Qr sur le ticket
        </div>

        <QrScanner
          className="w-full"
          scanDelay={2000}
          key="environment"
          constraints={{
            facingMode: "environment",
          }}
          onDecode={(result) => makeReady(result)}
          onError={(error) => console.log(error?.message)}
        />

        {!isLoading ? (
          <button
            type="submit"
            onClick={updateIsread}
            disabled={!isReady}
            className={`${isReady ? "text-white" : "text-gray-500"} ${
              isReady ? "bg-[#F94C10]" : "bg-gray-200"
            } mt-9 focus:ring-4 focus:outline-none focus:ring-[#F94C10]/70 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >
            Valider
          </button>
        ) : (
          <button
            disabled
            type="button"
            className="text-white bg-[#F94C10]/70 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <div
              role="status"
              class="absolute h-screen w-screen flex flex-col justify-center items-center bg-gray-100 bg-opacity-80 opacity-100 -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
            >
              <img
                className="h-[100px] w-[100px] animate-bounce"
                src={bancoLogo}
              />
              <span class="sr-only">Loading...</span>
            </div>
            Patientez...
          </button>
        )}

        {!haveData ? (
          <div
            role="status"
            class="absolute h-screen w-screen flex flex-col justify-center items-center bg-gray-100 bg-opacity-80 opacity-100 -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
          >
            <div
              role="status"
              class="absolute h-screen w-screen flex flex-col justify-center items-center bg-gray-100 bg-opacity-80 opacity-100 -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
            >
              <img
                className="h-[100px] w-[100px] animate-bounce"
                src={bancoLogo}
              />
              <span class="sr-only">Loading...</span>
            </div>
            <span class="sr-only">Loading...</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ScannerScreen;
