import { useState, useEffect, Fragment } from "react"

/** Heroicons */
import { 
  ArrowRightIcon, 
  CheckIcon, 
  ChevronUpDownIcon 
} from "@heroicons/react/24/outline"

/** Headless UI */
import { Listbox, Transition } from "@headlessui/react"

/** Components */

/** Utilities */
import { convertCurrentTimeToTimeZone } from "./utils/timeConversion"

/** Data (JSON) */
import buttonsData from "./assets/data/buttons.json"

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  );

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString('en-US')
  );
  const [selectedTimezone, setSelectedTimezone] = useState("Select to convert")
  const [convertedDate, setConvertedDate] = useState(null);
  const [convertedTime, setConvertedTime] = useState(null);


  /**
   * Update the current date and time every second
   * @returns {void}
   */
  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const currentTime = now.toLocaleTimeString('en-US');
      setCurrentTime(currentTime);
  
      if (selectedTimezone !== 'Select to convert') {
        const { convertedDate, convertedTime } = convertCurrentTimeToTimeZone(
          now,
          'UTC',
          selectedTimezone
        );
        setConvertedDate(convertedDate);
        setConvertedTime(convertedTime);
      } else {
        setConvertedDate(null);
        setConvertedTime(null);
      }
    };
  
    const timer = setInterval(updateTimes, 1000);
  
    return () => clearInterval(timer);
  }, [selectedTimezone]);
  
  
  /**
   * Remove the underscore from the timezone string
   * @param {string} timezone
   * @returns {string}
   */
  const removeUnderscore = (timezone) => {
    return timezone.replace(/_/g, " ")
  }

  /**
   * Change timezone and convert date & time when user selects a timezone
   * @param {string} timezone
   * @returns {void} 
   */
  const handleTimezoneChange = (timezone) => {
    if (timezone !== "Select to convert") {
      setSelectedTimezone(timezone);
      const { convertedDate, convertedTime } = convertCurrentTimeToTimeZone(
        new Date(),
        'UTC',
        timezone
      );
      setConvertedDate(convertedDate);
      setConvertedTime(convertedTime);
    } else {
      // Handle the case when "Select to convert" is chosen
      setSelectedTimezone("Select to convert");
      setConvertedDate(null);
      setConvertedTime(null);
    }
  };
  
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="w-full flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-2xl">Timezone Conversion</h3>
          <div className="mt-10 flex flex-col items-center gap-8">
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-bold">{currentDate}</h1>
              <h1 className="text-3xl font-bold">{currentTime}</h1>
              <span className="text-sm text-gray-500">Current</span>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-bold">{convertedDate}</h1>
              <h1 className="text-3xl font-bold">{convertedTime}</h1>
              { selectedTimezone !== "Select to convert" && convertedTime !== null && (
                <div className="flex flex-col items-center">
                  <span className="text-sm text-gray-500">Converted</span>
                  <span className="-mt-1 text-sm text-gray-500">({removeUnderscore(selectedTimezone)})</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center gap-4 md:flex-col lg:flex-row">
          <div className="mt-4 relative w-60">
            <Listbox value={selectedTimezone} onChange={handleTimezoneChange}>
              <Listbox.Button className="flex flex-row items-center justify-center overflow-hidden gap-2 w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-black hover:bg-black group focus:outline-none">
                <span className="group-hover:text-white">{selectedTimezone}</span>
                <ChevronUpDownIcon className="w-5 h-5 text-black group-hover:text-white"/>
              </Listbox.Button>
              <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                <Listbox.Options className="absolute w-60 mt-1 overflow-hidden text-base bg-white border border-black max-h-48 focus:outline-none sm:text-sm listbox-options">
                  <Listbox.Option key={-1} value="Select to convert" className={({ active }) => `text-sm ${active ? 'text-white bg-black' : 'text-gray-900'} cursor-not-allowed select-none relative py-2 pl-10 pr-4`}>
                    <span className={`font-normal block truncate`}>
                      Select to convert
                    </span>
                  </Listbox.Option>
                  { buttonsData.buttons.map((button, index) => (
                    <Listbox.Option key={index} value={button.timezone} className={({ active }) => `text-sm ${active ? 'text-white bg-black' : 'text-gray-900'} cursor-default select-none relative py-2 pl-10 pr-4`}>
                      {({ selected, active }) => (
                        <>
                          <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                            {removeUnderscore(button.timezone)}
                          </span>
                          { selected ? (
                            <span className={`${active ? 'text-black-600' : 'text-black-600'} text-xs absolute inset-y-0 left-0 flex items-center pl-3`}>
                              <CheckIcon className="w-5 h-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
