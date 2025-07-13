"use client";

import Split from "react-split";
import EditorPanel from "./EditorPanel";
import OutputPanel from "./OutputPanel";

export default function ResizablePanelLayout() {
  return (
    <Split
      className="flex gap-4"
      sizes={[50, 50]}
      minSize={300}
      gutterSize={10}
    >
      <EditorPanel />
      <OutputPanel />
    </Split>
  );
}
