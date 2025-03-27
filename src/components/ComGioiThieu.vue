    <template>
      <div class="main-content">
        <div class="intro-section">
          <h1>Cửa Hàng Điện Thoại Uy Tín </h1>
          <div class="content-box">
            <div class="intro-grid">
              <div class="intro-text">
                <h2>Về Chúng Tôi</h2>
                <p>
  Cửa hàng chúng tôi tự hào là điểm đến mua sắm đáng tin cậy, nơi cung cấp những sản phẩm điện thoại mới nhất từ các thương hiệu nổi tiếng.
  Với hơn 10 năm kinh nghiệm trong ngành bán lẻ, chúng tôi cam kết mang đến cho khách hàng những sản phẩm chất lượng và dịch vụ tuyệt vời.
</p>
<p>
  Đội ngũ nhân viên của chúng tôi luôn sẵn sàng tư vấn và hỗ trợ khách hàng, giúp bạn tìm ra sản phẩm phù hợp nhất với nhu cầu.
</p>

<div class="highlight-item">
  <i class="fas fa-mobile-alt"></i>
  <h3>100+ Sản Phẩm</h3>
  <p>Đa dạng mẫu điện thoại mới nhất từ các thương hiệu lớn</p>
</div>
<div class="highlight-item">
  <i class="fas fa-thumbs-up"></i>
  <h3>Chất Lượng</h3>
  <p>Đảm bảo sản phẩm chính hãng, bảo hành đầy đủ</p>
</div>
<div class="highlight-item">
  <i class="fas fa-headset"></i>
  <h3>Hỗ Trợ Tận Tâm</h3>
  <p>Đội ngũ nhân viên chuyên nghiệp, tư vấn nhiệt tình</p>
</div>

                <router-link to="/thucdon" class="menu-btn" @click="scrollToTop">
                  <span>Xem Sản Phẩm</span>
                  <i class="fas fa-utensils"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <script>
    export default {
      name: 'ComGioiThieu',
      methods: {
        scrollToTop() {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        }
      }
    }
    </script>

    <style scoped>
    .main-content {
      padding: 40px 20px;
      max-width: 1200px;
      margin: 0 auto;
      background-color: #F1F6EE;
    }

    .intro-section {
      text-align: center;
    }

    .intro-section h1 {
      font-size: 2.8rem;
      color: #333;
      margin-bottom: 30px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .intro-section h2 {
      font-size: 2rem;
      color: #fcb034;
      margin-bottom: 20px;
      font-weight: 600;
    }

    .content-box {
      background: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      margin: 0 auto;
      max-width: 800px;
    }

    .intro-text p {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #666;
      margin-bottom: 25px;
      text-align: justify;
    }

    .highlights {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      margin: 40px 0;
      padding: 20px 0;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
    }

    .highlight-item {
      text-align: center;
      padding: 20px;
      transition: transform 0.3s ease;
    }

    .highlight-item:hover {
      transform: translateY(-5px);
    }

    .highlight-item i {
      font-size: 2.5rem;
      color: #fcb034;
      margin-bottom: 15px;
    }

    .highlight-item h3 {
      font-size: 1.2rem;
      color: #333;
      margin-bottom: 10px;
      font-weight: 600;
    }

    .highlight-item p {
      font-size: 0.9rem;
      color: #666;
      margin: 0;
      text-align: center;
    }

    .menu-btn {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      padding: 15px 30px;
      background: linear-gradient(135deg, #fcb034 0%, #ff9800 100%);
      color: white;
      text-decoration: none;
      border-radius: 50px;
      font-size: 1.1rem;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(252, 176, 52, 0.3);
      margin-top: 30px;
    }

    .menu-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(252, 176, 52, 0.4);
      background: linear-gradient(135deg, #ff9800 0%, #fcb034 100%);
    }

    .menu-btn span {
      transition: transform 0.3s ease;
    }

    .menu-btn:hover span {
      transform: translateX(-3px);
    }

    .menu-btn i {
      font-size: 1.2rem;
      transition: transform 0.3s ease;
    }

    .menu-btn:hover i {
      transform: translateX(3px);
    }

    @media (max-width: 768px) {
      .intro-section h1 {
        font-size: 2.2rem;
      }

      .intro-section h2 {
        font-size: 1.8rem;
      }

      .content-box {
        padding: 20px;
      }

      .highlights {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .highlight-item {
        padding: 15px;
      }

      .menu-btn {
        width: 100%;
        justify-content: center;
      }

      .intro-text p {
        font-size: 1rem;
      }
    }
    </style>