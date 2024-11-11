const openaiService = require("../services/openaiService"); // Serviço para gerar descrições com OpenAI
const supabaseService = require("../services/supabaseService"); // Serviço para interação com o Supabase (banco de dados e bucket de imagens)
const { urlToBase64 } = require("../utils/urlToBase64"); // Função utilitária para converter URL em base64
const { createClient } = require("@supabase/supabase-js"); // Cliente para interação com o Supabase

// Função para buscar imagens do Supabase e gerar descrição para cada uma delas
exports.getImagesDescriptionFromSupabase = async (req, res) => {
  // Desestruturando parâmetros de entrada do corpo da requisição
  const { bairro, estado, pais, cidade } = req.body;

  try {
    // Verifica se o campo "bairro" foi enviado na requisição
    if (!bairro) {
      return res.status(400).json({ error: "O campo 'bairro' é obrigatório." });
    }

    // Busca as imagens armazenadas no Supabase, na pasta correspondente ao bairro fornecido
    let imagens = await supabaseService.getImagensDoBucket(bairro);

    // Caso não haja imagens para o bairro, retorna um erro 404
    if (!imagens || imagens.length === 0) {
      return res
        .status(404)
        .json({ error: "Nenhuma imagem encontrada para o bairro fornecido." });
    }

    // Converte cada imagem de URL para base64 de forma assíncrona
    imagens = await Promise.all(
      imagens.map(async (imagem) => {
        let base64 = await urlToBase64(imagem.url); // Converte a URL da imagem para base64
        return {
          base64: base64, // A imagem em formato base64
          url: imagem.url, // A URL original da imagem
          image_data: imagem.image_data, // Dados adicionais sobre a imagem
        };
      })
    );

    // Gera uma descrição para cada imagem utilizando o serviço da OpenAI
    const descricoes = await Promise.all(
      imagens.map(async (imagem) => {
        const p_base64 = imagem.base64 ?? "";  // Usa base64 vazio caso não exista
        const p_bairro = bairro ?? "";         // Usa valor vazio caso o bairro não esteja presente
        const p_estado = estado ?? "";         // Usa valor vazio caso o estado não esteja presente
        const p_pais = pais ?? "";             // Usa valor vazio caso o país não esteja presente
        const p_cidade = cidade ?? "";         // Usa valor vazio caso a cidade não esteja presente

        // Chama a OpenAI para gerar a descrição da imagem
        const descricao = await openaiService.gerarDescricaoImagem({
          base64: p_base64,
          bairro: p_bairro,
          estado: p_estado,
          pais: p_pais,
          cidade: p_cidade,
        });
        return {
          imagem,    // Dados da imagem (com base64)
          descricao, // Descrição gerada pela OpenAI
        };
      })
    );

    // Remove o campo base64 de cada objeto no array de descrições
    const descricoesSemBase64 = descricoes.map(({ imagem, descricao }) => {
      // Desestruturar o objeto imagem para remover o campo base64
      const { base64, ...imagemSemBase64 } = imagem;
      return {
        imagem: imagemSemBase64, // Imagem sem o campo base64
        descricao,              // Descrição gerada pela OpenAI
      };
    });

    // Atualiza ou insere os dados das imagens e descrições no Supabase
    let retorno = await supabaseService.upsertLandData(descricoesSemBase64, bairro);

    // Retorna as descrições sem o campo base64 no formato JSON
    res.json(descricoesSemBase64);
  } catch (error) {
    // Se ocorrer algum erro, registra e retorna um erro genérico com status 500
    console.error("Erro ao buscar imagens do Supabase:", error);
    res.status(500).json({ error: "Erro ao buscar imagens do Supabase." });
  }
};
