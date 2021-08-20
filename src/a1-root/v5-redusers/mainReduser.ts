import {CurrencyType, exchangeAPI} from "../v6-Api/exchange-api";
import {AppRootStateType} from "../store";

export const mainReduser = (state: Array<CurrencyType> = [], action: ReturnType<typeof addCurrencuAC>
) => {
    switch (action.type) {
        case "ADD_DATA":
            return action.dataArr
         default:
            return state
    }
}

export const addCurrencuAC = (dataArr: Array<CurrencyType>) => ({type: "ADD_DATA", dataArr}) as const

export const fetchCurerencyThunk = () => (dispatch: any, getState: AppRootStateType) => {
// @ts-ignore
    let currencyArray = getState().mainArr
    exchangeAPI.getCurrency()
        .then(data => {
                const dataArr = data.data.filter(i => {
                    return currencyArray.includes(i.Cur_Abbreviation)
                })
                dispatch(addCurrencuAC(dataArr))
            }
        )
}

