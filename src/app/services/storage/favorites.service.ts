import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  constructor() { }

  favorite(country:any,action:string) {
    return new Promise((resolve, reject) => {
      let favorites = JSON.parse(localStorage.getItem('favorites')!)
      
      if(action == 'add'){
          if(!favorites){
            localStorage.setItem('favorites', JSON.stringify(country));
          }else{
            favorites = `${favorites},${country}`;
            localStorage.setItem('favorites', JSON.stringify(favorites));
          }
        }else{
          let result = favorites.split(',');
          favorites = result.filter((f:any) => f !== country)
          localStorage.setItem('favorites', JSON.stringify(favorites.toString()));
        }
      resolve(favorites)
    })
  }

}
