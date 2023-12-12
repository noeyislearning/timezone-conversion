import { useState, useEffect } from "react"

/** Heroicons */
import { ArrowRightIcon } from "@heroicons/react/24/outline"

/** Components */
import Button from "./components/common/buttons/Button"
import Spinner from "./components/common/spinners/Spinner"

/** API */
import { convertTimezone } from "./api/timeAPI"

/** Data (JSON) */
import buttonsData from "./assets/data/buttons.json"


function App() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())
  const [pickedTime, setPickedTime] = useState("")
  const [activeButton, setActiveButton] = useState("")
  const [convertedTime, setConvertedTime] = useState("")
  const [clickCount, setClickCount] = useState(0)
  const [showWarning, setShowWarning] = useState(false)
  const [disableButtons, setDisableButtons] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    let clickTimer;
    if (clickCount >= 3) {
      setShowWarning(true);
      setDisableButtons(true);

      clickTimer = setTimeout(() => {
        setShowWarning(false);
        setClickCount(0);
        setDisableButtons(false);
      }, 5000); 
    }

    return () => {
      clearTimeout(clickTimer);
    };
  }, [clickCount]);

  const formatTime = (time) => {
    const date = new Date(time)
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true })
  }

  const handlePickedTime = async (timezone) => {
    try {
      setIsLoading(true); 

      const picked = new Date().toISOString();
      setPickedTime(formatTime(picked));

      const converted = await convertTimezone("Asia/Manila", timezone, picked);
      setConvertedTime(formatTime(converted));
    } catch (error) {
      console.error("Error converting time:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async (timezone) => {
    if (!disableButtons) {
      setActiveButton(timezone);
      handlePickedTime(timezone);

      setClickCount((prevCount) => prevCount + 1);
    }
  };

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="w-full flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-2xl">Time Conversion</h3>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-bold">{currentTime}</h1>
              <p className="text-sm text-gray-500">Current Time - Real Time (PH)</p>
            </div>
            <div className="flex flex-row items-center gap-4">
              <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold">{pickedTime || '-'}</h1>
                <p className="-mt-1 text-sm text-gray-500">Picked Time</p>
              </div>
              <ArrowRightIcon className="w-5 h-5"/>
              <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold">{convertedTime || (isLoading ? <Spinner /> : "-")}</h1>
                <p className="-mt-1 text-sm text-gray-500">Converted Time</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center gap-4 md:flex-col lg:flex-row">
          { buttonsData.buttons.map((button, index) => (
            <Button
              key={index}
              label={button.label}
              onClick={() => handleClick(button.timezone)}
              isActive={activeButton === button.timezone}
              disabled={disableButtons}
            />
          ))}
        </div>
        <div className="mt-2 flex w-full justify-center max-w-lg">
        { showWarning && (
          <p className="text-red-500 text-sm">You've reached the limit of button clicks within a second.</p>
        )}
        </div>
      </div>
    </main>
  )
}

export default App
