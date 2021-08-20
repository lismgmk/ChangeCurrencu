import {CurrencyType, exchangeAPI} from "../v6-Api/exchange-api";



export const mainReduser = (state: Array<CurrencyType> = [], action: ReturnType<typeof addCurrencuAC>
    | ReturnType<typeof refrechCurrencuAC>
    | ReturnType<typeof deadCurrencuAC>
    | ReturnType<typeof addnNewCurrencuAC>
    | ReturnType<typeof deleteNewCurrencuAC>

) => {
    switch (action.type) {
        case "ADD_CURRENCU":
            return [...state, ...action.currencu]
        case "DEAD_CURRENCU":
            return []
        case "ADD_NEW_CURRENCU":
            return [...state, ...action.currencuAdd]
        case "DELETE_CURRENCU":
            return state.filter(i=>i.Cur_ID != action.id)
        case "REFRESH_CURRENCU":
                [...state]=[]
             return [...state, ...action.currencu]
         default:
            return state
    }
}


export const addCurrencuAC = (currencu: Array<CurrencyType>) => ({type: "ADD_CURRENCU", currencu}) as const
export const addnNewCurrencuAC = (currencuAdd: Array<CurrencyType>) => ({type: "ADD_NEW_CURRENCU", currencuAdd}) as const
export const refrechCurrencuAC = (currencu: Array<CurrencyType>) => ({type: "REFRESH_CURRENCU", currencu}) as const
export const deadCurrencuAC = () => ({type: "DEAD_CURRENCU"}) as const
export const deleteNewCurrencuAC = (id: number) => ({type: "DELETE_CURRENCU", id}) as const

export const fetchCurerencyThunk = () => (dispatch: any) => {
    exchangeAPI.getCurrency()
        .then(data => {
            console.log(data)
                let mainCurrencu = data.data.filter(i => {
                    if (i.Cur_Abbreviation == 'USD') {
                        return true
                    }
                    if (i.Cur_Abbreviation == 'RUB') {
                        return true
                    }
                    if (i.Cur_Abbreviation == 'EUR') {
                        return true
                    }
                })
                dispatch(addCurrencuAC(mainCurrencu))
            }
        )
}
export const refreshCurerencyThunk = () => (dispatch: any) => {
    exchangeAPI.getCurrency()
        .then(data => {
            console.log(data)
                let mainCurrencu = data.data.filter(i => {
                    if (i.Cur_Abbreviation == 'USD') {
                        return true
                    }
                    if (i.Cur_Abbreviation == 'RUB') {
                        return true
                    }
                    if (i.Cur_Abbreviation == 'EUR') {
                        return true
                    }
                })
                dispatch(refrechCurrencuAC(mainCurrencu))
            }
        )
}
export const addCurerencyThunk = (id: number) => (dispatch: any) => {
    exchangeAPI.getCurrency()
        .then(data => {
            console.log(data)
                let mainCurrencu = data.data.filter(i => {
                    if (i.Cur_ID == id) {
                        return true
                    }
                })
                dispatch(addnNewCurrencuAC(mainCurrencu))
            }
        )
}
