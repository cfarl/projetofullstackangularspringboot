import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})

//----------------------------------------------------
// Classe que trata o menu lateral
//----------------------------------------------------
export class ProductCategoryMenuComponent implements OnInit {

  productCategories!: ProductCategory[] ;

  //----------------------------------------------------------------------------------------------------------------
  // Construtor. Recebe o service chamado por essa classe
  //----------------------------------------------------------------------------------------------------------------  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
      this.listProductCategories() ;
  }

  //------------------------------------------------------------
  // Recupera lista de categorias, para construcao do menu
  //------------------------------------------------------------
  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories = ' + JSON.stringify(data)) ;
        this.productCategories = data ;
      }
    );
  }

}
