import { useEffect, useState } from "react";
import BorrowingRuleCard from "../components/BorrowingRules/BorrowingRuleCard";
import PrefixDropdown from "../components/BorrowingRules/PrefixDropdown";
import Toast from "../components/Toast/Toast";
import config from "../config/config";

interface rawRuleData {
  ruleData: ruleData;
  borrowingRuleData: borrowingRuleData;
}

interface ruleData {
  id: string;
  competition_id: string;
  enabled: number;
  applies_for_division_id: string[] | null;
}

interface borrowingRuleData {
  borrowing_rule_id: string;
  rule_id: string;
  can_borrow: number;
  competitions_allowed: string[] | null;
  divisions_allowed: string[] | null;
}

const BorrowingRules = () => {
  const [toast, setToast] = useState(false);

  const [competition, setCompetition] = useState("");

  const [rawRuleData, setRawRuleData] = useState<rawRuleData[]>([]);
  const [ruleData, setRuleData] = useState<ruleData[]>([]);
  const [borrowingRuleData, setBorrowingRuleData] = useState<
    borrowingRuleData[]
  >([]);

  // GET all rules
  const getRules = async () => {
    try {
      const response = await fetch(`${config.api.baseURL}/rules`);
      if (!response.ok) {
        throw new Error("Error with getting rules");
      }

      const data = response.json();
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // Transform API data
  const digestRuleAPI = (items: any[], competition: string) => {
    // Filter items based on competition_id in ruleData
    const filteredItems = items.filter((item) => {
      return item.ruleData?.competition_id === competition;
    });

    // Define the arrays to hold the separated data
    const ruleDataArray = [] as ruleData[];
    const borrowingRuleDataArray = [] as borrowingRuleData[];

    // Define the keys that belong to ruleData
    const ruleDataKeys = [
      "id",
      "competition_id",
      "enabled",
      "applies_for_division_id",
    ];

    // Iterate over the filtered items
    filteredItems.forEach((item) => {
      const ruleData = {} as any;
      const borrowingRuleData = {} as any;

      // Separate the keys inside ruleData
      for (const key in item.ruleData) {
        if (ruleDataKeys.includes(key)) {
          ruleData[key] = item.ruleData[key];
        }
      }

      // Copy the borrowingRuleData
      for (const key in item.borrowingRuleData) {
        borrowingRuleData[key] = item.borrowingRuleData[key];
      }

      // Push the separated objects into their respective arrays
      ruleDataArray.push(ruleData);
      borrowingRuleDataArray.push(borrowingRuleData);
    });

    // Now you can set the state or return the arrays
    setRuleData(ruleDataArray);
    setBorrowingRuleData(borrowingRuleDataArray);
  };

  const renderRuleCards = () => {
    return rawRuleData
      .filter((item) => item.ruleData.competition_id === competition)
      .map((item, index) => {
        console.log("ran");
        return (
          <BorrowingRuleCard
            key={index}
            rule_id={item.ruleData.id}
            competition_id={item.ruleData.competition_id}
            enabled={item.ruleData.enabled}
            appliesForDivision={item.ruleData.applies_for_division_id}
            borrowing_rule_id={item.borrowingRuleData.borrowing_rule_id}
            canBorrow={item.borrowingRuleData.can_borrow}
            competitionsAllowed={item.borrowingRuleData.competitions_allowed}
            divisionsAllowed={item.borrowingRuleData.divisions_allowed}
          />
        );
      });
  };

  useEffect(() => {
    // Separate into rule and borrowingRules array
    (async () => {
      const data = await getRules();
      setRawRuleData(data);
      digestRuleAPI(await data, competition);
    })();
  }, [competition]);

  useEffect(() => {
    // Separate into rule and borrowingRules array
    (async () => {
      const data = await getRules();
      setRawRuleData(data);
      digestRuleAPI(await data, competition);
    })();

    renderRuleCards();
  }, []);

  useEffect(() => {
    console.log(rawRuleData);
  }, [rawRuleData]);

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
          {renderRuleCards()}
          <div className="flex items-center justify-between">
            <div
              className="text-sm text-blue-900 hover:cursor-pointer"
              onClick={() => setToast(true)}
            >
              + Add New Rule
            </div>
            <div
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:cursor-pointer"
              onClick={() => setToast(true)}
            >
              Save Changes
            </div>
          </div>
        </div>
      </div>
      {toast ? (
        <Toast
          heading={"We're working on it!"}
          caption={"Rules are static for now, try query players!"}
          animationEnd={() => setToast(false)}
          type={"orange"}
        />
      ) : null}
    </div>
  );
};

export default BorrowingRules;
