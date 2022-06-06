const STORAGE_KEY = "todos-react";
export function loadState() {
    try {
        const serializedState = localStorage.getItem(STORAGE_KEY);
        if (!serializedState) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
}

export async function saveState(state: any) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(STORAGE_KEY, serializedState);
    } catch (e) {
    }
}