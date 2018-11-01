import { ICompanyValues } from "../webparts/CompanyValues/CompanyValuesWebPart";

export interface ISharedServiceProvider {
    getAnnouncements(listname: string): Promise<ICompanyValues>;  
}