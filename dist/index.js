"use strict";
const express = require('express');
const app = express();
const port = 6000;
app.get('/', (req, res) => {
    res.send('Hello Money!');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
