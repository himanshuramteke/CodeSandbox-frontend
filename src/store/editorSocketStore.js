import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFileTabStore";
import { useTreeStructureStore } from "./treeStructureStore";
import { usePortStore } from "./portStore";

export const useEditorSocketStore = create((set) => ({
    editorSocket: null,
    setEditorSocket: (incomingSocket) => {

        const activeFileTabSetter = useActiveFileTabStore.getState().setActiveFileTab;
        const projectTreeStructureSetter = useTreeStructureStore.getState().setTreeStructure;

        const portSetter = usePortStore.getState().setPort;

        incomingSocket?.on("readFileSuccess", (data) => {
            console.log("Read file success", data);
            const fileExtension = data.path.split('.').pop();
            activeFileTabSetter(data.path, data.value, fileExtension);
        });

        incomingSocket?.on("writeFileSuccess", (data) => {
            console.log("Write file success", data);
        });

        incomingSocket?.on("deleteFileSuccess", () => {
            projectTreeStructureSetter();
        });

        incomingSocket?.on('getPortSuccess', ({ port }) => {
            console.log('port data', port);
            portSetter(port);
        })
        
        incomingSocket?.on("createFileSuccess", (data) => {
            console.log("Create file success", data);
            projectTreeStructureSetter();
        });

        incomingSocket?.on("createFolderSuccess", (data) => {
            console.log("Create folder success", data);
            projectTreeStructureSetter();
        });

        incomingSocket?.on("deleteFolderSuccess", (data) => {
            console.log("Delete folder success", data);
            projectTreeStructureSetter();
        });

        incomingSocket?.on("renameFileSuccess", ({ oldPath, newPath}) => {
            console.log(`File renamed from ${oldPath} to ${newPath}`);
            projectTreeStructureSetter();
        });

        incomingSocket?.on("renameFolderSuccess", ({ oldPath, newPath }) => {
            console.log(`Folder renamed from ${oldPath} to ${newPath}`);
            projectTreeStructureSetter();
        });

        incomingSocket?.on("error", (error) => {
            console.error("Socket error", error);
        });
        
        set({
            editorSocket: incomingSocket
        });
    }
}));