const initialState = {
allData : []
}

export default function handleStaticData(state = initialState,action) {
    switch (action.type) {
        case "STATIC_DATA":
            return {
                ...state,
                allData: [...action.payload] 
            }
        default:
            return state;
    }
}