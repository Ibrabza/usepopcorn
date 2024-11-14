import { useState } from "react";

export function useLocalStorage(storageName) {
    const [state, setState] = useState(function (){
        return JSON.parse(localStorage.getItem(storageName.toLowerCase()));
    })
    return [state,setState];
}