
export const mainArrayReduser = (state: Array<string> = ['USD', 'RUB', 'EUR'], action:
    | ReturnType<typeof addElArrayAC>
    | ReturnType<typeof delElArrayAC>
) => {
    switch (action.type) {
        case "ADD_ELEM":
            return [...state, action.el]
        case "DEL_ELEM":
            return [...state].filter(item => item != action.el)
         default:
            return state
    }
}


export const addElArrayAC = (el: string) => ({type: "ADD_ELEM", el}) as const
export const delElArrayAC = (el: string) => ({type: "DEL_ELEM", el}) as const



