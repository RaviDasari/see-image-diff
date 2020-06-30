import { useEffect, useCallback, useRef } from "react";

export function useSetCursorToWait(triggerDeps = []) {
    useEffect(() => {
        document.body.style.cursor = 'wait';
    }, triggerDeps);

    const cursorTimer = useRef();
    useEffect(() => {
        if (cursorTimer.current) {
            clearTimeout(cursorTimer.current);
        }
        // in case layout change didn't happen
        cursorTimer.current = setTimeout(() => {
            document.body.style.cursor = 'default';
        }, 1000)
    });

    const resetToDefault = useCallback(() => {
        document.body.style.cursor = 'default';
    }, []);

    return [resetToDefault];
}