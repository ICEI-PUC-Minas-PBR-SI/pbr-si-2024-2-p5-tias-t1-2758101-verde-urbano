const imageService = require("../services/imageService"); // Serviço responsável por capturar as imagens

// Função para capturar imagens de uma região com base em latitude, longitude e bairro
exports.capturarImagens = async (req, res) => {
  // Desestruturando os parâmetros recebidos no corpo da requisição
  const {
    latitude,
    longitude,
    bairro,
    zoom = 16,       // Nível de zoom (opcional, padrão 16)
    largura = 640,   // Largura das imagens (opcional, padrão 640px)
    altura = 640,    // Altura das imagens (opcional, padrão 640px)
    quantidade = 5,  // Quantidade de imagens a serem capturadas (opcional, padrão 5)
  } = req.body;

  // Verifica se os campos obrigatórios (latitude, longitude, bairro) foram enviados na requisição
  if (!latitude || !longitude || !bairro) {
    return res
      .status(400) // Retorna um erro 400 (Bad Request) se algum dos campos obrigatórios estiver faltando
      .send("Latitude, longitude e bairro são obrigatórios!");
  }

  try {
    // Chama o serviço de captura de imagens, passando os parâmetros necessários
    await imageService.capturarImagensRegiao(
      latitude,
      longitude,
      bairro,
      zoom,
      largura,
      altura,
      quantidade
    );

    // Envia uma resposta de sucesso informando que a captura foi iniciada para o bairro
    res.send(`Captura de imagens iniciada para o bairro ${bairro}.`);
  } catch (error) {
    // Caso ocorra um erro durante a captura das imagens, ele é registrado no console
    console.error(error);

    // Retorna uma resposta de erro com status 500 (Internal Server Error)
    res.status(500).send("Erro ao capturar imagens.");
  }
};
