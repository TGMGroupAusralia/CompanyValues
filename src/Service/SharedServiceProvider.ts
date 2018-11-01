import { ISharedServiceProvider } from "./ISharedServiceProvider";
import { ICompanyValues, ICompanyValue } from "../webparts/CompanyValues/CompanyValuesWebPart" ;
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { PageContext } from '@microsoft/sp-page-context';

export class SharedServiceProvider implements ISharedServiceProvider {
    public static readonly serviceKey: ServiceKey<ISharedServiceProvider> = ServiceKey.create<ISharedServiceProvider>('dps:ISharedServiceProvider', SharedServiceProvider);
    private _spHttpClient: SPHttpClient;
    private _pageContext: PageContext;
    private _currentWebUrl: string;

    constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
            this._pageContext = serviceScope.consume(PageContext.serviceKey);
            this._currentWebUrl = this._pageContext.web.absoluteUrl;
        });
    }

    public getAnnouncements(listname: string): Promise<ICompanyValues> {
        return new Promise<ICompanyValues>((resolve) => {
            resolve(this._spHttpClient.get(`${this._currentWebUrl}/_api/lists/GetByTitle('`+listname +`')/items`, SPHttpClient.configurations.v1)
            .then((response : SPHttpClientResponse) => {
                return response.json();
            }));
        });
    }
}