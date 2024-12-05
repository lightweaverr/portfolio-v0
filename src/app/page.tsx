import GameOfLife from "@/components/GameOfLife";
import JourneySection from "@/components/JourneySection";
import LandingPage from "@/components/LandingPage";
import Navbar from "@/components/Navbar";

const events = [
  { year: 2020, description: "Started college" },
  { year: 2022, description: "First internship" },
  { year: 2023, description: "First full-time job" },
  { year: 2024, description: "First freelance project" },
  { year: 2025, description: "First client project" },
];


export default function Home() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="fixed top-0 left-0 w-screen h-screen -z-10">
          <GameOfLife />
        </div>
        <Navbar />

      <LandingPage />
      </div>
      <JourneySection events={events} />
    </>
  );
}
