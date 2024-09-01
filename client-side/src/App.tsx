import "./index.css";
import Header from "./ui/Header";
import BorrowingRules from "./ui/BorrowingRules";
import EligiblePlayers from "./ui/EligiblePlayers";

function App() {
  return (
    <div className="flex flex-col gap-8 p-4">
      <Header />
      {/* Main Body */}
      <div className="bg-blue-50">
        <div className="flex justify-between">
          <BorrowingRules />
          <EligiblePlayers />
        </div>
      </div>
    </div>
  );
}

export default App;
