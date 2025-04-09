const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const path = require('path');
const Product = require('./models/Product');
const Comment = require('./models/Comment');

const corsOptions = {
  origin: 'http://localhost:4200', // 允许的前端地址
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的 HTTP 方法
  credentials: true, // 如果需要发送 Cookie 或认证信息
};

const app = express();
const PORT = 3000;

// 中间件
app.use(express.json());
app.use(cors(corsOptions));

// 全局保护所有以 /api 开头的路由（排除 /api/login）
app.use('/api', (req, res, next) => {
  if (req.path === '/login') return next(); // 跳过 /api/login
  authenticateToken(req, res, next);
});


const users = [
  { username: 'admin', password: 'password', userId: 1 },
  { username: 'user', password: '123456', userId: 2 },
];

// 提供静态文件服务
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// 路由
app.get('/', (req, res) => {
  res.send('Welcome to the API. Use /api/products to get product data.');
});

// 获取所有产品
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find(); // 从数据库中获取所有产品
    res.json(products);
    res.json({ message: 'Authorized access', user: req.user });
    console.log('Products:', products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 根据 ID 获取单个产品
app.get('/api/products/:id', async (req, res) => {

if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
}
  try {
    const product = await Product.findById(req.params.id); // 根据 ID 获取产品
    if (product) {
      res.json(product);
      res.json({ message: 'Authorized access', user: req.user });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 获取特定产品的评论
app.get('/api/products/:id/comments', async (req, res) => {
  try {
    const productId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    const comments = await Comment.find({ productId });
    res.json(comments);
    res.json({ message: 'Authorized access', user: req.user});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 添加评论到特定产品
app.post('/api/products/:id/comments', async (req, res) => {
  try {
    const productId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    if (!req.body.author || !req.body.text) {
      return res.status(400).json({ message: 'Author and text are required' });
    }
    const comment = new Comment({
      productId,
      author: req.body.author,
      text: req.body.text,
      timestamp: req.body.timestamp || new Date(),
    });
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 删除特定产品下的某条评论
app.delete('/api/products/:productId/comments/:commentId', async (req, res) => {
  try {
    const { productId, commentId } = req.params;

    // 验证 productId 和 commentId 是否有效
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: 'Invalid comment ID' });
    }

    // 查找并删除评论
    const deletedComment = await Comment.findOneAndDelete({
      _id: commentId,
      productId: productId, // 确保评论属于指定的产品
    });

    if (deletedComment) {
      res.json({ message: 'Comment deleted successfully', comment: deletedComment });
    } else {
      res.status(404).json({ message: 'Comment not found for the specified product' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete comment', error: err.message });
  }
});

// 用于验证用户身份并返回 JWT
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ userId: user.userId, username: user.username }, 'your-secret-key', {
      expiresIn: '30m', // 令牌有效期
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// 连接到 MongoDB 数据库
mongoose.connect('mongodb://localhost:27017/productsDB');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// 中间件验证 JWT
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // 从 Authorization 头中提取令牌
  console.log('Token:', token);
  console.log('Headers:', req.headers);
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user; // 将解码后的用户信息存储到 req 对象中
    next();
  });
}


  // 清空 comments 集合
const clearComments = async () => {
  try {
    await Comment.deleteMany({});
    console.log('All comments have been deleted.');
  } catch (err) {
    console.error('Error clearing comments:', err);
  }
};

// 清空 products 集合
const clearProducts = async () => {
  try {
    await Product.deleteMany({});
    console.log('All products have been deleted.');
  } catch (err) {
    console.error('Error clearing products:', err);
  }
};

// 种子数据函数
const seedProducts = async () => {
  const products = [
    { name: 'product 1', price: 100, imageUrl: '/assets/bernard-hermant-CLKGGwIBTaY-unsplash.jpg', description: 'This is the first product.' },
    { name: 'product 2', price: 200, imageUrl: '/assets/brandon-griggs-wR11KBaB86U-unsplash.jpg', description: 'This is the second product.' },
    { name: 'product 3', price: 300, imageUrl: '/assets/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg', description: 'This is the third product.' },
    { name: 'product 4', price: 400, imageUrl: '/assets/ian-macdonald-W8z6aiwfi1E-unsplash.jpg', description: 'This is the fourth product.' },
    { name: 'product 5', price: 500, imageUrl: '/assets/krzysztof-hepner-978RAXoXnH4-unsplash.jpg', description: 'This is the fifth product.' },
    { name: 'product 6', price: 600, imageUrl: '/assets/phil-hearing-IYfp2Ixe9nM-unsplash.jpg', description: 'This is the sixth product.' },
    { name: 'product 7', price: 700, imageUrl: '/assets/r-architecture-GGupkreKwxA-unsplash.jpg', description: 'This is the seventh product.' },
    { name: 'product 8', price: 500, imageUrl: '/assets/r-architecture-JvQ0Q5IkeMM-unsplash.jpg', description: 'This is the eighth product.' },
    { name: 'product 9', price: 800, imageUrl: '/assets/saru-robert-9rP3mxf8qWI-unsplash.jpg', description: 'This is the nineth product.' },
    { name: 'product 10', price: 1000, imageUrl: '/assets/webaliser-_TPTXZd9mOo-unsplash.jpg', description: 'This is the tenth product.' },
  ];

  await Product.insertMany(products);
  console.log('Products seeded');
};


// 种子评论数据
const seedComments = async () => {
  const products = await Product.find(); // 获取所有产品
  const comments = [
    { author: 'John Doe', text: 'Great product! Highly recommend it.' },
    { author: 'Jane Smith', text: 'Good quality, but a bit expensive.' },
    { author: 'Alice Johnson', text: 'Fast delivery and excellent customer service.' },
  ];

  for (const product of products) {
    for (const comment of comments) {
      if (!mongoose.Types.ObjectId.isValid(product.id)) {
        console.error('Invalid product ID:', product.id);
        continue;
      }

      await Comment.create({
        productId: product.id,
        author: comment.author,
        text: comment.text,
      });
    }
  }

  console.log('Comments seeded');
};

//clearProducts();
//seedProducts();
clearComments()
seedComments();
