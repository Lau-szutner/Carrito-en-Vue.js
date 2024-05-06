const app = Vue.createApp({
  data() {
    return {
      productos: [],
      totalCarrito: [],
      totalDinero1: 0,
      verCosas: false,
    };
  },
  created() {
    this.getJSON();
  },
  computed: {
    totalItems() {
      return this.totalCarrito.length;
    },
    totalDinero() {
      return this.totalDinero1;
    },
  },
  methods: {
    getJSON() {
      fetch("data/data.json")
        .then((response) => response.json())
        .then((jsonData) => {
          this.productos = jsonData.productos;
        });
    },
    agregarCarrito(index) {
      this.totalCarrito.push(this.productos[index]);
      this.totalDinero1 += this.productos[index].precio;
    },
    verProductos() {
      if (this.totalItems === 0) {
        this.verCosas = false;
      } else {
        this.verCosas = !this.verCosas;
      }
    },
    cerrar() {
      if (this.totalItems === 0) {
        this.verCosas = false;
      }
    },
    eliminar(key) {
      const index = this.totalCarrito.findIndex(
        (producto) => producto.key === key
      );

      this.totalDinero1 -= this.totalCarrito[index].precio;
      this.totalCarrito.splice(index, 1);
      this.cerrar();
    },
  },
});

app.mount("#app");
