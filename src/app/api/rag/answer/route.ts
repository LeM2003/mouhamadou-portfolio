import { NextRequest, NextResponse } from "next/server";
import { corpus } from "@/lib/ragPlayground/corpus";

/**
 * POST /api/rag/answer
 *
 * Étape "génération" du RAG playground : le retrieval (chunking + embedding
 * + scoring) reste déterministe côté client (voir corpus.ts) — c'est la
 * partie pédagogique, volontairement transparente. Cette route ajoute la
 * seule partie qui a besoin d'un vrai LLM : synthétiser une réponse en
 * langage naturel à partir des chunks récupérés, avec ancrage strict et
 * citation des sources — jamais d'invention au-delà du corpus fourni.
 *
 * Nécessite la variable d'environnement GROQ_API_KEY (console.groq.com).
 * Sans clé, la route répond 501 et le playground reste utilisable en
 * mode pédagogique pur (chunking/embedding/retrieval visuels, sans réponse
 * générée).
 */

const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "GROQ_API_KEY absente côté serveur — mode réponse générée désactivé. Le retrieval déterministe reste disponible.",
      },
      { status: 501 }
    );
  }

  let body: { query?: string; chunkIds?: string[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const query = (body.query ?? "").trim();
  const chunkIds = Array.isArray(body.chunkIds) ? body.chunkIds : [];

  if (query.length < 2 || chunkIds.length === 0) {
    return NextResponse.json(
      { error: "Question ou chunks manquants." },
      { status: 400 }
    );
  }

  const chunks = corpus.filter((c) => chunkIds.includes(c.id));
  if (chunks.length === 0) {
    return NextResponse.json(
      { error: "Aucun chunk correspondant trouvé dans le corpus." },
      { status: 400 }
    );
  }

  const context = chunks
    .map((c, i) => `[${i + 1}] (source : ${c.source})\n${c.text}`)
    .join("\n\n");

  const systemPrompt = `Tu es l'assistant du portfolio de Mouhamadou Diouf. Tu réponds UNIQUEMENT à partir des extraits fournis ci-dessous — jamais d'information externe, jamais d'invention.

Règles strictes :
- Si la réponse n'est pas couverte par les extraits, dis-le explicitement ("Je n'ai pas d'information vérifiée là-dessus dans mon corpus") et invite à le contacter directement plutôt que d'improviser.
- Cite systématiquement le(s) numéro(s) de source utilisés, ex. "[1]".
- Réponds en français, 2 à 4 phrases maximum, ton direct et factuel.

Extraits disponibles :
${context}`;

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.2,
        max_tokens: 220,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query },
        ],
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error("Groq API error", groqRes.status, errText);
      return NextResponse.json(
        { error: "Le service de génération est momentanément indisponible." },
        { status: 502 }
      );
    }

    const data = await groqRes.json();
    const answer: string | undefined = data?.choices?.[0]?.message?.content;

    if (!answer) {
      return NextResponse.json(
        { error: "Réponse vide du modèle." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      answer,
      sources: chunks.map((c, i) => ({ ref: i + 1, source: c.source, id: c.id })),
      model: GROQ_MODEL,
    });
  } catch (err) {
    console.error("RAG answer route error", err);
    return NextResponse.json(
      { error: "Erreur serveur lors de la génération de la réponse." },
      { status: 500 }
    );
  }
}
