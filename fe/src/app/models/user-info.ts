import { Sex } from "../enums/sex";

export interface UserInfo {
    id: number;
    username: string;
    sex: Sex,
    dateOfBirth: Date;
    height: number;
}
