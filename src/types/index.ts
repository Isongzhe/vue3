// 定義一個介面，用來限制person物件的屬性(並分別暴露)
export interface PersonInter  {
    id:string;
    name:string;
    age:number;
}

// 定義一個自定義類型
// export type Persons = Array<PersonInter>
export type Persons = PersonInter[]

export interface TravelTime {
    start: string;
    end: string;
}

export interface Airport {
    name: string;
    coordinates: [number, number];
}

// export interface FormData {
//     googleMapURL: string;
//     googleMapURLError: string;
//     arrivalAirport: Airport;
//     arrivalAirportError: string;
//     returnAirport: Airport;
//     returnAirportError: string;
//     dateTimeRange: TravelTime;
//     dateTimeRangeError: string;
//     dateList: string[];
//     dateListError: string;
// }

export interface FormData {
    googleMapURL: string;
    arrivalAirport: Airport;
    returnAirport: Airport;
    dateTimeRange: TravelTime;
    dateList: string[];
}