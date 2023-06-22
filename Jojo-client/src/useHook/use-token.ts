import { useSelector } from "react-redux";
import { RootState } from "../RTKstore";

export function useToken() {
    return useSelector((state: RootState) => state.auth.token);
}

