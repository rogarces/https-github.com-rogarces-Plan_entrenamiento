
import { GoogleGenAI, Type } from "@google/genai";
import { FormData, TrainingPlan } from './types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const trainingPlanSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "Un título motivador para el plan de entrenamiento." },
    runnerName: { type: Type.STRING, description: "El nombre del corredor." },
    weeks: {
      type: Type.ARRAY,
      description: "Lista de semanas del plan de entrenamiento.",
      items: {
        type: Type.OBJECT,
        properties: {
          weekNumber: { type: Type.INTEGER, description: "El número de la semana." },
          weeklySummary: { type: Type.STRING, description: "Un resumen del objetivo principal de la semana." },
          totalKm: { type: Type.NUMBER, description: "El volumen total de kilómetros para la semana." },
          days: {
            type: Type.ARRAY,
            description: "Plan detallado para cada día de la semana.",
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.STRING, description: "Día de la semana (ej. Lunes, Martes)." },
                session: {
                  oneOf: [
                    {
                      type: Type.OBJECT,
                      properties: {
                        title: { type: Type.STRING, description: "Título de la sesión (ej. Carrera Fácil, Series, Trote Largo)." },
                        warmup: { type: Type.STRING, description: "Instrucciones detalladas para el calentamiento." },
                        mainSet: { type: Type.STRING, description: "Instrucciones detalladas de la parte principal del entrenamiento." },
                        cooldown: { type: Type.STRING, description: "Instrucciones detalladas para la vuelta a la calma." },
                      },
                      required: ["title", "warmup", "mainSet", "cooldown"],
                    },
                    { type: Type.STRING, description: "Texto simple para días de descanso (ej. 'Descanso')." }
                  ],
                },
              },
              required: ["day", "session"],
            },
          },
          recoveryNotes: { type: Type.STRING, description: "Notas opcionales sobre recuperación, masajes, o kinesiología para la semana.", nullable: true },
        },
        required: ["weekNumber", "weeklySummary", "totalKm", "days"],
      },
    },
  },
  required: ["title", "runnerName", "weeks"],
};


export const generateTrainingPlan = async (formData: FormData): Promise<TrainingPlan> => {
  const prompt = `
    Eres un entrenador de running experto y de clase mundial, especializado en crear planes de entrenamiento personalizados para corredores aficionados y principiantes. Tu objetivo es proporcionar planes seguros, efectivos y motivadores.

    Basado en los siguientes datos del atleta, genera un plan de entrenamiento detallado en formato JSON, adhiriéndote estrictamente al esquema proporcionado.

    Datos del Atleta:
    - Nombre: ${formData.name}
    - Edad: ${formData.age}
    - Nivel de Experiencia: ${formData.experience}
    - Distancia Objetivo: ${formData.distance}
    - Ritmo Objetivo Deseado: ${formData.pace} min/km

    Requisitos del Plan:
    1. La duración total del plan debe ser adecuada para el nivel de experiencia y la distancia objetivo. Por ejemplo, un plan de 21K para un principiante debería durar entre 12 y 16 semanas. Ajusta la duración según corresponda.
    2. Cada sesión de entrenamiento debe incluir calentamiento, parte principal y vuelta a la calma.
    3. Las instrucciones deben ser muy detalladas: especifica ritmos (en min/km), duraciones, distancias y, si aplica, zonas de frecuencia cardíaca.
    4. Para los días de descanso, el valor de "session" debe ser el string "Descanso".
    5. Calcula y muestra el volumen total de kilómetros al final de cada semana.
    6. Incluye recomendaciones de recuperación como masajes o kinesiología en el campo "recoveryNotes" cuando lo consideres apropiado.

    NO incluyas ninguna explicación, texto introductorio, conclusion o notas de cierre fuera de la estructura JSON. Tu respuesta debe ser ÚNICAMENTE el objeto JSON válido.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: trainingPlanSchema,
      },
    });
    
    const jsonText = response.text.trim();
    const plan: TrainingPlan = JSON.parse(jsonText);
    return plan;
  } catch (error) {
    console.error("Error generating training plan from Gemini:", error);
    throw new Error("Failed to generate training plan.");
  }
};
