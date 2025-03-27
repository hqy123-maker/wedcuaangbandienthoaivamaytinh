<template>
  <div class="home">
    <div class="slider-container">
      <div class="slider" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div v-for="(slide, index) in slides" :key="index" class="slide">
          <img :src="slide.url" :alt="slide.alt" class="slide-image">
          <div class="slide-content">
            <h2>{{ slide.title }}</h2>
            <p>{{ slide.description }}</p>
          </div>
        </div>
      </div>
      
      <div class="slider-dots">
        <span 
          v-for="(_, index) in slides" 
          :key="index"
          :class="['dot', { active: currentIndex === index }]"
          @click="goToSlide(index)"
        ></span>
      </div>

      <button class="slider-btn prev" @click="prevSlide">&#10094;</button>
      <button class="slider-btn next" @click="nextSlide">&#10095;</button>
    </div>

    
    <div class="main-content">
      <div class="intro-section">

        <h1>Cửa Hàng Điện Thoại Uy Tín</h1>
<div class="content-box">
  <p>
    Chúng tôi cung cấp các sản phẩm điện thoại chính hãng từ các thương hiệu hàng đầu như Apple, Samsung, Xiaomi, Oppo, và nhiều hơn nữa.
  </p>
  <p>
    Hãy trải nghiệm các dòng sản phẩm mới nhất với giá cả cạnh tranh và dịch vụ khách hàng tuyệt vời.
  </p>
  <p>
    Đến ngay cửa hàng của chúng tôi hoặc đặt hàng trực tuyến để tận hưởng các chương trình ưu đãi hấp dẫn!
  </p>
  <router-link to="/gioithieu" class="menu-btn">Xem Thêm</router-link>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      slides: [
  {
    url: '/Images/banner-iphone.jpg',
    alt: 'iPhone 15 Pro Max',
    title: 'iPhone 15 Pro Max',
    description: 'Công nghệ hàng đầu từ Apple'
  },
  {
    url: '/Images/banner-samsung.jpg',
    alt: 'Samsung Galaxy S23 Ultra',
    title: 'Samsung Galaxy S23 Ultra',
    description: 'Chinh phục mọi thử thách'
  },
  {
    url: '/Images/banner-xiaomi.jpg',
    alt: 'Xiaomi 13 Pro',
    title: 'Xiaomi 13 Pro',
    description: 'Hiệu năng mạnh mẽ, giá cực tốt'
  }
],

      timer: null
    }
  },
  mounted() {
    this.startSlideTimer()
  },
  beforeUnmount() {
    this.stopSlideTimer()
  },
  methods: {startSlideTimer() {
      this.timer = setInterval(this.nextSlide, 6000)
    },
    stopSlideTimer() {
      clearInterval(this.timer)
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length
    },
    prevSlide() {
      this.currentIndex = this.currentIndex === 0 
        ? this.slides.length - 1 
        : this.currentIndex - 1
    },
    goToSlide(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  background-color: #F1F6EE;
}

.slider-container {
  position: relative;
  width: 100%;
  height: 80vh;
  overflow: hidden;
}

.slider {
  display: flex;
  transition: transform 0.8s ease-in-out;
  height: 100%;
}

.slide {
  position: relative;
  width: 100%;
  flex-shrink: 0;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  width: 80%;
}

.slide-content h2 {
  font-size: 3.5rem;
  margin-bottom: 20px;
}

.slide-content p {
  font-size: 1.5rem;
}

.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  width: 50px;
  height: 50px;
  border: none;
  cursor: pointer;
  font-size: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.prev {
  left: 20px;
}

.next {
  right: 20px;
}

.slider-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background 0.3s ease;
}

.dot.active {
  background: white;
}

.main-content {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.intro-section {
  text-align: center;
}

.intro-section h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
}

.content-box {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  max-width: 800px;
}

.content-box p {
  color: #666;
  line-height: 1.8;
  margin-bottom: 20px;
  text-align: justify;
}

.menu-btn {
  display: inline-block;
  padding: 15px 30px;
  background: #fcb034;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.1rem;
  transition: background 0.3s ease;
  margin-top: 20px;
}

.menu-btn:hover {
  background: #e69b20;
}
</style>