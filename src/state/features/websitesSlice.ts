// Need to use the React-specific entry point to import `createApi`
import {Response} from "@/types/Responses";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/state/store";

interface ResponseStore {
    responses: Response[];
    currentWebsite: string | null;
}

// Define a service using a base URL and expected endpoints
export const responseSlice = createSlice({
    name: "responses",
    initialState: {responses: [], currentWebsite: null} as ResponseStore,
    reducers: {
        setCurrentWebsite: (state, action: PayloadAction<string>) => {
            state.currentWebsite = action.payload;
        },
        addResponse: (state, action: PayloadAction<Response>) => {
            state.responses.push(action.payload);
        },
        addResponses: (state, action: PayloadAction<Response[]>) => {
            state.responses = [...state.responses, ...action.payload];
        },
        clearCurrentWebsite: (state) => {
            state.currentWebsite = null;
        },
        clearResponses: (state) => {
            state.responses = [];
        }
    },
});

export const {
    setCurrentWebsite,
    addResponse,
    addResponses,
    clearCurrentWebsite,
    clearResponses
} = responseSlice.actions;

export const responseCount = (state: RootState) => state.responses.responses.length;

export default responseSlice.reducer;