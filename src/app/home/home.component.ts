import { Component, OnInit } from '@angular/core';
import { GetCountriesService } from '../services/countries/get-countries.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  infoContinents:any = [];
  infoContinentsTemp:any = [];
  continents:any = [];
  textFilter:string = '';

  constructor(private _getCountriesService: GetCountriesService,
              private _modalService: ModalService) { }

  ngOnInit(): void {
    this.getAllcountries()
  }

  getAllcountries = ()=>{
    this._getCountriesService.getAllCountries()
      .subscribe((data:any)=>{
        if(data){
          let tempContinent:any = [];
          let tempCountries:any = [];
          data.map((c:any)=>{
            if(c.region){
                  if(!tempContinent.includes(c.region) &&  c.region != 'Antarctic' ){
                    tempContinent.push(c.region)
                    this.continents.push({name:c.region})
                  }
                }
          })
          
          this.continents.sort((a:any, b:any) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
          let favorites = JSON.parse(localStorage.getItem('favorites')!)

            this.continents.map((p:any)=>{
              tempCountries = data.filter((c:any) => c.region == p.name )
              if(favorites){
                tempCountries = tempCountries.filter((f:any)=> favorites.includes(f.name.common) ? f['favorite'] = true : f )
              }
              
              tempCountries.sort((a:any, b:any) => a.name.common.toLowerCase().localeCompare(b.name.common.toLowerCase()))
              
              this.infoContinents.push({
                name: p.name,
                countries: tempCountries
              })
          })
          this.infoContinentsTemp = this.infoContinents;

        }
    })
  }

  filterByCont =(ev:any)=>{
    this.infoContinents = this.infoContinentsTemp.filter((cont:any)=> cont.name == ev.target.value)
    if(ev.target.value=='Show All'){
      this.infoContinents = this.infoContinentsTemp;
      return;
    }
    if(ev.target.value=='Favorites'){
       this.infoContinentsTemp.filter((cont:any)=>
        {
          let result = cont.countries.filter((c:any)=>  c.favorite);
          if(result.length>0){
              this.infoContinents.push({ name:result[0].region, countries: result})
          }
        } 
       )
    }
  }

  appFilter(){
    let result = []
    result = this.infoContinentsTemp.filter((cont:any)=> cont.name.toLowerCase() == this.textFilter.toLowerCase().trim())
    if(result.length > 0){
      this.infoContinents = result  
    }else{
    this.infoContinents = [];
    this.infoContinentsTemp.filter((cont:any)=>
          { return cont.countries.filter((country:any)=> {
            if(country.name.common.toLowerCase() == this.textFilter.toLowerCase().trim()){
                this.infoContinents = [{
                  name: country.region,
                  countries: [country]
                }] 
                return
            }
          }) 
        })
    }
  }

  searching(ev:any){
    if(ev.target.value == ''){
      this.infoContinents = this.infoContinentsTemp;
    }
  }

  selectCountry(ev:any){
    this._modalService.infoCountry.next(ev);
    this._modalService.open()
  }
}
