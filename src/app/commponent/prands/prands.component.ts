import { CategoriesService } from 'src/app/services/categories.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prands',
  templateUrl: './prands.component.html',
  styleUrls: ['./prands.component.css']
})
export class PrandsComponent implements OnInit {
  allPrands:any[]=[]
  constructor(private _CategoriesService:CategoriesService){}
  ngOnInit(): void {
      this._CategoriesService.brands().subscribe({
        next:(response)=>{
          
          this.allPrands=response.data
          console.log(this.allPrands)
        }
      })
  }
}
