import React, { useState } from "react";
import BorrowingRuleCard from "../components/BorrowingRules/BorrowingRuleCard";
import PrefixDropdown from "../components/BorrowingRules/PrefixDropdown";

const BorrowingRules = () => {
  const [competition, setCompetition] = useState("");

  return (
    <div className="flex-1">
      <h1 className="bg-indigo-950 text-white p-4 text-center">
        Booking Rules
      </h1>
      <div className="flex flex-col gap-4 p-4">
        {/* Competition */}
        <div className="flex flex-col gap-2 border border-gray-300 bg-white p-4 rounded-md">
          <div className="text-sm">Select a competition:</div>
          <div>
            <PrefixDropdown
              placeholder={""}
              prefixText={"Competition"}
              updateForm={(value: string) => setCompetition(value)}
            />
          </div>
        </div>
        {/* Rules */}
        <div className="flex flex-col gap-6 p-4 bg-white border border-gray-300 rounded-md">
          <h1>Player Borrowing Restrictions for ...</h1>
          <BorrowingRuleCard />
          <BorrowingRuleCard />
          <div className="text-sm text-blue-900 hover:cursor-pointer">
            + Add New Rule
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowingRules;
