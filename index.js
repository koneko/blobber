const express = require("express")
const app = express()
const port = 3000;
app.use(express.static("public"))


app.listen(3000, () => console.log(`app listening on port ${port}`))