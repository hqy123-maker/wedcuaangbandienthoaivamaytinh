<template>
  <div class="contact-container">
    <h2>Liên hệ</h2>
    <p>Hãy liên hệ với chúng tôi qua những thông tin bên dưới:</p>
    <div class="contact-info">
      <p><strong>Email:</strong> huynhquocy05@gmail.com</p>
      <p><strong>Số điện thoại:</strong> 0123-456-789</p>
      <p><strong>Địa chỉ:</strong> 371 Nguyễn Kiệm, TP.HCM</p>
    </div>
    <form @submit.prevent="handleSubmit" class="contact-form">
      <h3>Hoặc gửi tin nhắn cho chúng tôi:</h3>
      <div>
        <label for="name">Tên của bạn:</label>
        <input type="text" id="name" v-model="formData.name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" required />
      </div>
      <div>
        <label for="message">Tin nhắn:</label>
        <textarea id="message" v-model="formData.message" required></textarea>
      </div>
      <button type="submit">Gửi</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ComLienHe",
  data() {
    return {
      formData: {
        name: "",
        email: "",
        message: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log("Thông tin liên hệ:", this.formData);
      alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm.");
      this.formData = { name: "", email: "", message: "" }; // Reset form
    },
  },
};
</script>

<style scoped>
.contact-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.contact-info {
  margin-bottom: 20px;
}

.contact-info p {
  margin: 5px 0;
}

.contact-form h3 {
  margin-bottom: 10px;
}

.contact-form div {
  margin-bottom: 15px;
}

.contact-form label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.contact-form button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.contact-form button:hover {
  background-color: #0056b3;
}
</style>
