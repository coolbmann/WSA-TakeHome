import React from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";

const BorrowingRuleCard = () => {
  const divisionOptionsArray = [
    {
      name: "Open Men's",
      id: "f7b44c3c-0cf5-429d-bb35-9df111ed1a42",
    },
    {
      name: "Mens U23",
      id: "09e3c0bb-6fd5-489e-befc-37d3f2ad722f",
    },
    {
      name: "Open Women's",
      id: "7ef7eb8c-086a-4fbb-b9cb-5cfee8ffb36b",
    },
    {
      name: "Womens U23",
      id: "26c0b558-842e-4049-b194-29f7c02ac74e",
    },
  ];

  const competitionOptionsArray = [
    {
      name: "NSW Premier League",
      id: "791a0893-6cd2-495c-a06e-e7794d21c8c4",
    },
    {
      name: "NSW Shute Shield",
      id: "511883c3-0f22-4c22-a361-f68dcb6a1939",
    },
    {
      name: "NSW League 2",
      id: "c4fd60f4-58c0-4dcb-ae84-b3264277cd30",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-8">
        <div className="flex-1 flex flex-col gap-4 text-sm">
          <div>Select divisions this rule applies to:</div>
          <MultiSelectDropdown
            dropDownFor={"Divisions"}
            optionObjectData={divisionOptionsArray}
          />
        </div>
        <div className="flex-1 flex flex-col gap-4 text-sm">
          <div className="flex gap-2">
            <input type="radio" name="allDivisions" />
            <label htmlFor="allDivisions">Borrowing</label>
            <input type="radio" name="allDivisions" />
            <label htmlFor="allDivisions">Not Borrowing</label>
          </div>
          <div className="flex-1 flex flex-col gap-4 text-sm">
            <div>Competitions players can be borrowed from:</div>
            <MultiSelectDropdown
              dropDownFor={"Competitions"}
              optionObjectData={competitionOptionsArray}
            />{" "}
          </div>
          <div className="flex-1 flex flex-col gap-4 text-sm">
            <div>Divisions players can be borrowed from:</div>
            <MultiSelectDropdown
              dropDownFor={"Divisions"}
              optionObjectData={divisionOptionsArray}
            />{" "}
          </div>{" "}
        </div>
      </div>
      <button className="text-red-500 border border-red-500 rounded-md text-sm p-1 hover:bg-red-600 hover:text-white">
        Delete Rule
      </button>
      <div className="h-[1px] bg-gray-300"></div>
    </div>
  );
};

export default BorrowingRuleCard;
