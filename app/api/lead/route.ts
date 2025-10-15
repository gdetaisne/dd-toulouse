import { NextRequest, NextResponse } from 'next/server';
import { validateLeadData } from '@/lib/validations';
import { checkRateLimit } from '@/lib/rate-limit';
import { env } from '@/lib/env';

export async function POST(req: NextRequest) {
  try {
    // Vérifier la configuration
    const webhookUrl = env.MAKE_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('MAKE_WEBHOOK_URL is not configured');
      return NextResponse.json(
        { ok: false, error: 'Service temporairement indisponible' },
        { status: 500 }
      );
    }

    // Rate limiting
    const clientIP = req.ip || req.headers.get('x-forwarded-for') || 'unknown';
    const rateLimitResult = checkRateLimit(clientIP);
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          ok: false, 
          error: 'Trop de requêtes. Veuillez réessayer plus tard.',
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          }
        }
      );
    }

    // Parser et valider les données
    let rawData: unknown;
    try {
      rawData = await req.json();
    } catch (error) {
      console.error('Invalid JSON in request body:', error);
      return NextResponse.json(
        { ok: false, error: 'Format de données invalide' },
        { status: 400 }
      );
    }

    // Valider avec Zod
    const validation = validateLeadData(rawData);
    if (!validation.success) {
      console.warn('Validation failed:', validation.errors);
      return NextResponse.json(
        { 
          ok: false, 
          error: 'Données invalides',
          details: validation.errors
        },
        { status: 400 }
      );
    }

    const validatedData = validation.data;

    // Envoyer au webhook
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Moverz-toulouse-API/1.0'
      },
      body: JSON.stringify(validatedData),
      // Timeout de 10 secondes
      signal: AbortSignal.timeout(10000)
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => '');
      console.error('Webhook error:', res.status, errorText);
      return NextResponse.json(
        { ok: false, error: 'Erreur lors de l\'envoi. Veuillez réessayer.' },
        { status: 502 }
      );
    }

    // Log du succès (sans données sensibles)
    console.log('Lead submitted successfully:', {
      email: validatedData.email,
      pickup: validatedData.pickup,
      dropoff: validatedData.dropoff,
      date: validatedData.date,
      volume: validatedData.volume,
      utm_source: validatedData.utm_source
    });

    return NextResponse.json({ 
      ok: true,
      message: 'Votre demande a été envoyée avec succès'
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    console.error('API error:', error);
    
    return NextResponse.json(
      { ok: false, error: 'Erreur interne. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}


