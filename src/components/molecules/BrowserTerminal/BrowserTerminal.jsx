import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { AttachAddon } from "@xterm/addon-attach";
import "@xterm/xterm/css/xterm.css";

import { useTerminalSocketStore } from "../../../store/terminalSocketStore";
import { useTreeStructureStore } from "../../../store/treeStructureStore";

export const BrowserTerminal = () => {
  const terminalRef = useRef(null);
  const { terminalSocket } = useTerminalSocketStore();
  const { setTreeStructure, setProjectId } = useTreeStructureStore();
  const { projectId } = useParams();

  useEffect(() => {
    if (projectId) {
      setProjectId(projectId);
    }

    const term = new Terminal({
      cursorBlink: true,
      theme: {
        background: "#282a37",
        foreground: "#f8f8f3",
        cursor: "#f8f8f3",
        cursorAccent: "#282a37",
        red: "#ff5544",
        green: "#50fa7c",
        yellow: "#f1fa8c",
        cyan: "#8be9fd",
      },
      fontSize: 16,
      fontFamily: "Cascadia Code, monospace",
      convertEol: true,
    });

    term.open(terminalRef.current);
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    fitAddon.fit();

    if (terminalSocket) {
      terminalSocket.onopen = () => {
        const attachAddon = new AttachAddon(terminalSocket);
        term.loadAddon(attachAddon);
      };

      terminalSocket.onmessage = async (event) => {
        let msg = "";

        // ✅ Handle all possible data types
        if (typeof event.data === "string") {
          msg = event.data;
        } else if (event.data instanceof Blob) {
          msg = await event.data.text();
        } else if (event.data instanceof ArrayBuffer) {
          msg = new TextDecoder().decode(event.data);
        }

        const lowerMsg = msg.toLowerCase();
        // ✅ Detect end of npm install (or similar changes)
        if (
          lowerMsg.includes("added") ||
          lowerMsg.includes("installed") ||
          lowerMsg.includes("up to date") ||
          lowerMsg.includes("audited")
        ) {
          setTimeout(() => {
            console.log("📦 Refreshing project tree after terminal command...");
            setTreeStructure(); // ✅ Refresh the folder tree from your Zustand store
          }, 500); // Optional delay for FS to stabilize
        }
      };
    }

    return () => {
      term.dispose();
      terminalSocket?.close();
    };
  }, [terminalSocket, projectId]);

  return (
    <div
      ref={terminalRef}
      style={{ width: "100vw", height: "300px" }}
      className="terminal"
      id="terminal-container"
    ></div>
  );
};
