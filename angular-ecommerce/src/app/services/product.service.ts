import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})

//-----------------------------------------------------------
// Servico usado para comunicacao com o back-end
//-----------------------------------------------------------
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  //---------------------------------------------------------------------
  // Construtor. Recebe um httpClient para se comunicar com o back-end
  //---------------------------------------------------------------------
  constructor(private httpClient: HttpClient) { }

  //--------------------------------------------------
  // Recupera produtos por categoria
  //--------------------------------------------------
  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  //--------------------------------------------------
  // Recupera produtos por palavra chave
  //--------------------------------------------------  
  searchProducts(thekeyword: string) : Observable<Product[]> {
     // need to build URL based on the keyword
     const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${thekeyword}`;
     return this.getProducts(searchUrl);
  }

  //--------------------------------------------------
  // Recupra produtos da url informada
  //--------------------------------------------------    
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
        map(response => response._embedded.products)
    );
  }

  //--------------------------------------------------
  // Recupera todas as categorias 
  //--------------------------------------------------    
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}

//--------------------------------------------------
// Retorno da consulta de produtos
//--------------------------------------------------    
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}

//--------------------------------------------------
// Retorno da consulta de categorias
//--------------------------------------------------    
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

