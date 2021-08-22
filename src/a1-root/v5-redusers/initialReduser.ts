import {CurrencyType, exchangeAPI} from "../v6-Api/exchange-api";

export const initialReduser = (state: {initial: boolean} = {initial: false} , action: ReturnType<typeof initialCurrencuAC>

) => {
    switch (action.type) {
        case "INITIAL_CURRENCU":
            return {...state, initial: action.initial}
         default:
            return state
    }
}


export const initialCurrencuAC = (initial: boolean) => ({type: "INITIAL_CURRENCU", initial}) as const



