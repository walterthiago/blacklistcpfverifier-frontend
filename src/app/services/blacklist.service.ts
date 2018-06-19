import { Injectable } from "@angular/core";
import { Cpf } from '../models/cpf.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VerifyCpf } from "../models/verify-cpf.interface";

@Injectable()
export class BlacklistService {

  private url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getBlacklist(): Observable<Cpf[]> {
    return this.http.get<Cpf[]>(`${this.url}/cpf`);
  }

  verifyCpf(cpf: String): Observable<VerifyCpf> {
    return this.http.get<VerifyCpf>(`${this.url}/query?cpf=${cpf}`);
  }

  putCpf(cpf: String): Observable<Cpf> {
    return this.http.post<Cpf>(`${this.url}/cpf`, { cpf: cpf });
  }

  removeCpf(cpf: String): Observable<Cpf> {
    return this.http.delete<Cpf>(`${this.url}/cpf/${cpf}`);
  }

}