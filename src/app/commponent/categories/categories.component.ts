import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/interfaces/product';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  constructor(private _CategoriesService:CategoriesService){}
  allcategories:any[]=[]

  ngOnInit(): void {
      this._CategoriesService.allCategorise().subscribe({
        next:(response)=>{
          
          this.allcategories=response.data
          console.log(this.allcategories)
        }
      })
  }
}
