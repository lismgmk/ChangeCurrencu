import {CurrencyType, exchangeAPI} from "../v6-Api/exchange-api";
import {initialCurrencuAC} from "./initialReduser";

export const setReduser = (state: Array<CurrencyType> = [], action: ReturnType<typeof addAllCurrencuAC>

) => {
    switch (action.type) {
        case "ADD_ALL_CURRENCU":
            return action.currencu
         default:
            return state
    }
}


export const addAllCurrencuAC = (currencu: Array<CurrencyType>) => ({type: "ADD_ALL_CURRENCU", currencu}) as const

export const fetchAllCurerencyThunk = () => (dispatch: any) => {
    dispatch(initialCurrencuAC(true))
    exchangeAPI.getCurrency()
        .then(data => {
                dispatch(addAllCurrencuAC(data.data))
            dispatch(initialCurrencuAC(false))
            }
        )
}

