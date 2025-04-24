import { create } from "zustand";
 
export const useActiveFileTabStore = create((set) => {
    return {
        activeFileTabStore: null,
        setActiveFileTab: (path, value, extension) => {
            set({
                activeFileTab: {
                    path: path,
                    value: value,
                    extension: extension
                }
            })
        }
    }
});