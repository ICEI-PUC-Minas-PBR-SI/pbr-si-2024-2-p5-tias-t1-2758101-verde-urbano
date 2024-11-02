const imageService = require("../services/imageService");

exports.capturarImagens = async (req, res) => {
  const {
    latitude,
    longitude,
    bairro,
    zoom = 16,
    largura = 640,
    altura = 640,
    quantidade = 5,
  } = req.body;

  if (!latitude || !longitude || !bairro) {
    return res
      .status(400)
      .send("Latitude, longitude e bairro são obrigatórios!");
  }

  try {
    await imageService.capturarImagensRegiao(
      latitude,
      longitude,
      bairro,
      zoom,
      largura,
      altura,
      quantidade
    );
    res.send(`Captura de imagens iniciada para o bairro ${bairro}.`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao capturar imagens.");
  }
};
