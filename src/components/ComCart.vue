<template>
    <div class="cart-container">
        <div v-if="cart.length==0" class="empty-cart">
            <i class="fas fa-shopping-cart cart-icon"></i>
            <p>Giỏ hàng trống</p>
            <router-link to="/" class="continue-shopping">Tiếp tục mua sắm</router-link>
        </div>
        
        <div v-else class="cart-content">
            <h2 class="cart-title">Giỏ hàng của bạn</h2>
            <div class="cart-table">
                <table>
                    <thead>
                        <tr>
                            <th>HÌNH</th>
                            <th>SẢN PHẨM</th>
                            <th>ĐƠN GIÁ</th>
                            <th>SỐ LƯỢNG</th>
                            <th>THÀNH TIỀN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in cart" :key="item.id">
                            <td><img :src="item.image" class="product-img"></td>
                            <td>{{item.name}}</td>
                            <td>{{formatPrice(item.price)}} đ</td>
                            <td class="quantity-cell">
                                <button @click="decreaseQuantity(item)" class="quantity-btn">-</button>
                                <span class="quantity">{{item.quantity}}</span>
                                <button @click="increaseQuantity(item)" class="quantity-btn">+</button>
                            </td>
                            <td>{{formatPrice(item.price * item.quantity)}} đ</td>
                            <td>
                                <button @click="deleteproduct(item)" class="remove-btn">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="cart-summary">
                <div class="summary-details">
                    <div class="summary-row">
                        <span>Tổng số lượng:</span>
                        <span>{{tongsoluong}} món</span>
                    </div>
                    <div class="summary-row">
                        <span>Tổng tiền:</span>
                        <span class="total-price">{{formatPrice(tongtien)}} đ</span>
                    </div>
                </div>

                <div class="cart-actions">
                    <button @click="xoahet" class="clear-cart-btn">
                        <i class="fas fa-trash"></i> Xóa giỏ hàng
                    </button>
                    <button @click="checkout" class="checkout-btn">
                        <i class="fas fa-credit-card"></i> Thanh toán
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import cart from '../data/cart'
import items from '@/data/items'

export default {
    data(){
        return{
            cart: cart
        }
    },
    computed:{
        tongtien(){
            return this.cart.reduce((total,item)=>total+item.price*item.quantity,0)
        },
        tongsoluong(){
            return this.cart.reduce((total,item)=>total+item.quantity,0)
        }
    },
    methods: {
    formatPrice(price) {
        return price.toLocaleString('vi-VN')
    },
    deleteproduct(item) {
        this.cart = this.cart.filter(x => x.id !== item.id)
    },
    xoahet() {
        if (confirm('Bạn có chắc muốn xóa tất cả sản phẩm khỏi giỏ hàng?')) {
            this.cart = []
        }
    },
    increaseQuantity(item) {
        const productold = items.find(x => x.id === item.id)
        if (productold && productold.quality > 0) {
            item.quantity++
            productold.quality--
        }
    },
    decreaseQuantity(item) {
        const productold = items.find(x => x.id === item.id)
        if (item.quantity > 1) {
            item.quantity--
            productold.quality++
        } else {
            this.deleteproduct(item)
            productold.quality++
        }
    },
    checkout() {
        // Kiểm tra đăng nhập
        const user = JSON.parse(localStorage.getItem('currentUser'))
        if (!user) {
            alert('Vui lòng đăng nhập để thanh toán!')
            this.$router.push('/login')
            return
        }

        // Xử lý thanh toán
        if (confirm('Xác nhận thanh toán đơn hàng?')) {
            // Lưu lịch sử mua hàng
            let purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || []
            purchaseHistory.push({
                userId: user.id,
                items: [...this.cart],
                totalPrice: this.tongtien,
                totalQuantity: this.tongsoluong,
                date: new Date().toISOString()
            })
            localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory))

            // Làm mới giỏ hàng
            alert('Thanh toán thành công! Cảm ơn bạn đã mua hàng.')
            this.cart = []
            this.$router.push('/')
        }
    }
}

}
</script>

<style scoped>
.cart-container {
    max-width: 1200px;
    margin: 40px auto;
    padding: 0 20px;
}

.empty-cart {
    text-align: center;
    padding: 50px 0;
}

.cart-icon {
    font-size: 4rem;
    color: #ccc;
    margin-bottom: 20px;
}

.continue-shopping {
    display: inline-block;
    padding: 10px 20px;
    background-color: #fcb034;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    margin-top: 20px;
    transition: background-color 0.3s;
}

.continue-shopping:hover {
    background-color: #e69b20;
}

.cart-title {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
}

.cart-table {
    margin-bottom: 30px;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th {
    background-color: #f5f5f5;
    padding: 12px;
    text-align: center;
    font-weight: bold;
    color: #333;
}

td {
    padding: 12px;
    text-align: center;
    vertical-align: middle;
    border-bottom: 1px solid #eee;
}

.product-img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 5px;
}

.quantity-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border: 1px solid #ddd;
    background: white;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
}

.quantity-btn:hover {
    background: #f5f5f5;
}

.quantity {
    font-weight: bold;
    min-width: 30px;
}

.remove-btn {
    padding: 8px;
    background: none;
    border: none;
    color: #dc3545;
    cursor: pointer;
    transition: color 0.3s;
}

.remove-btn:hover {
    color: #c82333;
}

.cart-summary {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.summary-details {
    margin-bottom: 20px;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
}

.total-price {
    font-size: 1.2rem;
    font-weight: bold;
    color: #fcb034;
}

.cart-actions {
    display: flex;
    gap: 20px;
    justify-content: flex-end;
}

.clear-cart-btn, .checkout-btn {
    padding: 12px 24px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s;
}

.clear-cart-btn {
    background-color: #dc3545;
    color: white;
}

.clear-cart-btn:hover {
    background-color: #c82333;
}

.checkout-btn {
    background-color: #28a745;
    color: white;
}

.checkout-btn:hover {
    background-color: #218838;
}

@media (max-width: 768px) {
    .cart-actions {
        flex-direction: column;
    }
    
    .cart-table {
        font-size: 0.9rem;
    }
    
    .product-img {
        width: 60px;
        height: 60px;
    }
}
</style>