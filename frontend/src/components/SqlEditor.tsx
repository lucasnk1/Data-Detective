import React from "react";
import Editor from "@monaco-editor/react";

export function SqlEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="dd-inset h-full overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage="sql"
        value={value}
        onChange={(v) => onChange(v || "")}
        options={{
          minimap: { enabled: false },
          automaticLayout: true,
          fontSize: 13,
          fontFamily: "Courier New, monospace",
          scrollBeyondLastLine: false,
          wordWrap: "on",
        }}
      />
    </div>
  );
}

