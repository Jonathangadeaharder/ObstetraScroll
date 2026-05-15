# Plan: 100 Reels (30s-3min cada uno) ✅ COMPLETADO

Cada sesión produce un resultado desplegable e independiente.

## Pipeline real (AIServices)

```
facts → planReel() → brief (guion + quiz)
                         ↓
                   text2audio → WAV
                         ↓
                   text2image → first frame PNG
                         ↓
                   image2video → segmentos MP4 (8s c/u)
                         ↓
                   ffmpeg concat + mux → reel MP4 + poster PNG
```

## Estado actual ✅

| Sesión | Descripción | Estado | Assets |
|--------|-------------|--------|--------|
| 1 | Facts OMS/Cochrane | ✅ Completo | `src/lib/server/facts.ts` — 94 facts |
| 2 | Briefs + quizzes | ✅ Completo | `manifest.json` — 94 briefs |
| 3 | Audio TTS | ✅ Completo | 94 WAV en `static/generated-media/audio/` |
| 4 | Imágenes (text2image) | ✅ Integrado en pipeline | Generadas on-the-fly por AIServices, no almacenadas como PNG independientes |
| 5 | Video MP4 | ✅ Completo | 94 MP4 + 94 posters |
| 6 | QA + polaco | 🔲 Pendiente | Verificar en app real |

## Sesiones ejecutadas

### Sesión 1: 94 facts ✅

**Qué:** Investigar y escribir 94 facts de OMS/Cochrane para obstetricia.

| Lote | # | Tema |
|------|---|------|
| 1 | 20 | Hemorragia postparto |
| 2 | 15 | Preeclampsia/eclampsia |
| 3 | 10 | Sepsis neonatal |
| 4 | 10 | Parto prematuro |
| 5 | 10 | Asfixia perinatal |
| 6 | 10 | Infecciones (VIH, sífilis, malaria) |
| 7 | 10 | Nutrición materna |
| 8 | 9 | Diversos (LM, tabaco, salud mental) |

**Output:** `src/lib/server/facts.ts` — 94 facts con id, title, insight, whyNonObvious, audience, sourceNote, evidenceStatus, riskLevel, tags.

### Sesión 2: 94 briefs + quizzes ✅

**Qué:** Generar guiones y quizzes para todos los facts via `planReel()` + batch scripts.

`scripts/generate-briefs.mjs` llama `POST /api/reels` para cada fact.

Cada brief incluye:
- script (narración completa, ~60-400 palabras)
- beats (5-10 segmentos visual+voiceover)
- editorialChecks (verificación clínica)
- quiz (pregunta, 4 opciones, explicación)

**Output:** `static/generated-media/manifest.json` — 94 items con briefs completos.
Archivos batch intermedios: `batch-1.json` a `batch-8.json`, `quizzes-batch-1.json` a `quizzes-batch-5.json`.

**Nota:** Quizzes generados pero pendientes de enriquecer con LLM (campo `note` en manifest.json).

### Sesión 3: 94 audios ✅

**Qué:** Generar TTS para cada brief vía `scripts/generate-ai-media.mjs` → `AIServices/packages/text2audio/`.

```
voice = "partera-rioplatense" (voz personalizada, no ElenaNeural)
speed = 1.0
seed = fijo por reel (reproducibilidad)
```

**Output:** 94 × WAV en `static/generated-media/audio/`.

### Sesión 4: Backgrounds + keyframes ✅ (integrado en pipeline)

No se generan imágenes PNG independientes. El pipeline AIServices hace:
1. `text2image` → genera primer frame (keyframe) del background continuo
2. `image2video` → genera segmentos de ~8s desde cada keyframe, preservando continuidad visual (último frame del segmento anterior como input del siguiente)
3. Seeds incrementalmente por segmento para variedad controlada

**Output intermedio:** Keyframes en `static/generated-media/keyframes/`, segmentos en `static/generated-media/segments/`.

Resolución de segmentos: 384×672 (se escala a 720×1280 en compilación final).

### Sesión 5: 94 videos ✅

**Qué:** Compilar segmentos + audio en MP4 vía ffmpeg.

Pipeline por reel (`scripts/generate-ai-media.mjs`):
1. `ffmpeg concat` — une segmentos MP4 en video continuo
2. `ffmpeg mux` — mezcla video continuo + audio WAV, escala a 720×1280, codec h264 + aac
3. `ffmpeg poster` — extrae frame a los 2s como poster PNG

**Output:**
- 94 × MP4 en `static/generated-media/reels/` (720×1280, h264, aac 160k)
- 94 × PNG posters en `static/generated-media/posters/`

### Sesión 6: QA + polaco 🔲 PENDIENTE

**Qué:** Verificar cada reel en app real (iPhone + desktop).

Checklist por lote de 10:

| # | Check | Criterio |
|---|-------|----------|
| 1 | Sincronía audio/video | Voz sincronizada, sin cortes ni glitches |
| 2 | Duración correcta | 30-180s, coherente con brief |
| 3 | Contenido clínico | Facts precisos, fuentes correctas, riesgo apropiado |
| 4 | Quiz funcional | Pregunta visible, 4 opciones, explicación correcta |
| 5 | Reproducción móvil | Autoplay + sound toggle funcional en iOS |
| 6 | Scroll/swipe | Navegación entre reels fluida |
| 7 | Poster | Poster visible en feed/feed de tarjetas |
| 8 | Performance | Sin lag en carga de video |

Flujo de corrección:
```
detectar error → editar fact/brief → regenerar audio + video → push
```

**Tiempo estimado:** ~3-6h (10-15 min por lote de 10 reels).

### Sesión 7: Enriquecer quizzes con LLM 🔲 PENDIENTE

**Qué:** Los quizzes actuales tienen estructura básica. Enriquecer:
- Explicaciones más detalladas
- Referencias a fuente específica
- Trampas pedagógicas en opciones incorrectas

**Output:** `manifest.json` actualizado con quizzes enriquecidos.

**Tiempo:** ~15min (batch con LLM).

## Almacenamiento real

| Asset | Cantidad | Total |
|-------|----------|-------|
| Audio WAV | 94 | ~200MB |
| Keyframes PNG | ~1000 | ~500MB |
| Segmentos MP4 | ~1500 | ~3GB |
| Videos MP4 finales | 94 | ~500MB-2GB |
| Posters PNG | 94 | ~10MB |
| **Total** | | **~4-6GB** (incluyendo intermedios) |

Los keyframes y segmentos son intermedios; solo audios, reels MP4 y posters van a producción.

## Archivos

```
src/lib/server/facts.ts                    ← 94 facts (sesión 1)
scripts/generate-briefs.mjs                ← batch brief generator (sesión 2)
scripts/generate-ai-media.mjs              ← pipeline completo audio+video (sesiones 3-5)
static/generated-media/manifest.json       ← 94 briefs + quizzes (sesión 2)
static/generated-media/audio/*.wav         ← 94 archivos (sesión 3)
static/generated-media/keyframes/*.png     ← frames intermedios (sesión 4)
static/generated-media/segments/*.mp4      ← segmentos intermedios (sesión 4)
static/generated-media/reels/*.mp4         ← 94 videos finales (sesión 5)
static/generated-media/posters/*.png       ← 94 posters (sesión 5)
static/generated-media/batch-*.json        ← batches intermedios de briefs
static/generated-media/quizzes-batch-*.json ← batches de quizzes
```

## Pipeline completo para regenerar un reel

```bash
# 1. Brief
curl -X POST /api/reels \
  -H "Content-Type: application/json" \
  -d '{"factId": "hpp-oxitocina-profilaxis-10ui", "tone": "mentor", "targetDurationSec": 60}'

# 2. Audio + Video (full pipeline)
uv run --package text2audio text2audio --text "$script" --output audio.wav --voice partera-rioplatense --speed 1.0 --seed 3101

# 3. Primer frame
uv run --package text2image text2image --prompt "$backgroundPrompt" --output first-frame.png --width 384 --height 672 --steps 20 --seed 3101

# 4. Segmentos (por cada 8s de audio)
uv run --package image2video image2video --input frame.png --prompt "$continuityPrompt" --output segment.mp4 --seconds 8 --fps 8 --width 384 --height 672 --steps 4

# 5. Compilar
ffmpeg -y -f concat -safe 0 -i segments.txt -t $duration -c copy continuous.mp4
ffmpeg -y -i continuous.mp4 -i audio.wav -t $duration -vf "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,format=yuv420p" -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 160k reel-final.mp4
ffmpeg -y -ss 00:00:02 -i reel-final.mp4 -frames:v 1 poster.png
```
