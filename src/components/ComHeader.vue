<!-- src/components/ComHeader.vue -->
<template>
    <header>
        <div class="container">
            <!-- Logo -->
            <div class="logo">
                <img src="/Images/logo.png" alt="Restaurant Logo">
            </div>

            <!-- Navigation -->
            <nav>
                <ul>
                    <li><router-link to="/">Trang Chủ</router-link></li>
                    <li><router-link to="/thucdon">Thực Đơn</router-link></li>
                    <li><router-link to="/gioithieu">Giới Thiệu</router-link></li>
                    <li><router-link to="/lienhe">Liên Hệ</router-link></li>
                    <li><router-link to="/lichsu">Lịch sử mua hàng</router-link></li>
                    
                    <template v-if="!user">
                        <li><router-link to="/register">Đăng Ký</router-link></li>
                        <li><router-link to="/login">Đăng Nhập</router-link></li>
                    </template>
                </ul>
            </nav>


            <div v-if="user" class="user-info">
                <p class="welcome-text">Xin Chào, {{ user.username }}</p>
                <button class="logout-button" @click="logout">Đăng Xuất</button>
            </div>

            <div v-if="user" class="cta">
                <router-link to="/cart" class="cta-button">Giỏ hàng</router-link>
            </div>
        </div>
    </header>


    <router-view/>
</template>

<script>
import eventBus from '@/eventBus';
export default {
    data() {
        return {
            user: JSON.parse(localStorage.getItem('currentUser')) || null
        };
    },
    created() {
        eventBus.on('loginSucess', (user) => {
            this.user = user;
            window.location.reload();
        });
    },
    methods: {
        logout() {
            localStorage.removeItem('currentUser');
            this.user = null;
            // Làm mới trang sau khi đăng xuất
            window.location.reload();
        }
    }
};
</script>

   
   <style>
   /* Tổng thể header */
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background: linear-gradient(90deg, #3217e0, #71b0f4);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 10px 10px;
    position: sticky;
    top: 0;
    z-index: 1000;
}

/* Logo */
.logo img {
    height: 60px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-radius: 8px;
}

.logo img:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Navigation */
nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 20px;
}

nav ul li a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    padding: 8px 12px;
    transition: all 0.3s ease;
    border-radius: 5px;
}

nav ul li a:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
}

/* Nút CTA Giỏ Hàng */
.cta-button {
    padding: 12px 20px;
    font-size: 1rem;
    font-weight: bold;
    background: linear-gradient(45deg, #fcb034, #ffa726);
    color: #fff;
    text-decoration: none;
    border-radius: 25px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
}

.cta-button:hover {
    background: linear-gradient(45deg, #ffa726, #fcb034);
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

/* Thông tin người dùng */
.user-info {
    display: flex;
    align-items: center;
    gap: 15px;
    background: rgba(255, 255, 255, 0.2);
    padding: 8px 16px;
    border-radius: 20px;
    color: white;
    font-size: 0.9rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.welcome-text {
    margin: 0;
    font-weight: 500;
    font-size: 1rem;
}

/* Responsive cho màn hình nhỏ */
@media (max-width: 768px) {
    .container {
        flex-direction: column;
        gap: 15px;
    }

    nav ul {
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
    }

    nav ul li a {
        font-size: 0.9rem;
    }

    .cta-button {
        padding: 10px 16px;
        font-size: 0.9rem;
    }

    .user-info {
        gap: 10px;
        padding: 6px 12px;
    }

    .welcome-text {
        font-size: 0.85rem;
    }
}

    </style>