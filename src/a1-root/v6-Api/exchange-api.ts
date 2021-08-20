import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://www.nbrb.by/API/ExRates',
})

export type CurrencyType = {
    Cur_ID: number,
    Date: string,
    Cur_Abbreviation: string,
    Cur_Scale: number,
    Cur_Name: string,
    Cur_OfficialRate: string
}
export type CurrencyOneType = {
    Cur_ID: number,
    Cur_Name: string,
}



export const exchangeAPI = {

    getCurrency() {
        return instance.get<Array<CurrencyType>>(`/Rates?Periodicity=0`)
    },
    getOneCurrency( id: number) {
        return instance.get<CurrencyOneType>(`Currencies/${id}`)

    }

}


