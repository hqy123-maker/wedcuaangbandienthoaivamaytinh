<template>
   <div class="product-card">
        <router-link :to="{name:'ProductDetail',params:{id}}">
            <div class="product-image">
                <img :src="product.image" :alt="product.name">
            </div>
            <div class="product-info">
                <h3 class="product-name">{{product.name}}</h3>
                <p class="product-description">{{product.description}}</p>
                <div class="product-price">{{product.price.toLocaleString()}} VNĐ</div>
                <div class="product-stock">Còn lại: {{product.quality}} phần</div>
            </div>
        </router-link>
   </div>
</template>

<script>
export default {
    props:['product'],
    data(){
        return{
            id:this.product.id
        }
    }
}
</script>

<style scoped>
.product-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
    height: 100%;
}

.product-card:hover {
    transform: translateY(-5px);
}

.product-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
    border-radius: 8px 8px 0 0;
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.product-info {
    padding: 15px;
}

.product-name {
    font-size: 1.2rem;
    margin: 0 0 10px 0;
    color: #333;
}

.product-description {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 10px;
    height: 40px;
    overflow: hidden;
}

.product-price {
    font-size: 1.1rem;
    color: #fcb034;
    font-weight: bold;
    margin-bottom: 5px;
}

.product-stock {
    font-size: 0.9rem;
    color: #888;
}

a {
    text-decoration: none;
    color: inherit;
}
</style>