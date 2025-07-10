
// Backend Express para Te Lo Traigo Autos - Dolarsi con Axios

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/api/dolar-oficial", async (req, res) => {
  try {
const https = require("https");

const agent = new https.Agent({ rejectUnauthorized: false });
const response = await axios.get("https://www.dolarsi.com/api/api.php?type=valoresprincipales", { httpsAgent: agent });
const data = Array.isArray(response.data) ? response.data : [];
const dolarOficial = data.find((d) => d.casa?.nombre === "Dolar Oficial");

    const venta = parseFloat(dolarOficial.casa.venta.replace(",", "."));
    res.json({ venta });
  } catch (error) {
    console.error("Error al obtener la cotización:", error);
    res.status(500).json({ error: "No se pudo obtener la cotización" });
  }
});

app.get("/", (req, res) => {
  res.send("API de Te Lo Traigo Autos funcionando");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
