"use client";

import Split from "react-split";
import EditorPanel from "./EditorPanel";
import OutputPanel from "./OutputPanel";
import { useEffect } from "react";

export default function ResizablePanels() {
  useEffect(() => {
    const gutters = document.querySelectorAll(".gutter");
    gutters.forEach((gutter) => {
      gutter.classList.add(
        "bg-transparent",
        "hover:bg-white/5",
        "transition-colors",
        "duration-200",
        "cursor-col-resize"
      );
    });
  }, []);

  return (
    <div className="mt-6">
      <Split
        className="flex gap-4"
        sizes={[50, 50]}
        minSize={300}
        gutterSize={8}
        gutterAlign="center"
        direction="horizontal"
        cursor="col-resize"
      >
        <div className="rounded-xl overflow-hidden">
          <EditorPanel />
        </div>
        <div className="rounded-xl overflow-hidden">
          <OutputPanel />
        </div>
      </Split>
    </div>
  );
}
