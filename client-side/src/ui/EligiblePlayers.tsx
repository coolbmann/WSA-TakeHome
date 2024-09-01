import React, { useEffect, useState } from "react";
import PrefixDropdown from "../components/EligiblePlayers/PrefixDropdown";

interface teamData {
  id: string;
  team_name: string;
  division_name: string;
  competition_name: React.ReactNode;
}

interface playerData {
  full_name: string;
  team_name: string;
  division_name: string;
  competition_name: string;
}

const EligiblePlayers = () => {
  const [selectedTeam, setSelectedTeam] = useState("");

  const [teamData, setTeamData] = useState<teamData[]>([]);

  const [players, setPlayers] = useState<playerData[] | []>([]);

  // GET teams data
  const getTeamData = async () => {
    try {
      const response = await fetch("http://localhost:3005/teams");

      if (!response.ok) {
        throw new Error(`Error at getTeamsData`);
      }

      const data = await response.json();
      setTeamData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  // GET borrowable players
  const getPlayersData = async () => {
    const jsonBody = {
      data: selectedTeam,
    };

    try {
      const response = await fetch("http://localhost:3005/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // This tells the server to expect JSON
        },
        body: JSON.stringify(jsonBody),
      });

      if (!response.ok) {
        throw new Error(`Error at getPlayersData`);
      }

      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error("Please select a team");
      return [];
    }
  };

  useEffect(() => {
    getTeamData();
  }, []);

  useEffect(() => {
    // console.log(competition);
  }, [selectedTeam]);

  return (
    <div className="flex-1">
      <h1 className="bg-blue-600 text-white p-4 text-center">
        Eligible Players to Borrow
      </h1>
      <div className="flex flex-col gap-4 p-4">
        {/* Competition */}
        <div className="flex flex-col gap-2 border border-gray-300 bg-white p-4 rounded-md">
          <div className="text-sm">
            Select a team to view players eligible to be borrowed:
          </div>
          <div className="flex gap-4">
            <PrefixDropdown
              placeholder={""}
              prefixText={"Team"}
              updateForm={(value: string) => setSelectedTeam(value)}
              selectionData={teamData}
            />
            <button
              className="bg-indigo-950 text-white px-6 text-sm rounded-md"
              onClick={() => getPlayersData()}
            >
              Search
            </button>
          </div>
        </div>
        {/* Table */}
        <div className="max-h-[38rem] overflow-y-auto border border-gray-300">
          <table className="w-full bg-white table-fixed-header border-collapse">
            <thead>
              <tr className="bg-indigo-950 text-white text-sm sticky top-0">
                <th className="text-center py-3 text-xs font-medium text-white uppercase w-[6%]">
                  #
                </th>
                <th className=" py-3 text-left text-xs font-medium text-white uppercase w-[24%]">
                  Name
                </th>
                <th className=" py-3 text-left text-xs font-medium text-white uppercase w-[24%]">
                  Team
                </th>
                <th className=" py-3 text-left text-xs font-medium text-white uppercase w-[24%]">
                  Division
                </th>
                <th className=" py-3 text-left text-xs font-medium text-white uppercase w-[24%]">
                  Competition
                </th>
              </tr>
            </thead>
            <tbody>
              {players.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b border-gray-300 text-sm"
                  >
                    <td className="text-center py-2">{index + 1}</td>
                    <td>{item.full_name}</td>
                    <td>{item.team_name}</td>
                    <td>{item.division_name}</td>
                    <td>{item.competition_name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          <div className="inline p-2 rounded-md bg-indigo-950 text-white">
            Count: {players.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EligiblePlayers;
