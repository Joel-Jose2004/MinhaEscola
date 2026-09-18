import {
  handleUpload,
  type HandleUploadBody,
} from "@vercel/blob/client";

import type {
  VercelRequest,
  VercelResponse,
} from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Método não permitido",
      });
    }

    const body = req.body as HandleUploadBody;

    const jsonResponse = await handleUpload({
      body,
      request: req,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      onBeforeGenerateToken: async (pathname) => {
        console.log("Gerando token para:", pathname);

        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
          ],
          maximumSizeInBytes: 5 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
    });

    console.log("CLIENT TOKEN GERADO COM SUCESSO");

    return res.status(200).json(jsonResponse);
  } catch (error) {
    console.error("ERRO NO HANDLE UPLOAD:", error);

    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
}