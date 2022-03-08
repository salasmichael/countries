import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { FavoritesService } from 'src/app/services/storage/favorites.service';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  display$: Observable<'open' | 'close'> | undefined;
  infoCountry:any = {}

  constructor(
      private modalService: ModalService,
      private _favoritesService:FavoritesService
  ) {}

  ngOnInit() {
    this.display$ = this.modalService.watch();
    this.modalService.infoCountry.subscribe((res:any)=>{
      if(res){
        if(res.currencies){res.languages   = Object.values(res.languages);}
        if( res.currencies){res.currencies  = Object.values(res.currencies);}
        this.infoCountry = res
      }
    })
  }

  close() {
    this.modalService.close();
  }

  Favorite(action:any){
      this._favoritesService.favorite(this.infoCountry.name.common,action)
        .then((res:any)=>{
          action=='add' ? this.infoCountry.favorite = true : this.infoCountry.favorite = false
      })
  }


}
