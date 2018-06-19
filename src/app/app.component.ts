import { Component, OnInit } from '@angular/core';
import { BlacklistService } from './services/blacklist.service';
import { Cpf } from './models/cpf.interface';
import { VerifyCpf } from './models/verify-cpf.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BlacklistService]
})
export class AppComponent implements OnInit {

  private cpfStatus: VerifyCpf = null;
  private error: string = '';
  private cpf: string = '';
  private blacklist: Cpf[] = [];

  constructor(private blacklistService: BlacklistService) { }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.blacklistService.getBlacklist().subscribe(
      blacklist => {
        this.blacklist = blacklist;
        this.clearAlerts();
      }
    );
  }

  verify(): void {
    this.blacklistService.verifyCpf(this.cpf).subscribe(
      response => {
        this.cpfStatus = response;
      },
      error => this.onError(error)
    );
  }

  addToBlacklist(): void {
    this.blacklistService.putCpf(this.cpf).subscribe(
      () => {
        this.cpf = '';
        this.list()
      },
      error => this.onError(error)
    );
  }

  remove(cpf: string) {
    this.blacklistService.removeCpf(cpf).subscribe(
      () => {
        this.cpf = '';
        this.list()
      },
      error => this.onError(error)
    );
  }

  onError(error) {
    if (error && error.error && error.error.error) {
      this.error = error.error.error;
    } else {
      this.error = 'Unknow error';
      console.error(error);
    }
  }

  clearAlerts(): void {
    this.error = '';
    this.cpfStatus = null;
  }

}
