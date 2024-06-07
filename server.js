const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const userInfoRoutes = require('./routes/userInfoRoutes');
app.use('/userInfo', userInfoRoutes);

const restInfoRoutes = require('./routes/restInfoRoutes');
app.use('/restInfo', restInfoRoutes);

const reviewRoutes = require('./routes/reviewRoutes');
app.use('/review',reviewRoutes);

const favRestRoutes = require('./routes/favRestRoutes');
app.use('/favRest',favRestRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});