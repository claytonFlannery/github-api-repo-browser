const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const  helmet = require("helmet")

//informs the user which port the server is using upon start
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

app.use(helmet())