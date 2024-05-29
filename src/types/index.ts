// 定義一個介面，用來限制person物件的屬性(並分別暴露)
export interface PersonInter  {
    id:string;
    name:string;
    age:number;
}

// 定義一個自定義類型
// export type Persons = Array<PersonInter>
export type Persons = PersonInter[]