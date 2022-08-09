export default {
  data() {
    return {
      isOnPhone: false,
      isOnTablet: false,
      isOnDesktop: false
    };
  },
  mounted() {
    this.checkWidth(window.innerWidth);
    window.addEventListener('resize', this.onResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize(event) {
      this.checkWidth(event.target.innerWidth);
    },
    checkWidth(width) {
      if (width > 1279) {
        this.isOnTablet = false;
        this.isOnPhone = false;
        this.isOnDesktop = true;
      }
      else if (width > 500) {
        this.isOnTablet = true;
        this.isOnPhone = false;
        this.isOnDesktop = false;
      } else {
        this.isOnTablet = false;
        this.isOnPhone = true;
        this.isOnDesktop = false;
      }
    }
  }
};