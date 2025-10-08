import { z } from 'zod';

// Schéma de validation pour les leads
export const LeadSchema = z.object({
  name: z.string()
    .min(1, 'Le nom est requis')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, 'Le nom contient des caractères invalides'),
  
  email: z.string()
    .email('Adresse email invalide')
    .max(255, 'L\'email ne peut pas dépasser 255 caractères'),
  
  phone: z.string()
    .min(10, 'Le numéro de téléphone doit contenir au moins 10 caractères')
    .max(15, 'Le numéro de téléphone ne peut pas dépasser 15 caractères')
    .regex(/^[0-9\s\-\+\(\)]+$/, 'Format de téléphone invalide'),
  
  pickup: z.string()
    .min(1, 'L\'adresse de départ est requise')
    .max(500, 'L\'adresse de départ ne peut pas dépasser 500 caractères'),
  
  dropoff: z.string()
    .min(1, 'L\'adresse d\'arrivée est requise')
    .max(500, 'L\'adresse d\'arrivée ne peut pas dépasser 500 caractères'),
  
  date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format de date invalide (YYYY-MM-DD)')
    .refine((date) => {
      const inputDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return inputDate >= today;
    }, 'La date doit être dans le futur'),
  
  volume: z.string()
    .regex(/^\d+(\.\d+)?$/, 'Le volume doit être un nombre valide')
    .refine((vol) => {
      const num = parseFloat(vol);
      return num >= 0 && num <= 1000;
    }, 'Le volume doit être entre 0 et 1000 m³'),
  
  message: z.string()
    .max(2000, 'Le message ne peut pas dépasser 2000 caractères')
    .optional()
    .default(''),
  
  // UTM parameters (optionnels)
  utm_source: z.string().max(100).optional().default(''),
  utm_medium: z.string().max(100).optional().default(''),
  utm_campaign: z.string().max(100).optional().default(''),
  utm_term: z.string().max(100).optional().default(''),
  utm_content: z.string().max(100).optional().default(''),
});

export type LeadData = z.infer<typeof LeadSchema>;

// Fonction utilitaire pour valider et nettoyer les données
export function validateLeadData(data: unknown): { success: true; data: LeadData } | { success: false; errors: string[] } {
  try {
    const validatedData = LeadSchema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map(err => `${err.path.join('.')}: ${err.message}`);
      return { success: false, errors };
    }
    return { success: false, errors: ['Erreur de validation inconnue'] };
  }
}
