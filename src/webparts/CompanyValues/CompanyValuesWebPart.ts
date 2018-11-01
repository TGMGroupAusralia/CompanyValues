import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './CompanyValuesWebPart.module.scss';
import * as strings from 'CompanyValuesWebPartStrings';

import { ISharedServiceProvider } from '../../Service/ISharedServiceProvider';
import { MockServiceProvider } from '../../Service/MockServiceProvider';
import { SharedServiceProvider } from '../../Service/SharedServiceProvider';

export interface ICompanyValuesWebPartProps {
  description: string;
  listname: string;
  backgroundcolor: string;
  color: string;
}

export interface ICompanyValues {
  value: ICompanyValue[];
}

export interface ICompanyValue {
  Id: string;
  Title: string;
  TextColor: string;
  IconString: string;
  Description: string;
}

export default class CompanyValuesWebPart extends BaseClientSideWebPart<ICompanyValuesWebPartProps> {
  private _sharedService: ISharedServiceProvider;
  public render(): void {

    // let announcementLogo: string = "";// String(require('./images/Announcement.png'));
    // var item = listitems[this.randomNumberFromRange(0, listitems.length - 1)];
    //debugger;
    this.domElement.innerHTML = `  
    <div class="${styles.CompanyValues}">  
      <header>
        <div class="" id="listItemsContainer">  
        </div>  
      </header>  
    </div>`;
    debugger;
    //this._sharedService =  new MockServiceProvider();
    this._sharedService = this.context.serviceScope.consume(SharedServiceProvider.serviceKey);
    this.renderWebpartData();
  }

  private renderWebpartData() {
    this._sharedService.getAnnouncements(this.properties.listname).then((response: ICompanyValues) => {
      this.renderHtmlFromData(response.value);
    }).catch((err) => {
      console.log('Error getting announcements : ' + err);
    });
  }

  private renderHtmlFromData(listitems: ICompanyValue[]): void {
    var item = listitems[this.randomNumberFromRange(0, listitems.length - 1)];
    let html: string = '';
    debugger;
    var selectedCount = 0;
    html += `
      <div  class="${styles.companyValueBlock}" style="text-align: justify; background-color:${this.properties.backgroundcolor} !important; color:${this.properties.color} !important">
      <img src="${item.IconString}" height="50px" width="50px" style="float: left; margin-right: 20px;">
        <span>
          <div id="listItemContainer" >
          <span>${item.Title}</span>              
          </div>
        </span>
        <div class="companyValueBlock_2d6a967b companyValueDescription_2d6a967b" style="background-color:undefined !important; color:undefined !important">
          <span>
            <div id="listItemContainer">
            <span>${item.Description}</span>              
            </div>
          </span>
        </div>
      </div>
      `;
    const listItemContainer: Element = this.domElement.querySelector('#listItemsContainer');
    listItemContainer.innerHTML = html;
  }

  private randomNumberFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('listname', {
                  label: strings.ListNameFieldLabel
                }),
                PropertyPaneTextField('backgroundcolor', {
                  label: strings.BackgroundColorFieldLabel
                }),
                PropertyPaneTextField('color', {
                  label: strings.ColorFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
