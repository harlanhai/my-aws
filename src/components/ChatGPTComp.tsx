import React, { useState, useRef, useEffect } from 'react';
import { 
  TextField, 
  Paper, 
  Typography, 
  CircularProgress, 
  ThemeProvider, 
  Box, 
  IconButton, 
  Avatar,
  Container
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { CssBaseline } from '@mui/material';
import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from '@/client';
import { darkTheme } from '@/utils/muiTheme';

// 定义消息类型
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// GraphQL 响应接口
interface SendMessageResponse {
  sendMessage: {
    result: string;
    requestId: string;
    timestamp: string;
    error: string | null;
  }
}

// 自定义滚动条样式
const scrollbarStyles = {
  scrollContainer: {
    position: 'relative',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingRight: '4px', // 为滚动条留出空间
    scrollbarWidth: 'thin' as 'thin', // Firefox
    scrollbarColor: '#374151 #111827', // Firefox
  },
};

const ChatGPTComponent: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // 使用 Apollo Client 的 useMutation hook
  const [sendMessage, { loading: isLoading }] = useMutation<SendMessageResponse>(
    SEND_MESSAGE,
    {
      onError: (error) => {
        console.error('GraphQL 错误:', error);
        // 创建错误消息
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `发生错误: ${error.message}`,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prevMessages => [...prevMessages, errorMessage]);
      }
    }
  );

  // 当消息列表更新时，滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // 创建用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    // 更新消息列表，添加用户消息
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput(''); // 清空输入框

    try {
      // 发送 GraphQL 变更请求
      const { data } = await sendMessage({
        variables: {
          input: userMessage.text
        }
      });
      
      if (data) {
        // 如果有错误，显示错误消息
        if (data.sendMessage.error) {
          const errorMessage: Message = {
            id: data.sendMessage.requestId,
            text: `错误: ${data.sendMessage.error}`,
            sender: 'bot',
            timestamp: new Date(data.sendMessage.timestamp),
          };
          setMessages(prevMessages => [...prevMessages, errorMessage]);
          return;
        }

        // 创建机器人回复消息
        const botMessage: Message = {
          id: data.sendMessage.requestId,
          text: data.sendMessage.result,
          sender: 'bot',
          timestamp: new Date(data.sendMessage.timestamp),
        };

        // 更新消息列表，添加机器人回复
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }
    } catch (error) {
      console.error('发送消息错误:', error);
      
      // 如果 Apollo 错误处理没有捕获，创建错误消息
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `发生未知错误，请稍后再试。`,
        sender: 'bot',
        timestamp: new Date(),
      };

      // 更新消息列表，添加错误消息
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 格式化消息时间戳
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="flex flex-col h-screen bg-gray-900 overflow-hidden">
        {/* 标题栏 */}
        <div className="bg-gray-800 py-4 px-6 shadow-md">
          <Typography variant="h5" className="text-center font-semibold text-green-500">
            Harlan's GPT
          </Typography>
        </div>

        {/* 消息区域 */}
        <div className="w-full flex-grow px-0 mx-auto overflow-y-scroll">
          <div 
            className="flex-grow p-4 pb-4 space-y-4 h-fit"
            // style={scrollbarStyles.scrollContainer}
          >
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Typography variant="body1" className="mb-2">
                  开始一个新的对话
                </Typography>
                <Typography variant="body2">
                  发送消息开始聊天
                </Typography>
              </div>
            ) : (
              <div className="space-y-4 p-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div className="flex items-start max-w-3xl">
                      {message.sender === 'bot' && (
                        <Avatar className="mt-1 mr-2 bg-green-600">AI</Avatar>
                      )}
                      <Paper
                        elevation={1}
                        className={`p-3 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-green-700 text-white'
                            : 'bg-gray-700 text-gray-100'
                        }`}
                      >
                        <Typography variant="body1" className="whitespace-pre-wrap">
                          {message.text}
                        </Typography>
                        <Typography
                          variant="caption"
                          className="block mt-1 text-xs opacity-70"
                        >
                          {formatTime(message.timestamp)}
                        </Typography>
                      </Paper>
                      {message.sender === 'user' && (
                        <Avatar className="mt-1 ml-2 bg-blue-600">我</Avatar>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <Paper elevation={1} className="p-4 bg-gray-700 text-white rounded-2xl">
                      <Box display="flex" alignItems="center">
                        <CircularProgress size={20} className="mr-2" />
                        <Typography variant="body2">思考中...</Typography>
                      </Box>
                    </Paper>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* 输入区域 */}
        <div className="p-4 border-t border-gray-700 flex justify-center">
          <div className="w-4/5">
            <Box
              component="form"
              className="flex items-center space-x-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="输入消息..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                multiline
                maxRows={3}
                disabled={isLoading}
                className="bg-gray-700 rounded-xl"
              />
              <IconButton
                color="primary"
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="h-12 w-12 bg-green-600 hover:bg-green-700 text-white"
                aria-label="发送"
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <SendIcon />
                )}
              </IconButton>
            </Box>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ChatGPTComponent;