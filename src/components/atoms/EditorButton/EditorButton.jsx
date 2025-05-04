import './EditorButton.css';

export const EditorButton = ({ 
    isActive,
    fileName,
    hasError,
    onClose,
    onClick
}) => {
    return (
        <div
            className={`editor-tab ${isActive ? 'active' : ''} ${hasError ? 'error' : ''}`}
            style={{
                maxWidth: isActive ? '200px' : '150px',
            }}
        >
            <div className="editor-tab-inner">
                {/* File Name Tab */}
                <button
                    className="editor-button"
                    onClick={onClick}
                >
                    {fileName}
                </button>

                {/* Close Button */}
                <button
                    className="close-button"
                    onClick={onClose}
                >
                    x
                </button>
            </div>
        </div>
    );
};
