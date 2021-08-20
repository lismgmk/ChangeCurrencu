import {CurrencyType, exchangeAPI} from "../v6-Api/exchange-api";




export const setReduser = (state: Array<CurrencyType> = [], action: ReturnType<typeof addAllCurrencuAC>
    | ReturnType<typeof deadAllCurrencuAC>

) => {
    switch (action.type) {
        case "ADD_ALL_CURRENCU":
            return [...state, ...action.currencu]
        case "DEAD_All_CURRENCU":
            return []
         default:
            return state
    }
}


export const addAllCurrencuAC = (currencu: Array<CurrencyType>) => ({type: "ADD_ALL_CURRENCU", currencu}) as const
export const deadAllCurrencuAC = () => ({type: "DEAD_All_CURRENCU"}) as const



export const fetchAllCurerencyThunk = () => (dispatch: any) => {
    exchangeAPI.getCurrency()
        .then(data => {
                dispatch(addAllCurrencuAC(data.data))
            }
        )
}

