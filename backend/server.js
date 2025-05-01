const express = require("express");
const cors = require("cors");
const scanRoute = require("./routes/scan");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/api", scanRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
