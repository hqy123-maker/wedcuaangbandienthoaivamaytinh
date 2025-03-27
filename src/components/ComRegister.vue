<template>
  <div class="register-container">
    <div class="register-box">
      <div class="form-header">
        <i class="fas fa-user-plus user-icon"></i>
        <h2>Đăng ký tài khoản</h2>
        <p class="welcome-text">Tạo tài khoản mới</p>
      </div>

      <div class="form-body">
        <div class="form-group">
          <div class="input-group">
            <i class="fas fa-user input-icon"></i>
            <input 
              v-model="username" 
              placeholder="Tên đăng nhập"
              class="form-control" 
            />
          </div>
        </div>

        <div class="form-group">
          <div class="input-group">
            <i class="fas fa-envelope input-icon"></i>
            <input 
              v-model="email" 
              type="email" 
              placeholder="Email"
              class="form-control" 
            />
          </div>
        </div>

        <div class="form-group">
          <div class="input-group">
            <i class="fas fa-lock input-icon"></i>
            <input 
              v-model="password" 
              type="password" 
              placeholder="Mật khẩu"
              class="form-control" 
            />
          </div>
        </div>

        <div class="form-group">
          <div class="input-group">
            <i class="fas fa-lock input-icon"></i>
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Xác nhận mật khẩu"
              class="form-control"
            />
          </div>
        </div>

        <p v-if="error" class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          {{ error }}
        </p>

        <button @click="register" class="register-btn">
          <span>Đăng ký</span>
          <i class="fas fa-arrow-right"></i>
        </button>

        <div class="divider">
          <span>hoặc</span>
        </div>

        <p class="login-link">
          Đã có tài khoản? 
          <router-link to="/login">Đăng nhập</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import users from '@/data/users'

export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: ''
        }
    },
    methods: {
        validateForm() {
            // Kiểm tra trống
            if (!this.username || !this.email || !this.password || !this.confirmPassword) {
                this.error = 'Vui lòng điền đầy đủ thông tin!'
                return false
            }

            // Kiểm tra độ dài username (ít nhất 4 ký tự)
            if (this.username.length < 4) {
                this.error = 'Tên đăng nhập phải có ít nhất 4 ký tự!'
                return false
            }

            // Kiểm tra định dạng email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(this.email)) {
                this.error = 'Email không hợp lệ!'
                return false
            }

            // Kiểm tra độ dài mật khẩu (ít nhất 6 ký tự)
            if (this.password.length < 6) {
                this.error = 'Mật khẩu phải có ít nhất 6 ký tự!'
                return false
            }

            // Kiểm tra mật khẩu có ít nhất 1 chữ hoa và 1 số
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/
            if (!passwordRegex.test(this.password)) {
                this.error = 'Mật khẩu phải chứa ít nhất 1 chữ hoa và 1 số!'
                return false
            }

            // Kiểm tra mật khẩu xác nhận
            if (this.password !== this.confirmPassword) {
                this.error = 'Mật khẩu xác nhận không khớp!'
                return false
            }

            // Kiểm tra username đã tồn tại
            if (users.find(user => user.username === this.username)) {
                this.error = 'Tên đăng nhập đã tồn tại!'
                return false
            }

            // Kiểm tra email đã tồn tại
            if (users.find(user => user.email === this.email)) {
                this.error = 'Email đã được sử dụng!'
                return false
            }

            return true
        },
        register() {
            if (this.validateForm()) {
                // Thêm người dùng mới
                const newUser = {
                    id: users.length + 1,
                    username: this.username,
                    email: this.email,
                    password: this.password
                }
                users.push(newUser)

                // Lưu vào localStorage
                localStorage.setItem('users', JSON.stringify(users))

                // Thông báo và chuyển hướng
                alert('Đăng ký thành công!')
                this.$router.push('/login')
            }
        }
    }
}
</script>
<style scoped>
.register-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 20px;
}

.register-box {
    width: 100%;
    max-width: 600px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    animation: slideUp 0.5s ease;
}

.form-header {
    text-align: center;
    padding: 35px 30px;
    background: linear-gradient(135deg, #fcb034 0%, #ff9800 100%);
    color: white;
}

.user-icon {
    font-size: 4rem;
    margin-bottom: 10px;
}

.form-header h2 {
    font-size: 2rem;
    margin: 10px 0;
}

.welcome-text {
    font-size: 1rem;
    opacity: 0.9;
}

.form-body {
    padding: 40px;
}

.form-group {
    margin-bottom: 20px;
}

.input-group {
    position: relative;
}

.input-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
}

.form-control {
    width: 100%;
    padding: 15px 15px 15px 15px;
    border: 1px solid #ddd;
    border-radius: 15px 20px 20px 15px;
    font-size: 1.1rem;
    transition: all 0.3s ease;
}

.form-control:focus {
    outline: none;
    border-color: #fcb034;
    box-shadow: 0 0 0 3px rgba(252, 176, 52, 0.2);
}

.error-message {
    color: #dc3545;
    font-size: 0.9rem;
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 10px;
    background: rgba(220, 53, 69, 0.1);
    border-radius: 8px;
    animation: shake 0.5s ease;
}

.register-btn {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, #fcb034 0%, #ff9800 100%);
    border: none;
    border-radius: 25px;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: all 0.3s ease;
}

.register-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(252, 176, 52, 0.3);
}

.register-btn:active {
    transform: translateY(0);
}

.divider {
    text-align: center;
    margin: 20px 0;
    position: relative;
}

.divider::before,
.divider::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background: #eee;
}

.divider::before {
    left: 0;
}

.divider::after {
    right: 0;
}

.divider span {
    background: white;
    padding: 0 10px;
    color: #666;
    font-size: 0.9rem;
}

.login-link {
    text-align: center;
    margin-top: 20px;
    color: #666;
}

.login-link a {
    color: #fcb034;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
}

.login-link a:hover {
    color: #ff9800;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

/* Responsive Design */
@media (max-width: 580px) {
    .register-box {
        border-radius: 15px;
    }
    
    .form-header {
        padding: 20px;
    }
    
    .form-header h2 {
        font-size: 1.75rem;
    }
    
    .form-body {
        padding: 30px;
    }
    
    .form-control {
        padding: 12px 12px 12px 40px;
    }
    
    .register-btn {
        padding: 12px;
    }
}
</style>