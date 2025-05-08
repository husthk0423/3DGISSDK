// 引入依赖模块
const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const cors = require('cors'); // 引入 cors 中间件
// 初始化 Express 应用
const app = express();
// 启用 CORS 解决跨域问题
app.use(cors());
// 静态文件托管（将 public 文件夹作为静态资源）
app.use(express.static(path.join(__dirname, 'public//dev_center')));

// 定义一个路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public//dev_center', 'index.html'));
});

// 启动 HTTP 服务器
const server = app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});

// // 初始化 WebSocket 服务器
// const wss = new WebSocket.Server({ server });

// wss.on('connection', (ws) => {
//     console.log('WebSocket connection established');

//     // 接收消息
//     ws.on('message', (message) => {
//         console.log(`Received: ${message}`);
//         // 广播消息
//         wss.clients.forEach(client => {
//             if (client.readyState === WebSocket.OPEN) {
//                 client.send(`Server received: ${message}`);
//             }
//         });
//     });

//     // 断开连接
//     ws.on('close', () => {
//         console.log('WebSocket connection closed');
//     });
// });
