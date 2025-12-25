const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')
const userRoutes = require('../src/routes/user.auth.routes');
const adminRoutes = require('../src/routes/admin.auth.routes');
const courseRoutes = require('../src/routes/course.routes')
const purchaseRoutes = require('../src/routes/purchase.routes')

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",userRoutes);
app.use("/api/auth",adminRoutes);
app.use("/api/course",courseRoutes);
app.use("/api/purchase",purchaseRoutes);

module.exports = app;