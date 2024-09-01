import React, { useEffect, useState } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";
import Toast from "../Toast/Toast";

interface props {
  rule_id: string;
  competition_id: string;
  enabled: number;
  appliesForDivision: string[] | null;
  borrowing_rule_id: string;
  canBorrow: number;
  competitionsAllowed: string[] | null;
  divisionsAllowed: string[] | null;
}

const BorrowingRuleCard = ({
  rule_id,
  competition_id,
  enabled,
  borrowing_rule_id,
  canBorrow,
  appliesForDivision,
  competitionsAllowed,
  divisionsAllowed,
}: props) => {
  const [toast, setToast] = useState(false);

  const [rule, setRule] = useState({
    id: rule_id || "",
    competition_id: competition_id || "",
    enabled: enabled || 1,
    applies_for_division_id: appliesForDivision || [],
  });

  const [borrowingRule, setBorrowingRule] = useState({
    borrowing_rule_id: borrowing_rule_id || "",
    rule_id: rule_id || "",
    can_borrow: canBorrow || 1,
    competitions_allowed: competitionsAllowed || [],
    divisions_allowed: divisionsAllowed || [],
  });

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

  useEffect(() => {
    setRule({
      id: rule_id || "",
      competition_id: competition_id || "",
      enabled: enabled || 1,
      applies_for_division_id: appliesForDivision || [],
    });

    setBorrowingRule({
      borrowing_rule_id: borrowing_rule_id || "",
      rule_id: rule_id || "",
      can_borrow: canBorrow || 0,
      competitions_allowed: competitionsAllowed || [],
      divisions_allowed: divisionsAllowed || [],
    });
  }, [
    rule_id,
    competition_id,
    enabled,
    appliesForDivision,
    borrowing_rule_id,
    canBorrow,
    competitionsAllowed,
    divisionsAllowed,
  ]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-8">
        <div className="flex-1 flex flex-col gap-4 text-sm">
          <div>Select divisions this rule applies to:</div>
          <MultiSelectDropdown
            dropDownFor={"Divisions"}
            optionObjectData={divisionOptionsArray}
            currentData={rule.applies_for_division_id}
          />
        </div>
        <div className="flex-1 flex flex-col gap-4 text-sm">
          <div className="flex gap-2">
            <input
              type="radio"
              name={borrowingRule.borrowing_rule_id}
              id={borrowingRule.borrowing_rule_id + "1"}
              value="canBorrow"
              checked={borrowingRule.can_borrow === 1}
              onChange={() =>
                setBorrowingRule({ ...borrowingRule, can_borrow: 1 })
              }
            />
            <label htmlFor={borrowingRule.borrowing_rule_id + 1}>
              Borrowing
            </label>
            <input
              type="radio"
              name={borrowingRule.borrowing_rule_id}
              id={borrowingRule.borrowing_rule_id + "0"}
              value="cannotBorrow"
              checked={borrowingRule.can_borrow === 0}
              onChange={() =>
                setBorrowingRule({ ...borrowingRule, can_borrow: 0 })
              }
            />
            <label htmlFor={borrowingRule.borrowing_rule_id + 0}>
              Not Borrowing
            </label>
          </div>
          <div className="flex-1 flex flex-col gap-4 text-sm">
            <div>Competitions players can be borrowed from:</div>
            <MultiSelectDropdown
              dropDownFor={"Competitions"}
              optionObjectData={competitionOptionsArray}
              currentData={borrowingRule.competitions_allowed}
            />{" "}
          </div>
          <div className="flex-1 flex flex-col gap-4 text-sm">
            <div>Divisions players can be borrowed from:</div>
            <MultiSelectDropdown
              dropDownFor={"Divisions"}
              optionObjectData={divisionOptionsArray}
              currentData={borrowingRule.divisions_allowed}
            />{" "}
          </div>{" "}
        </div>
      </div>
      <button
        className="text-red-500 border border-red-500 rounded-md text-sm p-1 hover:bg-red-600 hover:text-white"
        onClick={() => {
          setToast(true);
        }}
      >
        Delete Rule
      </button>
      {toast ? (
        <Toast
          heading={"We're working on it!"}
          caption={"Rules are static for now, try query players!"}
          animationEnd={() => setToast(false)}
          type={"orange"}
        />
      ) : null}

      <div className="h-[1px] bg-gray-300"></div>
    </div>
  );
};

export default BorrowingRuleCard;
