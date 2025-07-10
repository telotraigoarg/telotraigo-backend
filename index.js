
// Backend Express para Te Lo Traigo Autos - Cotización dólar oficial desde Dolarsi

const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/api/dolar-oficial", async (req, res) => {
  try {
    const response = await fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales");
    const data = await response.json();
    const dolarOficial = data.find((d) => d.casa.nombre === "Dolar Oficial");
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
