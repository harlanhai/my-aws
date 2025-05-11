import { createTheme } from "@mui/material";

// 定义暗色主题
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#10b981', // 绿色主色调
    },
    background: {
      default: '#111827', // 暗灰色背景
      paper: '#1f2937',   // 稍微亮一点的纸面背景
    },
    text: {
      primary: '#f3f4f6',
      secondary: '#d1d5db',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '0.75rem',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.75rem',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        // 更新的滚动条样式 - 与背景色匹配且放在最右侧
        '*::-webkit-scrollbar': {
          width: '8px',
          position: 'absolute', // 尝试使用绝对定位
          right: 0,
        },
        '*::-webkit-scrollbar-track': {
          background: '#111827', // 滚动条轨道颜色，与背景色完全相同
          marginRight: 0,
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#374151', // 滚动条滑块颜色，稍微亮一点以便识别
          borderRadius: '4px',
          borderRight: 0,
          marginRight: 0,
        },
        '*::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#4b5563', // 悬停时滑块颜色
        },
        // 全局样式以确保滚动容器正确定位滚动条
        '*': {
          scrollbarWidth: 'thin', // Firefox 滚动条样式
          scrollbarColor: '#374151 #111827', // Firefox 滚动条颜色 (thumb track)
        },
        // 专门为消息容器添加的样式
        '.messages-container': {
          overflowY: 'auto',
          position: 'relative', // 确保定位上下文
          paddingRight: '0.5rem', // 留出滚动条空间
          '&::-webkit-scrollbar': {
            width: '8px',
            position: 'absolute',
            right: 0,
          },
        },
      },
    },
  },
});