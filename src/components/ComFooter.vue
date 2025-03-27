<template>
    <footer>
      <div class="footer-container">
        <div class="footer-column">
          <h3>Liên lạc với chúng tôi qua email</h3>
          <p><a href="mailto:huynhquocy05@gmail.com">huynhquocy05@gmail.com</a></p>
        </div>
        <div class="footer-column">

          <ul>

          </ul>
        </div>
        <div class="footer-column">
          <h3>Liên hệ</h3>
          <p>Địa chỉ: 371 Nguyễn Kiệm, TP.HCM</p>
          <p>Điện thoại: <a href="tel:0123456789">0123-456-789</a></p>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "AppFooter" 
  };
  </script>
  
  <style scoped>
  footer {
    background-color: #d2cece;
    color: #393737;
    padding: 30px;
    margin-top: 40px;
    font-family: Arial, sans-serif;
  }
  
  .footer-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .footer-column {
    flex: 1;
    padding: 15px;
    min-width: 200px;
    box-sizing: border-box;
  }
  
  .footer-column h3 {
    margin-top: 0;
    color: #333;
  }
  
  .footer-column p {
    font-size: 14px;
  }
  
  .footer-column a {
    color: #fcb034;
    text-decoration: none;
  }
  
  .footer-column a:hover {
    text-decoration: underline;
  }
  
  .footer-column ul {
    list-style-type: none;
    padding: 0;
  }
  
  .footer-column ul li {
    margin-bottom: 8px;
  }
  
  .footer-column ul li a {
    font-size: 14px;
  }
  
  @media (max-width: 768px) {
    .footer-container {
      flex-direction: column;
      align-items: center;
    }
    .footer-column {
      min-width: auto;
      margin-bottom: 20px;
    }
  }
  </style>
  