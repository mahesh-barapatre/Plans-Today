import { useEffect, useState } from "react";
import { clearTimeout } from "timers";

export const debounce = <T>(value: T, delay = 500): T => {

    const [debounceValue, setDebounceValue] = useState<T>(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [delay, value])

    return debounceValue;
}