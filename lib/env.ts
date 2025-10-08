import { z } from 'zod';

// Schéma de validation pour les variables d'environnement
const envSchema = z.object({
  // Variables requises
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // URLs et services
  SITE_URL: z.string().url().default('https://www.toulouse-demenageur.fr'),
  MAKE_WEBHOOK_URL: z.string().url().optional(),
  
  // Configuration Next.js
  PORT: z.string().regex(/^\d+$/).transform(Number).default(3000),
  
  // Variables optionnelles
  OPENAI_API_KEY: z.string().optional(),
  
  // Variables de développement
  NEXT_TELEMETRY_DISABLED: z.string().optional(),
});

// Valider les variables d'environnement
function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues
        .filter(err => err.code === 'invalid_type' && 'received' in err && err.received === 'undefined')
        .map(err => err.path.join('.'));
      
      const invalidVars = error.issues
        .filter(err => err.code !== 'invalid_type')
        .map(err => `${err.path.join('.')}: ${err.message}`);
      
      console.error('❌ Variables d\'environnement invalides:');
      
      if (missingVars.length > 0) {
        console.error('Variables manquantes:', missingVars.join(', '));
      }
      
      if (invalidVars.length > 0) {
        console.error('Variables invalides:', invalidVars.join(', '));
      }
      
      console.error('\n💡 Créez un fichier .env.local avec les variables requises.');
      console.error('Exemple:');
      console.error('NODE_ENV=development');
      console.error('SITE_URL=https://www.toulouse-demenageur.fr');
      console.error('MAKE_WEBHOOK_URL=https://hook.eu1.make.com/...');
      
      throw new Error('Configuration des variables d\'environnement invalide');
    }
    throw error;
  }
}

// Exporter les variables validées
export const env = validateEnv();

// Type pour TypeScript
export type Env = z.infer<typeof envSchema>;

// Fonction utilitaire pour vérifier si on est en production
export const isProduction = env.NODE_ENV === 'production';
export const isDevelopment = env.NODE_ENV === 'development';
export const isTest = env.NODE_ENV === 'test';
