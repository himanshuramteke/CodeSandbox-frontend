import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FileIcon } from "../../atoms/FileIcon/FileIcon";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";
import { useActiveFileTabStore } from "../../../store/activeFileTabStore";
import { useFolderContextMenuStore } from "../../../store/folderContextMenuStore";

export const TreeNode = ({
    fileFolderData
}) => {

    const [visibility, setVisibility] = useState({});

    const { editorSocket } = useEditorSocketStore();
    const { setActiveFileTab } = useActiveFileTabStore();

    const {
        setFile,
        setIsOpen: setFileContextMenuIsOpen,
        setX: setFileContextMenuX,
        setY: setFileContextMenuY
    } = useFileContextMenuStore();

    const {
        setFolder,
        setIsOpen: setFolderContextMenuIsOpen,
        setX: setFolderContextMenuX,
        setY: setFolderContextMenuY
    } = useFolderContextMenuStore();

    function toggleVisibility(name) {
        setVisibility({
            ...visibility,
            [name]: !visibility[name]
        })
    }

    function computeExtension(fileFolderData) {
        const names = fileFolderData.name.split(".");
        return names[names.length - 1];
    }

    function handleDoubleClick(fileFolderData) {
        // Only handle double click for files, not folders
        if (!fileFolderData.children) {
            console.log("Double clicked on", fileFolderData);
            editorSocket.emit("readFile", {
                pathToFileOrFolder: fileFolderData.path
            });
            console.log(fileFolderData);
            setActiveFileTab(fileFolderData.path, "", fileFolderData.name.split('.').pop());
        }
    }

    function handleContextMenuForFiles(e, path) {
        e.preventDefault();
        console.log("Right clicked on file", path);
        setFile(path);
        setFileContextMenuX(e.clientX);
        setFileContextMenuY(e.clientY);
        setFileContextMenuIsOpen(true);
    }

    function handleContextMenuForFolders(e, path) {
        e.preventDefault();
        console.log("Right clicked on folder", path);
        setFolder(path);
        setFolderContextMenuX(e.clientX);
        setFolderContextMenuY(e.clientY);
        setFolderContextMenuIsOpen(true);
    }

    useEffect(() => {
        console.log("Visibility changed", visibility); 
    }, [visibility]);

    return (
        ( fileFolderData && 
        <div
            style={{
                paddingLeft: "15px",
                color: "white"
            }}
        >
            {fileFolderData.children /** If the current node is a folder ? */ ? (
                /** If the current node is a folder, render it as a button */
                <button
                    onClick={() => toggleVisibility(fileFolderData.name)}
                    onContextMenu={(e) => handleContextMenuForFolders(e, fileFolderData.path)}
                    style={{
                        border: "none",
                        cursor: "pointer",
                        outline: "none",
                        color: "white",
                        backgroundColor: "transparent",
                        padding: "15px",
                        fontSize: "16px",
                        marginTop: "10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    {visibility[fileFolderData.name] ? <IoIosArrowDown /> : <IoIosArrowForward />}
                    <FileIcon isFolder={true} isOpen={visibility[fileFolderData.name]} />
                    {fileFolderData.name}
                </button>
            ) : (
                /** If the current node is not a folder, render it as a p */
                <div style={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
                    <FileIcon extension={computeExtension(fileFolderData)} />
                    <p
                        style={{
                            paddingTop: "15px",
                            paddingBottom: "15px",
                            marginTop: "8px",
                            fontSize: "15px",
                            cursor: "pointer",
                            marginLeft: "18px",
                            // color: "black"
                        }}
                        onContextMenu={(e) => handleContextMenuForFiles(e, fileFolderData.path)}
                        onDoubleClick={() => handleDoubleClick(fileFolderData)}
                    >
                        {fileFolderData.name}
                    </p>
                </div>
            )}
            {visibility[fileFolderData.name] && fileFolderData.children && (
                [...fileFolderData.children]
                .sort((a, b) => {
                    const isAFolder = !!a.children;
                    const isBFolder = !!b.children;
                    if (isAFolder && !isBFolder) return -1;
                    if (!isAFolder && isBFolder) return 1;
                    return a.name.localeCompare(b.name); // Optional: sort alphabetically within type
                })
                .map((child) => (
                    <TreeNode 
                        fileFolderData={child}
                        key={child.name}
                    />
                ))
            )}

        </div>)
    )
}