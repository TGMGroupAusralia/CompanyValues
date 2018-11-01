import { ISharedServiceProvider } from '../Service/ISharedServiceProvider';

import { ICompanyValue, ICompanyValues } from "../webparts/CompanyValues/CompanyValuesWebPart";

export class MockServiceProvider implements ISharedServiceProvider {
    constructor() {

    }

    private static mockAnnouncements: ICompanyValue[] = [
        { TextColor:'Red', IconString: ' ', Description: ' ', Title: '1 Over the coming 15 months we are going to show an outrageous sense of urgency when resolving client issues ensuring all client requests are serviced on time and all SLA\'s are exceeded. No matter what the challenge we will not be satisfied until our intern', Id: '1'},
        { TextColor:'Red', IconString: ' ', Description: ' ', Title: '2 Over the coming 15 months we are going to show an outrageous sense of urgency when resolving client issues ensuring all client requests are serviced on time and all SLA\'s are exceeded. No matter what the challenge we will not be satisfied until our intern', Id: '2'},
        { TextColor:'Red', IconString: ' ', Description: ' ', Title: '3 Over the coming 15 months we are going to show an outrageous sense of urgency when resolving client issues ensuring all client requests are serviced on time and all SLA\'s are exceeded. No matter what the challenge we will not be satisfied until our intern', Id: '3'}
    ];

    public getAnnouncements(listname: string) : Promise<ICompanyValues> {
        var announcements: ICompanyValues = { value: MockServiceProvider.mockAnnouncements };
        return new Promise((resolve) => {
            resolve(announcements);
        });
    }

    public logCurrentEnvironment(): String {
        return "Mock Environment Data";
    }
}