import { Sex } from "../enums/sex";

export interface UserInfo {
    username?: string,
    sex: Sex,
    dateOfBirth: Date;
    height: number;
}
