import GameOfLife from "@/components/GameOfLife";
import LandingPage from "@/components/LandingPage";
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <div className="absolute top-0 left-0 w-screen h-screen -z-10">
        <GameOfLife />
      </div>
      <Navbar />

    </div>
  );
}
