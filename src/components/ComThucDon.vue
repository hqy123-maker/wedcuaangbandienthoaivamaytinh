<template>
  <div class="page-container">
    <h1 class="page-title">Sản phẩm của chúng tôi</h1>

    <div class="filters">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Tìm kiếm sản phẩm..."
        class="search-input"
      />
      <select v-model="selectedCategory" class="category-select">
        <option value="">Tất cả danh mục</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>

    <!-- Danh sách sản phẩm -->
    <div class="products-grid">
      <Product v-for="item in paginatedProducts" :key="item.id" :product="item" />
    </div>
    
    <!-- Điều khiển phân trang -->
    <div class="pagination-controls">
      <button @click="prevPage" :disabled="currentPage === 1">Trang trước</button>
      <span>Trang {{ currentPage }} của {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Trang sau</button>
    </div>
  </div>
</template>

<script>
import Product from './ComProduct.vue'
import items from '@/data/items'

export default {
  name: 'ComHome',
  components: {
    Product
  },
  data() {
    return {
      products: items, 
      searchQuery: "", 
      selectedCategory: "", 
      currentPage: 1,  
      itemsPerPage: 6   
    };
  },
  computed: {
  
    categories() {
      return [...new Set(this.products.map(product => product.category))];
    },
    // Lọc sản phẩm theo tìm kiếm và danh mục
    filteredProducts() {
      return this.products.filter(product => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        const matchesCategory =
          !this.selectedCategory || product.category === this.selectedCategory;
        return matchesSearch && matchesCategory;
      });
    },

    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
    // Sản phẩm hiển thị trên trang hiện tại
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    }
  },
  methods: {
    // Đi tới trang tiếp theo
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    // Đi tới trang trước
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  },
  watch: {

    searchQuery() {
      this.currentPage = 1;
    },
    selectedCategory() {
      this.currentPage = 1;
    }
  }
};
</script>

<style scoped>
/* Tổng thể trang */
.page-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Tiêu đề */
.page-title {
  text-align: center;
  color: #4a4a4a;
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Thanh tìm kiếm và phân loại */
.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
}

.search-input {
  width: 70%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
}

.category-select {
  width: 28%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.category-select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
}

/* Lưới sản phẩm */
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
}

.products-grid > * {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.products-grid > *:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Điều khiển phân trang */
.pagination-controls {
  text-align: center;
  margin-top: 20px;
}

.pagination-controls button {
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s ease;
}

.pagination-controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  box-shadow: none;
}

.pagination-controls button:hover:not(:disabled) {
  background-color: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Responsive - Màn hình vừa */
@media (max-width: 968px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .search-input {
    width: 65%;
  }

  .category-select {
    width: 32%;
  }
}

/* Responsive - Màn hình nhỏ */
@media (max-width: 576px) {
  .products-grid {
    grid-template-columns: 1fr;
  }

  .filters {
    flex-direction: column;
    gap: 15px;
  }

  .search-input,
  .category-select {
    width: 100%;
  }
}

</style>
