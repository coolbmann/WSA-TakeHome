import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface props {
  dropDownFor: string;
  optionObjectData: any[];
  currentData: string[];
}

const MultiSelectDropdown = ({
  dropDownFor,
  optionObjectData,
  currentData,
}: props) => {
  const [active, setActive] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [selectedOptionIds, setSelectedOptionIds] = useState<any[] | null>([]);

  const divRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setActive(!active); // Change state when clicking outside the div
    }
  };

  // ==> Service Layer: Option Data
  const optionData = optionObjectData;

  // ==> Service Layer: Remove selected day
  const removeDay = (day: string) => {
    // Remove from UI
    const newArray = selectedOptions.filter((item) => item !== day);
    setSelectedOptions(newArray);
  };

  // ==> View Layer: Dropdown option element
  const optionElement = () => {
    return optionData?.map((item, index) => {
      if (selectedOptions.includes(item.name)) {
        return (
          <div
            key={index}
            data-value={item}
            className="flex gap-3 rounded-md w-full text-sm px-3 py-2 text-gray-400"
          >
            <div>{item.name}</div>
          </div>
        );
      }

      return (
        <div
          key={index}
          data-value={item}
          onClick={() => {
            setSelectedOptions([...selectedOptions, item.name]);
          }}
          className="flex gap-3 rounded-md w-full text-sm px-3 py-2 hover:bg-gray-100"
        >
          <div>{item.name}</div>
        </div>
      );
    });
  };

  // --> View Layer: Input element
  const inputItem = () => {
    // IF element inactive, display dropDownFor or selected option
    if (selectedOptions.length === 0) {
      return (
        <div className="rounded-md text-[0.688rem] text-white bg-blue-600">
          <div className="px-2">All {dropDownFor}</div>
        </div>
      );
    } else {
      return selectedOptions.map((item, index) => {
        return (
          <div
            key={index}
            className="flex justify-start items-center px-1 py-0 gap-1 rounded-md text-[0.688rem] text-white bg-blue-600"
          >
            <div>{item}</div>
            <div
              className="cursor-pointer"
              onClick={(e) => {
                removeDay(item);
                e.stopPropagation();
                setActive(false);
              }}
            >
              <IoClose />
            </div>
          </div>
        );
      });
    }
  };

  // Listen for clicks outside of dropdown component to collapse element
  useEffect(() => {
    if (active) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    inputItem();
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [active]);

  // On load, sync UI with latest ID array state
  useEffect(() => {
    const matchId = () => {
      const idArray = currentData.map((item) => {
        const matchingId = optionData.find((element) => element.id === item);
        return matchingId ? matchingId.name : null;
      });
      return idArray;
    };

    if (currentData?.length === 0) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions(matchId());
    }
  }, [currentData]);

  useEffect(() => {
    console.log(currentData);
  }, [currentData]);

  // Keep ID array state in sync with UI
  useEffect(() => {
    const matchId = () => {
      const idArray = selectedOptions.map((item) => {
        const matchingId = optionData.find((element) => element.name === item);
        return matchingId ? matchingId.id : null;
      });

      return idArray;
    };

    if (selectedOptions.length === 0) {
      setSelectedOptionIds(null);
    } else {
      setSelectedOptionIds(matchId());
    }
  }, [selectedOptions]);

  useEffect(() => {
    console.log(selectedOptionIds);
  }, [selectedOptionIds]);

  return (
    <div ref={divRef} className="relative flex flex-col gap-2 w-full">
      <div
        id="regDropdownContainer"
        className={
          active
            ? "flex justify-between border border-gray-300 rounded-md w-full text-sm border-mandarin overflow-hidden"
            : "flex justify-between border border-gray-300 rounded-md w-full text-sm overflow-hidden"
        }
        onClick={() => {
          setActive(!active);
        }}
      >
        <div className="flex flex-wrap gap-1 min-h-[36px] py-2 px-3 rounded-md w-full text-gray-400">
          {inputItem()}
        </div>
        <div className="border-l border-gray-300 px-3 my-2 flex justify-center items-center">
          <FaChevronDown id="regDropdownChevron" />
        </div>
      </div>
      {active ? (
        <div className="absolute top-[2.75rem] flex flex-col justify-between  p-1 bg-white border border-gray-300 rounded-md w-full text-sm z-10 overflow-auto">
          {optionElement()}
        </div>
      ) : null}
    </div>
  );
};

export default MultiSelectDropdown;
