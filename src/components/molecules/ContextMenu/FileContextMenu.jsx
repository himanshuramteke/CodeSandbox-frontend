import { useState } from 'react';
import { useEditorSocketStore } from '../../../store/editorSocketStore';
import { useFileContextMenuStore } from '../../../store/fileContextMenuStore';
import './ContextMenu.css';

export const FileContextMenu = ({ x, y, path }) => {
    const { setIsOpen } = useFileContextMenuStore();
    const { editorSocket } = useEditorSocketStore();

    const [showRenameInput, setShowRenameInput] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const separator = path.includes('\\') ? '\\' : '/';
    const pathParts = path.split(separator);
    const parentPath = pathParts.slice(0, -1).join(separator);
    const originalFileName = pathParts[pathParts.length - 1];

    const closeMenu = () => {
        setIsOpen(false);
        setShowRenameInput(false);
        setInputValue('');
    };

    const handleRename = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) {
            alert("Please enter a valid file name");
            return;
        }

        const newPath = `${parentPath}${separator}${inputValue}`;
        console.log("Renaming file from", path, "to", newPath);

        editorSocket.emit("renameFile", {
            oldPath: path,
            newPath,
        });

        closeMenu();
    };

    const handleDelete = (e) => {
        e.preventDefault();
        if (confirm(`Are you sure you want to delete "${originalFileName}"?`)) {
            console.log("Deleting file at", path);
            editorSocket.emit("deleteFile", {
                pathToFileOrFolder: path,
            });
            closeMenu();
        }
    };

    return (
        <div
            className='fileContextOptionsWrapper'
            style={{ left: x, top: y }}
            onMouseLeave={closeMenu}
        >
            {!showRenameInput ? (
                <>
                    <button
                        className='fileContextButton'
                        onClick={() => {
                            setInputValue(originalFileName);
                            setShowRenameInput(true);
                        }}
                    >
                        Rename File
                    </button>
                    <button
                        className='fileContextButton'
                        onClick={handleDelete}
                    >
                        Delete File
                    </button>
                </>
            ) : (
                <div className="contextMenuInputContainer">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        autoFocus
                        className="contextMenuInput"
                        placeholder="Enter new file name"
                    />
                    <div className="contextMenuInputButtons">
                        <button className="fileContextButton" onClick={handleRename}>
                            Rename
                        </button>
                        <button className="fileContextButton" onClick={closeMenu}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
