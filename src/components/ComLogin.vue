<template>
  <div class="login-container">
    <div class="login-box">
      <div class="form-header">
        <i class="fas fa-user-circle user-icon"></i>
        <h2>Đăng nhập</h2>
        <p class="welcome-text">Chào mừng bạn quay trở lại!</p>
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
            <i class="fas fa-lock input-icon"></i>
            <input 
              v-model="password" 
              type="password" 
              placeholder="Mật khẩu"
              class="form-control" 
            />
          </div>
        </div>

        <p v-if="error" class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          {{error}}
        </p>

        <button @click="login" class="login-btn">
          <span>Đăng nhập</span>
          <i class="fas fa-arrow-right"></i>
        </button>

        <div class="divider">
          <span>hoặc</span>
        </div>

        <p class="register-link">
          Chưa có tài khoản? 
          <router-link to="/register">Đăng ký ngay</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import users from '@/data/users'
import eventBus from '@/eventBus'

export default {
    data() {
        return {
            username: '',
            password: '',
            error: '',
            loginAttempts: 0,
            isLocked: false,
            lockoutEndTime: null
        }
    },
    created() {
        // Kiểm tra trạng thái khóa từ localStorage
        const lockData = localStorage.getItem('loginLock')
        if (lockData) {
            const { isLocked, endTime } = JSON.parse(lockData)
            if (isLocked && new Date(endTime) > new Date()) {
                this.isLocked = true
                this.lockoutEndTime = new Date(endTime)
                this.startLockoutTimer()
            } else {
                localStorage.removeItem('loginLock')
            }
        }
    },
    methods: {
        startLockoutTimer() {
            const interval = setInterval(() => {
                if (new Date() >= this.lockoutEndTime) {
                    this.isLocked = false
                    this.loginAttempts = 0
                    localStorage.removeItem('loginLock')
                    clearInterval(interval)
                    this.error = ''
                }
            }, 1000)
        },
        login() {
            // Kiểm tra khóa đăng nhập
            if (this.isLocked) {
                const remainingTime = Math.ceil((this.lockoutEndTime - new Date()) / 1000)
                this.error = `Tài khoản đã bị khóa. Vui lòng thử lại sau ${remainingTime} giây`
                return
            }

            // Kiểm tra trống
            if (!this.username || !this.password) {
                this.error = 'Vui lòng điền đầy đủ thông tin!'
                return
            }

            // Tìm user trong localStorage hoặc mảng mặc định
            const storedUsers = JSON.parse(localStorage.getItem('users')) || users
            const user = storedUsers.find(u => u.username === this.username)

            // Kiểm tra tài khoản và mật khẩu
            if (!user || user.password !== this.password) {
                this.loginAttempts++
                this.error = 'Tên đăng nhập hoặc mật khẩu không chính xác!'

                // Khóa tài khoản sau 3 lần thất bại
                if (this.loginAttempts >= 3) {
                    this.isLocked = true
                    this.lockoutEndTime = new Date(Date.now() + 30 * 1000) // Khóa 30 giây
                    localStorage.setItem('loginLock', JSON.stringify({
                        isLocked: true,
                        endTime: this.lockoutEndTime
                    }))
                    this.error = 'Tài khoản đã bị khóa 30 giây do đăng nhập sai nhiều lần!'
                    this.startLockoutTimer()
                }
                return
            }

            // Đăng nhập thành công
            const userInfo = {
                id: user.id,
                username: user.username,
                email: user.email
            }

            // Lưu thông tin đăng nhập và emit event
            localStorage.setItem('currentUser', JSON.stringify(userInfo))
            eventBus.emit('loginSuccess', userInfo)

            // Reset các biến đếm
            this.loginAttempts = 0
            localStorage.removeItem('loginLock')

            // Thông báo và chuyển hướng
            alert('Đăng nhập thành công!')
            this.$router.push('/')
        }
    }
}
</script>
<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.login-box {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: slideUp 0.5s ease;
}

.form-header {
  text-align: center;
  padding: 30px 20px;
  background: linear-gradient(135deg, #fcb034 0%, #ff9800 100%);
  color: white;
}

.user-icon {
  font-size: 4rem;
  margin-bottom: 10px;
}

.welcome-text {
  margin-top: 10px;
  opacity: 0.9;
}

.form-body {
  padding: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 15px;
  color: #666;
}

.form-control {
  width: 100%;
  padding: 15px 15px 15px 45px;
  border: 2px solid #eee;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #fcb034;
  box-shadow: 0 0 0 3px rgba(252, 176, 52, 0.2);
  outline: none;
}

.error-message {
  color: #dc3545;
  font-size: 0.9rem;
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 5px;
  animation: shake 0.5s ease;
}

.login-btn {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #fcb034 0%, #ff9800 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(252, 176, 52, 0.3);
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

.register-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

.register-link a {
  color: #fcb034;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.register-link a:hover {
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

@media (max-width: 480px) {
  .login-box {
    border-radius: 15px;
  }
  
  .form-header {
    padding: 20px;
  }
  
  .form-body {
    padding: 20px;
  }
  
  .form-control {
    padding: 12px 12px 12px 40px;
  }
}
</style>