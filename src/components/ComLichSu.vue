<template>
  <div class="history-container">
    <h2>Lịch sử mua hàng</h2>
    <div v-if="purchaseHistory.length === 0" class="empty-history">
      <p>Bạn chưa có lịch sử mua hàng.</p>
      <router-link to="/" class="continue-shopping">Tiếp tục mua sắm</router-link>
    </div>
    <div v-else class="history-list">
      <div
        v-for="(order, index) in purchaseHistory"
        :key="index"
        class="order-item"
      >
        <h3>Đơn hàng #{{ index + 1 }}</h3>
        <p><strong>Ngày mua:</strong> {{ formatDate(order.date) }}</p>
        <p><strong>Tổng số lượng:</strong> {{ order.totalQuantity }} món</p>
        <p><strong>Tổng tiền:</strong> {{ formatPrice(order.totalPrice) }} đ</p>
        <div class="order-details">
          <h4>Chi tiết sản phẩm:</h4>
          <ul>
            <li
              v-for="item in order.items"
              :key="item.id"
              class="order-product"
            >
              <img :src="item.image" alt="product image" class="product-img" />
              <div class="product-info">
                <p><strong>{{ item.name }}</strong></p>
                <p>Giá: {{ formatPrice(item.price) }} đ</p>
                <p>Số lượng: {{ item.quantity }}</p>
                <p>Thành tiền: {{ formatPrice(item.price * item.quantity) }} đ</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComLichSu",
  data() {
    return {
      purchaseHistory: []
    };
  },
  mounted() {
    // Lấy dữ liệu lịch sử từ localStorage
    const history = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
    this.purchaseHistory = history;
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString("vi-VN");
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return (
        date.toLocaleDateString("vi-VN", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }) +
        ` lúc ${date.toLocaleTimeString("vi-VN")}`
      );
    }
  }
};
</script>

<style scoped>
.history-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.empty-history {
  text-align: center;
  margin-top: 50px;
}

.empty-history p {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 20px;
}

.continue-shopping {
  display: inline-block;
  padding: 12px 25px;
  background-color: #ff9800;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.continue-shopping:hover {
  background-color: #e67e22;
  transform: translateY(-2px);
}

.history-list {
  margin-top: 20px;
}

.order-product {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Giãn đều nội dung */
  margin-bottom: 15px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.order-product:last-child {
  border-bottom: none;
}

.product-img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.product-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Để chiếm không gian còn lại */
  margin-left: 15px;
}

.product-info p {
  margin: 5px 0;
  color: #444;
}

.order-product strong {
  color: #222;
  font-weight: bold;
}

/* Điều chỉnh cho màn hình nhỏ */
@media (max-width: 768px) {
  .product-img {
    width: 50px;
    height: 50px;
  }

  .product-info {
    font-size: 0.9rem;
  }
}
h2 {
  text-align: center;
  color: #333;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 30px;
  text-transform: uppercase;
}

h3 {
  color: #333;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

h4 {
  margin-top: 15px;
  color: #555;
  font-size: 1.2rem;
}

p {
  line-height: 1.6;
}

strong {
  color: #222;
  font-weight: bold;
}

@media (max-width: 768px) {
  .product-img {
    width: 50px;
    height: 50px;
  }

  .order-item {
    padding: 15px;
  }

  h3 {
    font-size: 1.3rem;
  }

  h4 {
    font-size: 1.1rem;
  }
}

@media (max-width: 576px) {
  .product-info {
    font-size: 0.9rem;
  }

  h2 {
    font-size: 1.8rem;
  }

  h3 {
    font-size: 1.2rem;
  }
}

</style>
