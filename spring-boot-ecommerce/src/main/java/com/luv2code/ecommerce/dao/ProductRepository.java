package com.luv2code.ecommerce.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.luv2code.ecommerce.entity.Product;

@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {
	
	/** Método exposto como /api/products/search/findByCategoryId?id=X */
	Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable) ;
	
	/** Método exposto como /api/products/search/findByNameContaining?name=X */
	Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable) ;
}
