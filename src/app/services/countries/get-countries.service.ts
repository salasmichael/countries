import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiCountries;


@Injectable({
  providedIn: 'root'
})
export class GetCountriesService {

  constructor(private http: HttpClient) { }

  getAllCountries() {
		return this.http.get<any>(apiUrl);
	}
}
