import {defineStore} from 'pinia'
import request from '../utils/request';

export const useProduct = defineStore('products' ,{
    state: () => ({
        products: []
    }),
    getters: {
        getProducts(state) {
			return	this.products = state.products;		
        }
    },
    actions: {
        async fetchProducts() {
            try {
              const data = await request.get('/products')
                this.products = data
              }
              catch (error) {
                alert(error)
                console.log(error)
            }
          }

    },
    
})