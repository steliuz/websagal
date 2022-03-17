import Vue from "vue";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    closeOnClick: true,
    timeout: 2500,
    draggable: true,
    draggablePercent: 0.48,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false
};


Vue.use(Toast, options);