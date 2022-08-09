export default {
  methods: {
    validEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validName(name) {
      const re = /\D+$/;
      return re.test(name);
    },
    validBirthday(birthday) {
      const re = /\d{4}-\d{2}-\d{2}/;
      return re.test(birthday);
    },
    validPhone(phone) {
      const re = /[\d\s+]+/;
      return re.test(phone);
    },
    validPasswordMaj(password) {
      const re = /[A-Z]+/;
      return re.test(password);
    },
    validPasswordMin(password) {
      const re = /[a-z]+/;
      return re.test(password);
    },
    validPasswordDigit(password) {
      const re = /\d+/;
      return re.test(password);
    }
  },
};