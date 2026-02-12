module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/vue3-recommended',
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    "semi": [1, "always"],
    'vue/multi-word-component-names': ['error', {
      'ignores': [
        'Menu',
        'Result',
        'Info',
        'Response',
        'Post',
        'Modal',
        'Intro',
        'Help',
        'Features',
        'Expense',
        'Refund',
        'Balanced',
        'Refunds',
        'Loader',
        'Categories',
        'Button',
        'Contact',
        'Login',
        'Signup',
        'Story',
        'Poll',
        'Email'
      ]
    }]
  }
};