import { createApp } from './app.js';
const { app } = createApp();
import FastClick from 'fastclick';
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body);
  }, false);
}
app.$mount('#app');