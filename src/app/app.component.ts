import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

@Injectable()
export class AppComponent {
  title = 'ok-bot-web-app';
  code: any = null;
  API_ENDPOINT = 'http://147.135.209.57/api'
  // REDIRECT_URI = 'http://localhost:4200/'
  // DISCORD_AUTH = 'https://discord.com/api/oauth2/authorize?client_id=849690251575689226&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2F&response_type=code&scope=identify';
  REDIRECT_URI = 'https://kijek3.github.io/ok-bot-web-app/'
  DISCORD_AUTH = 'https://discord.com/api/oauth2/authorize?client_id=849690251575689226&redirect_uri=https%3A%2F%2Fkijek3.github.io%2Fok-bot-web-app%2F&response_type=code&scope=identify'
  constructor(private http: HttpClient) { }

  ngOnInit() {
    const urlParams = new URLSearchParams(window.location.search);
    this.code = urlParams.get('code');
    if (this.code) {
      this.discordGetAuthToken();
    }
  }

  discordLoginQuery() {
    window.location.href = this.DISCORD_AUTH;
  }

  discordGetAuthToken() {
    const data = {
      "auth_code": this.code
    };
    console.log(data);
    const headers = { 'Content-Type': 'application/json'};
    this.http.post<any>(`${this.API_ENDPOINT}/login`, data, {headers}).subscribe(resp => {
      // console.log(resp.access_token);
      // const headers = { 'Authorization': `Bearer ${resp.access_token}`};
      // this.http.get<any>(`${this.API_ENDPOINT}/users/@me`, { headers }).subscribe(resp => {
      console.log(resp);
      // });
    });
  }
}
