import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';

/**
 * This is a singleton class
 */
@Injectable()
export class AppConfig {
  // Provide all the Application Configs here

  public version: string = "1.0.0";
  public locale: string = "en-US";
  public currencyFormat = {style: "currency", currency: "USD"};
  public dateFormat = {year: 'numeric', month: 'short', day: 'numeric'};
  apiURL = environment.backendport;

  // API Related configs
//   public apiPort: string = "9191";
  public apiPort: string = this.apiURL;
  public apiProtocol: string;
  public apiHostName: string;
  public baseApiPath: string;

  constructor() {
    if (this.apiProtocol === undefined) {
      this.apiProtocol = window.location.protocol;
    }
    if (this.apiHostName === undefined) {
      this.apiHostName = window.location.hostname;
    }
    if (this.apiPort === undefined) {
      this.apiPort = window.location.port;
    }
    if (this.apiHostName.includes("infomud") || this.apiHostName.includes("heroku")) {
      this.baseApiPath = this.apiProtocol + "//" + this.apiHostName + "/";
    } else {
      this.baseApiPath = this.apiProtocol + "//" + this.apiHostName + ":" + this.apiPort + "/";
    }
    if (this.locale === undefined) {
      this.locale = navigator.language;
    }
  }
}
