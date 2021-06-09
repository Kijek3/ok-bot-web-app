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
  code: string | null = null;
  userId: string | null = null;
  userName: string | null = null;
  API_ENDPOINT = 'http://vps-348e48ae.vps.ovh.net:2900/api'
  REDIRECT_URI = 'http://localhost:4200/'
  DISCORD_AUTH = 'https://discord.com/api/oauth2/authorize?client_id=849690251575689226&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2F&response_type=code&scope=identify';
  // REDIRECT_URI = 'http://vps-348e48ae.vps.ovh.net/'
  // DISCORD_AUTH = 'https://discord.com/api/oauth2/authorize?client_id=849690251575689226&redirect_uri=http%3A%2F%2Fvps-348e48ae.vps.ovh.net%2F&response_type=code&scope=identify'
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
    const data = `auth_code=${this.code}`;
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded'};
    this.http.post<any>(`${this.API_ENDPOINT}/login`, data, {headers}).subscribe(resp => {
      console.log(resp);
      this.userId = resp.id;
      this.userName = resp.username;
    });
  }
}
