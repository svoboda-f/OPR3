import { Sex } from "../enums/sex";

export interface CalculatorEntry {
    date: string,
    age: number,
    sex: Sex,
    height: number,
    weight: number,
    bmi?: number,
    bmr?: number
}
