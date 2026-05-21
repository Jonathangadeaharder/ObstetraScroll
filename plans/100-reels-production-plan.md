# Plan: Producción de 100 Reels (Video + Audio)

## Pipeline actual

```
fact.ts → planReel() → brief (guion, beats, imagePrompts, editorialChecks)
                         ↓
                   text2audio (TTS → WAV)
                         ↓
                   text2image (prompts → PNG)
                         ↓
                   image2video / text2video (compila → MP4 + poster PNG)
                         ↓
                   static/generated-media/{audio,reels,posters}/
```

Hay 6 reals en producción. Escalar a 100 requiere 94 más.

## Fase 1: Fuente de datos (100 facts)

**Fuente:** Guías OMS y Cochrane para obstetricia/partería.

94 temas adicionales, priorizados por:

| Lote | #   | Tema                   | Ejemplos                                                 |
| ---- | --- | ---------------------- | -------------------------------------------------------- |
| 1    | 20  | Hemorragia postparto   | Prevención, oxitocina, masaje uterino, ácido tranexámico |
| 2    | 15  | Preeclampsia/eclampsia | Prevención con calcio, MgSO4, criterios diagnósticos     |
| 3    | 10  | Sepsis neonatal        | Prevención, clorhexidina, antibióticos intraparto        |
| 4    | 10  | Parto prematuro        | Betametasona, sulfato de magnesio, prevención            |
| 5    | 10  | Asfixia perinatal      | Reanimación neonatal, hipotermia terapéutica             |
| 6    | 10  | Infecciones            | VIH, sífilis, estreptococo B, malaria en embarazo        |
| 7    | 10  | Nutrición materna      | Suplementación, anemia, yodo, ácido fólico               |
| 8    | 9   | Temas diversos         | LM, tabaco, ejercicio, salud mental perinatal            |

**Formato de cada fact:**

- `id`: slug corto (kebab-case)
- `rank`: 1-100 por impacto clínico
- `title`: título gancho ≤80 chars
- `insight`: 1-2 oraciones (20-30s lectura)
- `whyNonObvious`: por qué no es práctica común
- `audience`: tipo de profesional
- `sourceNote`: con cita
- `evidenceStatus`: needs_review / evidence_based / consensus
- `riskLevel`: low / medium / high
- `tags`: sistema, intervención, contexto

**Acción:** Crear `facts-batch-2.ts` a `facts-batch-8.ts` y mergear a `facts.ts`.

## Fase 2: Generación de briefs (guiones)

Usar `POST /api/reels` o script batch:

```
for fact in facts[6..99]:
    request = { factId: fact.id, tone: "mentor", targetDurationSec: 28 }
    brief = planReel(fact, request)
    save brief to database/manifest
```

Cada brief produce:

- `hook`: frase inicial que engancha
- `script`: narración completa (60-400 palabras según duración)
- `beats`: 5-10 segmentos (visual + voiceover)
- `imagePrompts`: prompts para generación de imágenes
- `editorialChecks`: checklist de verificación
- `caption`: texto para publicación
- `hashtags`: tags para SEO social
- `renderPlan`: secuencia de assets a compilar

**targetDurationSec:** 30-180 según densidad del tema (no 8s).

**Tiempo estimado:** ~45s por brief → ~70min para 94 briefs.

## Fase 3: Audio (TTS)

**Stack:** `AIServices/packages/text2audio/` con Edge TTS.

Parámetros por reel:

```
voice = "es-AR-ElenaNeural" o "es-MX-DaliaNeural"
speed = 0.95  # ligeramente más lento que natural
```

Pipeline batch:

```
for each brief:
    text = brief.script
    output = static/generated-media/audio/reel-{NN}-{factId}.wav
    run text2audio con voice + speed
```

**Tiempo estimado:** 30-180s de audio → ~1.5x wall time → ~45min-4.5h para 94.

**Output:** 94 × WAV files en `static/generated-media/audio/`.

## Fase 4: Imágenes (text2image)

**Stack:** `AIServices/packages/text2image/` con modelo local FLUX / SDXL.

Por reel:

- 5-12 imágenes según duración (1 cada ~8s de video)
- Resolución: 1080×1920 (9:16 reel)
- Prompt desde `imagePrompts[i]`
- Seed fijo por imagen (reproducibilidad)

**Tiempo estimado:** ~20s por imagen → 100-240s por reel → ~2.6-6.3h para 94 reels.

**Optimización:** Paralelizar con subagentes (4 workers → ~40min-1.5h).

**Output:** 500-1200 × PNG en `static/generated-media/images/`.

## Fase 5: Video (compilación)

**Stack:** `AIServices/packages/image2video/` o `text2video/`.

Dos enfoques:

| Opción             | Pros                         | Contras                 | Tiempo/reel    |
| ------------------ | ---------------------------- | ----------------------- | -------------- |
| **A) image2video** | Cada beat es imagen + motion | Más assets, compilación | ~1-2x duración |
| **B) text2video**  | Pipeline directo             | Control fino limitado   | ~2-3x duración |

**Opción recomendada:** A) image2video para reels finales. Usar B como fallback.

Pipeline:

```
input: 5-12 images (1080×1920) + audio WAV (30-180s)
output: MP4 (1080×1920, 30fps, duración completa)
params: fade transitions, Ken Burns zoom, subtitles opcionales
```

**Tiempo estimado:** ~30s-3min por reel (1x duración) → ~1-5h para 94.

**Output:** 94 × MP4 en `static/generated-media/reels/`.

## Fase 6: Post-producción

Por reel generado:

1. Verificar sincronía labial/audio
2. Validar contenido clínico vs brief
3. Generar poster PNG (frame 0 del video)
4. Actualizar `manifest.json`
5. Prueba visual en la app (iPhone + desktop)

**Control de calidad por lote de 10 reels:**

- Revisión clínica de facts
- Escuchar audio (pronunciación, entonación)
- Ver video completo en la app
- Verificar quiz asociado

## Fase 7: Quiz

Cada reel necesita un quiz:

```
question: (pregunta sobre el fact)
options: [4 opciones]
answerIndex: (0-3)
explanation: (por qué es correcta)
```

Generar junto con el brief en Fase 2.

## Infraestructura

### Requisitos de almacenamiento

| Asset        | Cantidad | Tamaño unitario | Total          |
| ------------ | -------- | --------------- | -------------- |
| Audio WAV    | 100      | ~200KB-5MB      | ~20-500MB      |
| Imágenes PNG | 500-1200 | ~500KB          | ~250-600MB     |
| Videos MP4   | 100      | ~5-50MB         | ~500-5000MB    |
| Posters PNG  | 100      | ~100KB          | ~10MB          |
| **Total**    |          |                 | **~800MB-6GB** |

### Cómputo

- Generación de briefs: CPU only, despreciable
- TTS: CPU only, ~15s por reel
- Imágenes: GPU required (FLUX/SDXL), ~20s por imagen
- Video: GPU recommended, ~30s por reel

**Hardware:** Mac Studio M2 Ultra o servidor con NVIDIA RTX 4090 para Fase 4-5.

### Ejecución

Lotes de 10 reels → pipeline completo por lote:

```
Batch 1: facts 7-16  → briefs → audio → images → video → qa
Batch 2: facts 17-26 → briefs → audio → images → video → qa
...
Batch 10: facts 94-100 → ...
```

## Timeline estimado

| Fase                   | Tiempo                 | Dependencias                |
| ---------------------- | ---------------------- | --------------------------- |
| 1. Facts (94)          | 2 días                 | Investigación bibliográfica |
| 2. Briefs (94)         | 1-2 horas              | Fase 1                      |
| 3. Audio (94)          | 45min-4.5h             | Fase 2                      |
| 4. Imágenes (500-1200) | 40min-1.5h (4 workers) | Fase 2                      |
| 5. Video (94)          | 1-5h                   | Fase 3 + 4                  |
| 6. QA                  | 6 horas                | Fase 5                      |
| 7. Quiz (94)           | automático con brief   | Fase 2                      |
| **Total**              | **~3-5 días**          |                             |

## Archivos a modificar

```
src/lib/server/facts.ts         ← +94 facts
src/lib/server/reelPlanner.ts   ← tocar? config
src/lib/client/reelFeed.ts      ← nada
static/generated-media/audio/   ← +94 WAV
static/generated-media/images/  ← +470 PNG
static/generated-media/reels/   ← +94 MP4
static/generated-media/posters/ ← +94 PNG
static/generated-media/manifest.json ← actualizar
```
