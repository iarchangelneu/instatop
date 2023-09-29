import axios from "axios";
export default {
  data() {
    return {
      isAuth: false,
      accountUrl: "",
      pathUrl: 'https://studynow.kz',
      cart: [],
    };
  },
  methods: {
    logOut() {
      const token = this.getAuthorizationCookie();
      document.cookie =
        "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      const path = `${this.pathUrl}/api/api-auth/logout/`;
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      localStorage.removeItem("accountType");

      axios
        .get(path)
        .then((response) => {
          window.location.href = "/login";
        })
        .catch((error) => console.log(error));
    },
    getCart() {
      const token = this.getAuthorizationCookie()
      const path = `${this.pathUrl}/api/buyer/all-product-basket`;
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;

      axios
          .get(path)
          .then(response => {
              this.cart = response.data
              localStorage.setItem('cartLength', this.cart.length)
          })
          .catch(error => {
              console.error(error)
          })
  },
    checkAuthorizationCookie() {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith("Authorization=")) {
          return true;
        }
      }
      return false;
    },
    getAuthorizationCookie() {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith("Authorization=")) {
          const [, value] = cookie.split("=");
          return decodeURIComponent(value);
        }
      }
      return null;
    },
    getCSRFToken() {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith("csrftoken=")) {
          const [, value] = cookie.split("=");
          return decodeURIComponent(value);
        }
      }
      return null;
    },
  },
  mounted() {
    setInterval(() => {
      if (this.checkAuthorizationCookie()) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
      const acctype = localStorage.getItem("accountType");
      if (acctype == "buyer-account") {
        this.accountUrl = "/buyer-account";
      } else if (acctype == "seller-account") {
        this.accountUrl = "/seller-account";
      } else {
        this.accountUrl = "/register";
      }
    }, 100);

    const acctype = localStorage.getItem("accountType");
      if (acctype == "buyer-account") {
        this.getCart()
      }
      else{
        return
      }
  },
};
