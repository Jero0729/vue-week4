import {createApp} from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js";
import { Post_check,Get_productsPage } from './api.js'
import pagination from './componet/pagination.js'
import productModal from './componet/productModal.js'
import delProductModal from './componet/delProductModal.js'

let productModalDOM =null;
let delProductModalDOM=null

const app = createApp({
    data() {
      return {
        url: "https://vue3-course-api.hexschool.io/v2",
        path: "mmee1122",
        products: [],
        pagination:{},
        tempProduct: {
          imagesUrl: []
        },
        isNew: false,
      };
    },
    methods: {
      checkUser() {
        Post_check()
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          alert(err.data.message);
          window.location = "index.html";
        });
      },
      getData(page=1) {
        if(page === "now"){
          page = this.pagination.current_page
        }
        Get_productsPage(page)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          console.log(err.data);
        });
      },      
      openModal(status,product){
        if(status === "stop"){
          this.tempProduct = {
            imagesUrl: []
          };
          this.isNew =true;
          productModalDOM.show();
        }else if(status === "edit"){
          this.tempProduct = JSON.parse(JSON.stringify(product));
          this.isNew = false;
          productModalDOM.show();
          }else if(status === "delete"){
            this.tempProduct = JSON.parse(JSON.stringify(product));
            delProductModalDOM.show()
          }
      },
      hideModal(){
        productModalDOM.hide();
        delProductModalDOM.hide();
      }
    },
    components:{pagination,productModal,delProductModal},
    created() {
      this.checkUser();
    },
    mounted(){
      productModalDOM = new bootstrap.Modal(document.getElementById('productModal'));
      delProductModalDOM = new bootstrap.Modal(document.getElementById('delProductModal'));
    }
  })


app.mount("#app");