import { useState } from 'react';
import { useEditorSocketStore } from '../../../store/editorSocketStore';
import { useFolderContextMenuStore } from '../../../store/folderContextMenuStore';
import './ContextMenu.css';

export const FolderContextMenu = ({ x, y, path }) => {
    const { setIsOpen } = useFolderContextMenuStore();
    const { editorSocket } = useEditorSocketStore();

    const [showCreateInput, setShowCreateInput] = useState(false);
    const [showRenameInput, setShowRenameInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [inputType, setInputType] = useState('file'); // 'file' or 'folder'

    const separator = path.includes('\\') ? '\\' : '/';
    const pathParts = path.split(separator);
    const parentPath = pathParts.slice(0, -1).join(separator);
    const folderName = pathParts[pathParts.length - 1];

    // Create file or folder
    function handleCreate(e) {
        e.preventDefault();
        if (!inputValue.trim()) {
            alert("Please enter a valid name");
            return;
        }

        const newPath = `${path}${separator}${inputValue}`;
        if (inputType === 'file') {
            console.log("Creating file at", newPath);
            editorSocket.emit("createFile", {
                pathToFileOrFolder: newPath
            });
        } else {
            console.log("Creating folder at", newPath);
            editorSocket.emit("createFolder", {
                pathToFileOrFolder: newPath
            });
        }

        setShowCreateInput(false);
        setInputValue('');
        setIsOpen(false);
    }

    // Rename folder
    function handleRename(e) {
        e.preventDefault();
        if (!inputValue.trim()) {
            alert("Please enter a valid name");
            return;
        }

        const newPath = `${parentPath}${separator}${inputValue}`;
        console.log("Renaming folder from", path, "to", newPath);
        editorSocket.emit("renameFolder", {
            oldPath: path,
            newPath: newPath
        });

        setShowRenameInput(false);
        setInputValue('');
        setIsOpen(false);
    }

    // Delete folder
    function handleFolderDelete(e) {
        e.preventDefault();
        if (confirm(`Are you sure you want to delete the folder "${folderName}"?`)) {
            console.log("Deleting folder at", path);
            editorSocket.emit("deleteFolder", {
                pathToFileOrFolder: path
            });
            setIsOpen(false);
        }
    }

    return (
        <div
            onMouseLeave={() => {
                console.log("Mouse left");
                setIsOpen(false);
            }}
            className='fileContextOptionsWrapper'
            style={{
                left: x,
                top: y,
            }}
        >
            {/* Default options */}
            {!showCreateInput && !showRenameInput ? (
                <>
                    <button
                        className='fileContextButton'
                        onClick={() => {
                            setShowCreateInput(true);
                            setInputType('file');
                        }}
                    >
                        New File
                    </button>
                    <button
                        className='fileContextButton'
                        onClick={() => {
                            setShowCreateInput(true);
                            setInputType('folder');
                        }}
                    >
                        New Folder
                    </button>
                    <button
                        className='fileContextButton'
                        onClick={() => {
                            setInputValue(folderName);
                            setShowRenameInput(true);
                        }}
                    >
                        Rename Folder
                    </button>
                    <button
                        className='fileContextButton'
                        onClick={handleFolderDelete}
                    >
                        Delete Folder
                    </button>
                </>
            ) : showCreateInput ? (
                // Create input field
                <div className="contextMenuInputContainer">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={`Enter ${inputType} name`}
                        autoFocus
                        className="contextMenuInput"
                    />
                    <div className="contextMenuInputButtons">
                        <button
                            className="fileContextButton"
                            onClick={handleCreate}
                        >
                            Create
                        </button>
                        <button
                            className="fileContextButton"
                            onClick={() => {
                                setShowCreateInput(false);
                                setInputValue('');
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                // Rename input field
                <div className="contextMenuInputContainer">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter new folder name"
                        autoFocus
                        className="contextMenuInput"
                    />
                    <div className="contextMenuInputButtons">
                        <button
                            className="fileContextButton"
                            onClick={handleRename}
                        >
                            Rename
                        </button>
                        <button
                            className="fileContextButton"
                            onClick={() => {
                                setShowRenameInput(false);
                                setInputValue('');
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
