import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import PremierLeagueIcon from "../../assets/icons/PremierLeague";
import ShuteShield from "../../assets/icons/ShuteShield";
import LeagueTwo from "../../assets/icons/LeagueTwo";

interface props {
  placeholder: string;
  prefixText: string;
  selectionData?: optionDataInterface[];
  updateForm: (value: string) => void;
}

interface optionDataInterface {
  comp_name: string;
  comp_id: string;
  logo: React.ReactNode;
}

const PrefixDropdown = ({
  placeholder,
  prefixText,
  selectionData,
  updateForm,
}: props) => {
  const [active, setActive] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    "791a0893-6cd2-495c-a06e-e7794d21c8c4"
  );
  const [searchInput, setSearchInput] = useState("");
  const [filteredOptions, setFilteredOptions] =
    useState<optionDataInterface[]>();
  const divRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setActive(!active); // Change state when clicking outside the div
    }
  };

  // ==> Service Layer: Option Data
  const optionData = () => [
    {
      comp_name: "NSW Premier League",
      comp_id: "791a0893-6cd2-495c-a06e-e7794d21c8c4",
      logo: <PremierLeagueIcon />,
    },
    {
      comp_name: "NSW Shute Shield",
      comp_id: "511883c3-0f22-4c22-a361-f68dcb6a1939",
      logo: <ShuteShield />,
    },
    {
      comp_name: "NSW League 2",
      comp_id: "c4fd60f4-58c0-4dcb-ae84-b3264277cd30",
      logo: <LeagueTwo />,
    },
  ];

  // ==> Service Layer: Filter by search input
  const searchOptions = () => {
    const data = optionData();

    if (data && data.length !== 0) {
      return data.filter((item) => {
        return item.comp_name.toLowerCase().includes(searchInput.toLowerCase());
      });
    }

    return [];
  };

  // ==> View Layer: Dropdown option element
  const optionElement = () => {
    return filteredOptions?.map((item, index) => {
      return (
        <div
          key={index}
          data-value={item.comp_id}
          onClick={() => {
            setSelectedOption(item.comp_id);
            setActive(false);
            updateForm(item.comp_id);
            console.log("hello");
          }}
          className="flex items-center gap-3 rounded-md w-full text-sm px-3 py-2 hover:bg-gray-100"
        >
          <div className="w-6">{item.logo} </div>
          <div>{item.comp_name}</div>
        </div>
      );
    });
  };

  // --> View Layer: Input element
  const inputItem = () => {
    // IF element active, show text input to allow search
    if (active) {
      return (
        <input
          ref={searchInputRef}
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex gap-3 rounded-md w-full h-full text-sm text-[#4D4D4D] focus:outline-none"
        />
      );
    }

    // IF element inactive, display placeholder or selected option
    // ==> Check if there data is defined, else return empty array
    const data = optionData();
    if (data && data.length !== 0) {
      if (!active && selectedOption === null) {
        return placeholder;
      } else {
        return data
          .filter((item) => item.comp_id === selectedOption)
          .map((item, index) => {
            return (
              <div
                key={index}
                className="flex items-center gap-2 rounded-md w-full h-full text-sm text-[#4D4D4D]"
              >
                <div className="w-8">{item.logo}</div>
                <div>{item.comp_name}</div>
              </div>
            );
          });
      }
    } else {
      return [];
    }
  };

  // Listen for clicks outside of dropdown component to collapse element
  useEffect(() => {
    if (active) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    setSearchInput("");
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [active, selectedOption]);

  // Focus input to enable search when element is clicked
  useEffect(() => {
    active ? searchInputRef.current?.focus() : null;
  }, [active]);

  // Filter options by search input
  useEffect(() => {
    setFilteredOptions(searchOptions());
  }, [searchInput, selectionData]);

  return (
    <div ref={divRef} className="relative flex flex-col gap-2 w-full">
      <div
        id="regDropdownContainer"
        className={
          active
            ? "flex justify-between border rounded-md w-full text-sm border-mandarin overflow-hidden"
            : "flex justify-between border border-gray-300 rounded-md w-full text-sm overflow-hidden"
        }
        onClick={() => {
          setActive(!active);
        }}
      >
        <div className="flex justify-center items-center h-12 py-2 px-2 border-r border-gray-300 bg-gray-200 text-gray-500">
          {prefixText}
        </div>
        <div className="h-12 py-2 px-3 rounded-md w-full text-gray-400">
          {inputItem()}
        </div>
        <div className="border-l border-gray-300 px-3 my-2 flex justify-center items-center">
          <FaChevronDown id="regDropdownChevron" />
        </div>
      </div>
      {active ? (
        <div className="absolute top-[3.625rem] flex flex-col justify-between p-1 max-h-72 bg-white border border-gray-300 rounded-md w-full text-sm z-10 overflow-auto">
          {optionElement()}
        </div>
      ) : null}
    </div>
  );
};

export default PrefixDropdown;
