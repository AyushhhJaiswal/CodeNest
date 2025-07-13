import Header from "./_components/Header";
import ResizablePanels from "./_components/ResizablePanels";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1800px] mx-auto p-4">
        <Header />
        <ResizablePanels />
      </div>
    </div>
  );
}
