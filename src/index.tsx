import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// 找到根元素
const rootElement = document.getElementById('root');

// 确保根元素存在
if (!rootElement) {
  throw new Error('Root element not found');
}

// 创建 React 根
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);