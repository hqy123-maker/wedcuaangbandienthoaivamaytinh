<template>
  <div class="product-detail-container" v-if="product">
    <div class="product-detail-card">
      <div class="product-image">
        <img :src="product.image" :alt="product.name">
      </div>
      <div class="product-info">
        <h1 class="product-name">{{ product.name }}</h1>
        <p class="product-description">{{ product.description }}</p>
        <div class="product-price">{{ product.price.toLocaleString() }} VNĐ</div>
        <div class="product-stock">Còn lại: {{ product.quality }} phần</div>
        
        <div class="quantity-selector">
          <button class="quantity-btn" @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
          <span class="quantity">{{ quantity }}</span>
          <button class="quantity-btn" @click="increaseQuantity" :disabled="quantity >= product.quality">+</button>
        </div>

        <button 
          class="add-to-cart-btn" 
          @click="addToCart" 
          :disabled="product.quality === 0"
        >
          <i class="fas fa-shopping-cart"></i>
          {{ product.quality === 0 ? 'Hết hàng' : 'Thêm vào giỏ hàng' }}
        </button>

        <div class="back-btn">
          <router-link to="/" class="back-link">
            <i class="fas fa-arrow-left"></i> Quay lại
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import items from '@/data/items'
import cart from '@/data/cart'

export default {
  name: 'ProductDetail',
  data() {
    return {
      product: null,
      quantity: 1
    }
  },
  created() {
    const id = parseInt(this.$route.params.id)
    this.product = items.find(item => item.id === id)
  },
  methods: {
    increaseQuantity() {
      if (this.quantity < this.product.quality) {
        this.quantity++
      }
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
    addToCart() {
      if (this.product.quality >= this.quantity) {
        const cartItem = cart.find(item => item.id === this.product.id)
        
        if (cartItem) {
          cartItem.quantity += this.quantity
        } else {
          cart.push({
            id: this.product.id,
            name: this.product.name,
            price: this.product.price,
            image: this.product.image,
            quantity: this.quantity
          })
        }
        
        // Cập nhật số lượng còn lại
        this.product.quality -= this.quantity
        
        // Reset số lượng về 1
        this.quantity = 1
        
        // Hiển thị thông báo thành công
        alert('Đã thêm vào giỏ hàng!')
      }
    }
  }
}
</script>

<style scoped>
.product-detail-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}

.product-detail-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.product-image {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-name {
  font-size: 2rem;
  color: #333;
  margin: 0;
}

.product-description {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
}

.product-price {
  font-size: 1.5rem;
  color: #fcb034;
  font-weight: bold;
}

.product-stock {
  font-size: 1rem;
  color: #666;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 20px 0;
}

.quantity-btn {
  width: 40px;
  height: 40px;
  border: 2px solid #fcb034;
  background: white;
  color: #fcb034;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.quantity-btn:hover:not(:disabled) {
  background: #fcb034;
  color: white;
}

.quantity-btn:disabled {
  border-color: #ccc;
  color: #ccc;
  cursor: not-allowed;
}

.quantity {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.add-to-cart-btn {
  background: #fcb034;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: #e69b20;
}

.add-to-cart-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.back-btn {
  margin-top: 20px;
}

.back-link {
  color: #666;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #fcb034;
}

@media (max-width: 768px) {
  .product-detail-card {
    grid-template-columns: 1fr;
  }
  
  .product-image img {
    height: 300px;
  }
}
</style>