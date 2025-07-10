// Backend Express para Te Lo Traigo Autos - Cotización con DolarAPI

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/api/dolar-oficial", async (req, res) => {
  try {
    const response = await axios.get("https://dolarapi.com/v1/dolares/oficial");
    const data = response.data;

    if (!data || !data.venta) {
      return res.status(500).json({ error: "No se encontró la cotización oficial" });
    }

    const venta = parseFloat(data.venta);
    res.json({ venta });
  } catch (error) {
    console.error("Error al obtener la cotización:", error.message);
    res.status(500).json({ error: "No se pudo obtener la cotización oficial" });
  }
});

app.get("/", (req, res) => {
  res.send("API de Te Lo Traigo Autos funcionando");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
