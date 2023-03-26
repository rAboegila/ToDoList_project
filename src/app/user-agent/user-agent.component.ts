import { AfterContentInit, AfterViewInit, Component } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-agent',
  templateUrl: './user-agent.component.html',
  styleUrls: ['./user-agent.component.css']
})
export class UserAgentComponent implements AfterContentInit {
  title = 'myTodoList';
  OS!: string;
  Browser!: string;
  isOnline!: string;
  battery!: { level: any; addEventListener: (arg0: string, arg1: () => void) => void; }
  batteryLevel!: number;
  isLogin: boolean = false;
  constructor(private _userService: UsersService) {
    this._userService.loggedIn$.subscribe((res) => {
      this.isLogin = res;
    }
    )
  }
  ngAfterContentInit(): void {
    this.OS = this._userService.getOS()
    this.Browser = this._userService.getBrowserName()
    this.isOnline = this._userService.checkIfOnline() ? 'Online' : 'Offline'
    this.getBatteryLevel()
  }
  getBatteryLevel() {
    let windowNavigator: any;
    windowNavigator = window.navigator;
    windowNavigator.getBattery().then((battery: { level: any; addEventListener: (arg0: string, arg1: () => void) => void; }) => {
      this.batteryLevel = Math.floor(battery.level * 100)
      battery.addEventListener('levelchange', function () {
        document.getElementById('battery')!.innerHTML = String(Math.floor(battery.level * 100)) + '%';
      });
    });
  }
}
