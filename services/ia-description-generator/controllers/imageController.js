const openaiService = require("../services/openaiService");
const supabaseService = require("../services/supabaseService");
const { urlToBase64 } = require("../utils/urlToBase64");
const { createClient } = require("@supabase/supabase-js");

// Função para buscar imagens do Supabase e gerar descrição
exports.getImagesDescriptionFromSupabase = async (req, res) => {
  const { bairro, estado, pais, cidade } = req.body; // Pegando o parâmetro "bairro" do corpo da requisição

  try {
    // Verifica se o campo bairro foi enviado
    if (!bairro) {
      return res.status(400).json({ error: "O campo 'bairro' é obrigatório." });
    }

    // Busca as imagens da pasta correspondente ao bairro
    let imagens = await supabaseService.getImagensDoBucket(bairro);

    // Se não houver imagens, retorna uma mensagem de erro
    if (!imagens || imagens.length === 0) {
      return res
        .status(404)
        .json({ error: "Nenhuma imagem encontrada para o bairro fornecido." });
    }

    imagens = await Promise.all(
      imagens.map(async (imagem) => {
        let base64 = await urlToBase64(imagem.url);
        return {
          base64: base64,
          url: imagem.url,
          image_data: imagem.image_data,
        };
      })
    );

    // Para cada imagem, gerar uma descrição usando a OpenAI
    const descricoes = await Promise.all(
      imagens.map(async (imagem) => {
        const p_base64 = imagem.base64 ?? "";
        const p_bairro = bairro ?? "";
        const p_estado = estado ?? "";
        const p_pais = pais ?? "";
        const p_cidade = cidade ?? "";

        const descricao = await openaiService.gerarDescricaoImagem({
          base64: p_base64,
          bairro: p_bairro,
          estado: p_estado,
          pais: p_pais,
          cidade: p_cidade,
        });
        return {
          imagem,
          descricao,
        };
      })
    );

    // Remover o campo base64 de cada objeto no array descricoes
    const descricoesSemBase64 = descricoes.map(({ imagem, descricao }) => {
      // Desestruturar o campo base64 fora do objeto imagem e retornar o restante
      const { base64, ...imagemSemBase64 } = imagem;
      return {
        imagem: imagemSemBase64,
        descricao,
      };
    });

    let retorno = await supabaseService.upsertLandData(descricoesSemBase64, bairro);

    res.json(descricoesSemBase64);
  } catch (error) {
    console.error("Erro ao buscar imagens do Supabase:", error);
    res.status(500).json({ error: "Erro ao buscar imagens do Supabase." });
  }
};
