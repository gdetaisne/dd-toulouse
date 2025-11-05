"use client";

import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import Breadcrumbs from "@/components/Breadcrumbs";

// Types
type LogementType = 'studio' | 't2' | 't3' | 't4' | 't5' | 't6' | 'maison' | 'autre';

interface LogementConfig {
  surface: number;
  volume: number;
  label: string;
}

interface Ville {
  nom: string;
  latitude: number;
  longitude: number;
  population: number;
}

interface CalculResult {
  volume: number;
  distance: number;
  tarifEco: number;
  tarifStandard: number;
  tarifPremium: number;
  prixEco: { min: number; max: number };
  prixStandard: { min: number; max: number };
  prixPremium: { min: number; max: number };
}

// Configuration des logements
const LOGEMENTS: Record<LogementType, LogementConfig> = {
  studio: { surface: 25, volume: 7.5, label: "Studio" },
  t2: { surface: 37, volume: 11.1, label: "T2" },
  t3: { surface: 57, volume: 17.1, label: "T3" },
  t4: { surface: 85, volume: 25.5, label: "T4" },
  t5: { surface: 115, volume: 34.5, label: "T5" },
  t6: { surface: 150, volume: 45, label: "T6" },
  maison: { surface: 200, volume: 60, label: "Maison" },
  autre: { surface: 100, volume: 30, label: "Autre" }
};

// Base de données des villes françaises principales
const VILLES_FRANCAISES: Ville[] = [
  // Grandes métropoles
  { nom: "Paris", latitude: 48.8566, longitude: 2.3522, population: 2161000 },
  { nom: "Marseille", latitude: 43.2965, longitude: 5.3698, population: 870000 },
  { nom: "nice", latitude: 45.7640, longitude: 4.8357, population: 515000 },
  { nom: "Toulouse", latitude: 43.6047, longitude: 1.4442, population: 470000 },
  { nom: "Nice", latitude: 43.7102, longitude: 7.2620, population: 340000 },
  { nom: "Nantes", latitude: 47.2184, longitude: -1.5536, population: 310000 },
  { nom: "Montpellier", latitude: 43.6110, longitude: 3.8767, population: 290000 },
  { nom: "Strasbourg", latitude: 48.5734, longitude: 7.7521, population: 280000 },
  { nom: "Bordeaux", latitude: 44.8378, longitude: -0.5792, population: 250000 },
  { nom: "Lille", latitude: 50.6292, longitude: 3.0573, population: 230000 },
  { nom: "Rennes", latitude: 48.1173, longitude: -1.6778, population: 220000 },
  
  // Villes importantes (100k+ habitants)
  { nom: "Reims", latitude: 49.2583, longitude: 4.0317, population: 180000 },
  { nom: "Le Havre", latitude: 49.4944, longitude: 0.1079, population: 170000 },
  { nom: "Saint-Étienne", latitude: 45.4397, longitude: 4.3872, population: 170000 },
  { nom: "Toulon", latitude: 43.1242, longitude: 5.9280, population: 170000 },
  { nom: "Angers", latitude: 47.4784, longitude: -0.5632, population: 150000 },
  { nom: "Grenoble", latitude: 45.1885, longitude: 5.7245, population: 160000 },
  { nom: "Dijon", latitude: 47.3220, longitude: 5.0415, population: 150000 },
  { nom: "Nîmes", latitude: 43.8367, longitude: 4.3601, population: 150000 },
  { nom: "Aix-en-Provence", latitude: 43.5263, longitude: 5.4454, population: 140000 },
  { nom: "Clermont-Ferrand", latitude: 45.7772, longitude: 3.0870, population: 140000 },
  { nom: "Brest", latitude: 48.3905, longitude: -4.4860, population: 140000 },
  { nom: "Tours", latitude: 47.3941, longitude: 0.6848, population: 140000 },
  { nom: "Limoges", latitude: 45.8336, longitude: 1.2611, population: 130000 },
  { nom: "Amiens", latitude: 49.8943, longitude: 2.2958, population: 130000 },
  { nom: "Annecy", latitude: 45.8992, longitude: 6.1294, population: 130000 },
  { nom: "Perpignan", latitude: 42.6886, longitude: 2.8948, population: 120000 },
  { nom: "Boulogne-Billancourt", latitude: 48.8355, longitude: 2.2413, population: 120000 },
  { nom: "Metz", latitude: 49.1193, longitude: 6.1757, population: 120000 },
  { nom: "Besançon", latitude: 47.2380, longitude: 6.0243, population: 120000 },
  { nom: "Orléans", latitude: 47.9029, longitude: 1.9093, population: 120000 },
  { nom: "Mulhouse", latitude: 47.7508, longitude: 7.3359, population: 110000 },
  { nom: "Rouen", latitude: 49.4432, longitude: 1.0993, population: 110000 },
  { nom: "Caen", latitude: 49.1829, longitude: -0.3707, population: 110000 },
  { nom: "Nancy", latitude: 48.6921, longitude: 6.1844, population: 110000 },
  { nom: "Saint-Denis", latitude: 48.9362, longitude: 2.3574, population: 110000 },
  { nom: "Argenteuil", latitude: 48.9479, longitude: 2.2474, population: 110000 },
  { nom: "Montreuil", latitude: 48.8638, longitude: 2.4485, population: 110000 },
  { nom: "Roubaix", latitude: 50.6927, longitude: 3.1762, population: 100000 },
  { nom: "Tourcoing", latitude: 50.7239, longitude: 3.1612, population: 100000 },
  { nom: "Nanterre", latitude: 48.8924, longitude: 2.2158, population: 100000 },
  { nom: "Avignon", latitude: 43.9493, longitude: 4.8055, population: 100000 },
  { nom: "Créteil", latitude: 48.7904, longitude: 2.4597, population: 100000 },
  { nom: "Dunkerque", latitude: 51.0344, longitude: 2.3768, population: 100000 },
  { nom: "Poitiers", latitude: 46.5802, longitude: 0.3404, population: 100000 },
  { nom: "Asnières-sur-Seine", latitude: 48.9102, longitude: 2.2848, population: 100000 },
  { nom: "Versailles", latitude: 48.8014, longitude: 2.1301, population: 100000 },
  { nom: "Courbevoie", latitude: 48.8968, longitude: 2.2568, population: 100000 },
  
  // Villes moyennes importantes (50k-100k habitants)
  { nom: "Vitry-sur-Seine", latitude: 48.7872, longitude: 2.3931, population: 95000 },
  { nom: "Colombes", latitude: 48.9228, longitude: 2.2529, population: 95000 },
  { nom: "Aulnay-sous-Bois", latitude: 48.9362, longitude: 2.4939, population: 95000 },
  { nom: "Rueil-Malmaison", latitude: 48.8765, longitude: 2.1897, population: 95000 },
  { nom: "Saint-Pierre", latitude: -21.3393, longitude: 55.4781, population: 95000 },
  { nom: "Antibes", latitude: 43.5804, longitude: 7.1251, population: 95000 },
  { nom: "Saint-Maur-des-Fossés", latitude: 48.7939, longitude: 2.4939, population: 95000 },
  { nom: "Champigny-sur-Marne", latitude: 48.8172, longitude: 2.5158, population: 95000 },
  { nom: "Aubervilliers", latitude: 48.9136, longitude: 2.3831, population: 95000 },
  { nom: "Béziers", latitude: 43.3475, longitude: 3.2150, population: 95000 },
  { nom: "Le Tampon", latitude: -21.2833, longitude: 55.5167, population: 95000 },
  { nom: "La Rochelle", latitude: 46.1603, longitude: -1.1511, population: 95000 },
  { nom: "Bourges", latitude: 47.0810, longitude: 2.3988, population: 95000 },
  { nom: "Cannes", latitude: 43.5528, longitude: 7.0174, population: 95000 },
  { nom: "Saint-Nazaire", latitude: 47.2736, longitude: -2.2139, population: 95000 },
  { nom: "Colmar", latitude: 48.0794, longitude: 7.3586, population: 95000 },
  { nom: "Drancy", latitude: 48.9248, longitude: 2.4453, population: 95000 },
  { nom: "Mérignac", latitude: 44.8386, longitude: -0.6331, population: 95000 },
  { nom: "Saint-André", latitude: -20.9639, longitude: 55.6519, population: 95000 },
  { nom: "Issy-les-Moulineaux", latitude: 48.8219, longitude: 2.2701, population: 95000 },
  { nom: "Noisy-le-Grand", latitude: 48.8439, longitude: 2.5531, population: 95000 },
  { nom: "Évry", latitude: 48.6300, longitude: 2.4300, population: 95000 },
  { nom: "Cergy", latitude: 49.0364, longitude: 2.0769, population: 95000 },
  { nom: "Pessac", latitude: 44.8056, longitude: -0.6306, population: 95000 },
  { nom: "Vénissieux", latitude: 45.6969, longitude: 4.8881, population: 95000 },
  { nom: "Clichy", latitude: 48.9042, longitude: 2.3064, population: 95000 },
  { nom: "Ivry-sur-Seine", latitude: 48.8147, longitude: 2.3847, population: 95000 },
  { nom: "Levallois-Perret", latitude: 48.8947, longitude: 2.2883, population: 95000 },
  { nom: "Villeurbanne", latitude: 45.7669, longitude: 4.8797, population: 95000 },
  { nom: "Hyères", latitude: 43.1203, longitude: 6.1286, population: 95000 },
  { nom: "Sète", latitude: 43.4036, longitude: 3.6967, population: 95000 },
  { nom: "Chambéry", latitude: 45.5667, longitude: 5.9167, population: 95000 },
  { nom: "Lorient", latitude: 47.7474, longitude: -3.3667, population: 95000 },
  { nom: "Beauvais", latitude: 49.4331, longitude: 2.0831, population: 95000 },
  { nom: "Maisons-Alfort", latitude: 48.8047, longitude: 2.4381, population: 95000 },
  { nom: "Épinay-sur-Seine", latitude: 48.9533, longitude: 2.3158, population: 95000 },
  { nom: "Chelles", latitude: 48.8764, longitude: 2.5869, population: 95000 },
  { nom: "Pantin", latitude: 48.8947, longitude: 2.4081, population: 95000 },
  { nom: "Bondy", latitude: 48.9019, longitude: 2.4831, population: 95000 },
  { nom: "Bobigny", latitude: 48.9097, longitude: 2.4397, population: 95000 },
  { nom: "Corbeil-Essonnes", latitude: 48.6111, longitude: 2.4875, population: 95000 },
  { nom: "Sevran", latitude: 48.9369, longitude: 2.5306, population: 95000 },
  { nom: "Crépy-en-Valois", latitude: 49.2333, longitude: 2.8833, population: 95000 },
  { nom: "Montrouge", latitude: 48.8181, longitude: 2.3181, population: 95000 },
  { nom: "Sarcelles", latitude: 49.0019, longitude: 2.3781, population: 95000 },
  { nom: "Gennevilliers", latitude: 48.9331, longitude: 2.2931, population: 95000 },
  { nom: "Les Lilas", latitude: 48.8800, longitude: 2.4181, population: 95000 },
  { nom: "Neuilly-sur-Marne", latitude: 48.8539, longitude: 2.5306, population: 95000 },
  { nom: "Rosny-sous-Bois", latitude: 48.8719, longitude: 2.4831, population: 95000 },
  { nom: "Saint-Ouen", latitude: 48.9119, longitude: 2.3331, population: 95000 },
  { nom: "Tremblay-en-France", latitude: 48.9569, longitude: 2.5681, population: 95000 },
  { nom: "Villepinte", latitude: 48.9569, longitude: 2.5331, population: 95000 },
  { nom: "Le Blanc-Mesnil", latitude: 48.9381, longitude: 2.4619, population: 95000 },
  { nom: "Gagny", latitude: 48.8831, longitude: 2.5331, population: 95000 },
  { nom: "Livry-Gargan", latitude: 48.9181, longitude: 2.5419, population: 95000 },
  { nom: "Écouen", latitude: 49.0181, longitude: 2.3781, population: 95000 },
  { nom: "Montfermeil", latitude: 48.9019, longitude: 2.5681, population: 95000 },
  { nom: "Noisy-le-Sec", latitude: 48.8919, longitude: 2.4531, population: 95000 },
  { nom: "Pantin", latitude: 48.8947, longitude: 2.4081, population: 95000 },
  { nom: "Romainville", latitude: 48.8819, longitude: 2.4331, population: 95000 },
  { nom: "Vaujours", latitude: 48.9331, longitude: 2.5681, population: 95000 },
  { nom: "Clichy-sous-Bois", latitude: 48.9081, longitude: 2.5531, population: 95000 },
  { nom: "Le Raincy", latitude: 48.9019, longitude: 2.5231, population: 95000 },
  { nom: "Les Pavillons-sous-Bois", latitude: 48.9069, longitude: 2.5081, population: 95000 },
  { nom: "Neuilly-Plaisance", latitude: 48.8619, longitude: 2.5081, population: 95000 },
  { nom: "Neuilly-sur-Marne", latitude: 48.8539, longitude: 2.5306, population: 95000 },
  { nom: "Noisy-le-Grand", latitude: 48.8439, longitude: 2.5531, population: 95000 },
  { nom: "Noisy-le-Sec", latitude: 48.8919, longitude: 2.4531, population: 95000 },
  { nom: "Romainville", latitude: 48.8819, longitude: 2.4331, population: 95000 },
  { nom: "Rosny-sous-Bois", latitude: 48.8719, longitude: 2.4831, population: 95000 },
  { nom: "Villemomble", latitude: 48.8831, longitude: 2.5081, population: 95000 },
  { nom: "Bagnolet", latitude: 48.8681, longitude: 2.4181, population: 95000 },
  { nom: "Les Lilas", latitude: 48.8800, longitude: 2.4181, population: 95000 },
  { nom: "Montreuil", latitude: 48.8638, longitude: 2.4485, population: 110000 },
  { nom: "Pré-Saint-Gervais", latitude: 48.8819, longitude: 2.4031, population: 95000 },
  { nom: "Saint-Mandé", latitude: 48.8419, longitude: 2.4181, population: 95000 },
  { nom: "Vincennes", latitude: 48.8469, longitude: 2.4381, population: 95000 },
  
  // Villes moyennes (20k-50k habitants)
  { nom: "Calais", latitude: 50.9483, longitude: 1.8583, population: 72000 },
  { nom: "Saint-Quentin", latitude: 49.8469, longitude: 3.2869, population: 56000 },
  { nom: "Belfort", latitude: 47.6381, longitude: 6.8619, population: 49000 },
  { nom: "Évreux", latitude: 49.0272, longitude: 1.1514, population: 47000 },
  { nom: "Châlons-en-Champagne", latitude: 48.9561, longitude: 4.3644, population: 45000 },
  { nom: "Charleville-Mézières", latitude: 49.7731, longitude: 4.7153, population: 48000 },
  { nom: "La Rochelle", latitude: 46.1603, longitude: -1.1511, population: 76000 },
  { nom: "Angoulême", latitude: 45.6500, longitude: 0.1500, population: 42000 },
  { nom: "Niort", latitude: 46.3231, longitude: -0.4589, population: 59000 },
  { nom: "Laon", latitude: 49.5642, longitude: 3.6242, population: 26000 },
  { nom: "Arras", latitude: 50.2931, longitude: 2.7819, population: 42000 },
  { nom: "Boulogne-sur-Mer", latitude: 50.7261, longitude: 1.6139, population: 42000 },
  { nom: "Saint-Omer", latitude: 50.7489, longitude: 2.2572, population: 15000 },
  { nom: "Lens", latitude: 50.4289, longitude: 2.8319, population: 32000 },
  { nom: "Valenciennes", latitude: 50.3578, longitude: 3.5231, population: 43000 },
  { nom: "Douai", latitude: 50.3703, longitude: 3.0778, population: 40000 },
  { nom: "Cambrai", latitude: 50.1739, longitude: 3.2344, population: 33000 },
  { nom: "Maubeuge", latitude: 50.2781, longitude: 3.9731, population: 30000 },
  { nom: "Avesnes-sur-Helpe", latitude: 50.1250, longitude: 3.9289, population: 5000 },
  { nom: "Hazebrouck", latitude: 50.7239, longitude: 2.5381, population: 22000 },
  { nom: "Dunkerque", latitude: 51.0344, longitude: 2.3768, population: 87000 },
  { nom: "Calais", latitude: 50.9483, longitude: 1.8583, population: 72000 },
  { nom: "Boulogne-sur-Mer", latitude: 50.7261, longitude: 1.6139, population: 42000 },
  { nom: "Saint-Omer", latitude: 50.7489, longitude: 2.2572, population: 15000 },
  { nom: "Arras", latitude: 50.2931, longitude: 2.7819, population: 42000 },
  { nom: "Lens", latitude: 50.4289, longitude: 2.8319, population: 32000 },
  { nom: "Béthune", latitude: 50.5294, longitude: 2.6411, population: 25000 },
  { nom: "Armentières", latitude: 50.6856, longitude: 2.8819, population: 25000 },
  { nom: "Villeneuve-d'Ascq", latitude: 50.6225, longitude: 3.1431, population: 62000 },
  { nom: "Wattrelos", latitude: 50.7019, longitude: 3.2150, population: 42000 },
  { nom: "Marcq-en-Barœul", latitude: 50.6700, longitude: 3.0981, population: 39000 },
  { nom: "Wasquehal", latitude: 50.6681, longitude: 3.1331, population: 21000 },
  { nom: "Croix", latitude: 50.6781, longitude: 3.1481, population: 21000 },
  { nom: "Hem", latitude: 50.6550, longitude: 3.1869, population: 19000 },
  { nom: "Seclin", latitude: 50.5481, longitude: 3.0269, population: 12000 },
  { nom: "Loos", latitude: 50.6119, longitude: 3.0150, population: 22000 },
  { nom: "La Madeleine", latitude: 50.6569, longitude: 3.0706, population: 22000 },
  { nom: "Lambersart", latitude: 50.6519, longitude: 3.0231, population: 28000 },
  { nom: "Lomme", latitude: 50.6431, longitude: 2.9869, population: 27000 },
  { nom: "Mons-en-Barœul", latitude: 50.6400, longitude: 3.1100, population: 22000 },
  { nom: "Roncq", latitude: 50.7519, longitude: 3.1219, population: 13000 },
  { nom: "Templemars", latitude: 50.5731, longitude: 3.0531, population: 3400 },
  { nom: "Faches-Thumesnil", latitude: 50.5950, longitude: 3.0731, population: 17000 },
  { nom: "Lezennes", latitude: 50.6150, longitude: 3.1131, population: 3100 },
  { nom: "Haubourdin", latitude: 50.6081, longitude: 2.9900, population: 15000 },
  { nom: "Houplines", latitude: 50.6931, longitude: 2.9131, population: 7500 },
  { nom: "Ennetières-en-Weppes", latitude: 50.6350, longitude: 2.9400, population: 1200 },
  { nom: "Pérenchies", latitude: 50.6700, longitude: 2.9700, population: 8500 },
  { nom: "Prémesques", latitude: 50.6550, longitude: 2.9500, population: 2000 },
  { nom: "Capinghem", latitude: 50.6450, longitude: 2.9600, population: 2400 },
  { nom: "Escobecques", latitude: 50.6200, longitude: 2.9300, population: 3100 },
  { nom: "Englos", latitude: 50.6300, longitude: 2.9700, population: 600 },
  { nom: "Ennetières-en-Weppes", latitude: 50.6350, longitude: 2.9400, population: 1200 },
  { nom: "Erquinghem-le-Sec", latitude: 50.6100, longitude: 2.9300, population: 600 },
  { nom: "Erquinghem-Lys", latitude: 50.6750, longitude: 2.8450, population: 5000 },
  { nom: "Escobecques", latitude: 50.6200, longitude: 2.9300, population: 3100 },
  { nom: "Esquermes", latitude: 50.6350, longitude: 3.0431, population: 5000 },
  { nom: "Faches-Thumesnil", latitude: 50.5950, longitude: 3.0731, population: 17000 },
  { nom: "Faumont", latitude: 50.4600, longitude: 3.1369, population: 2100 },
  { nom: "Forest-sur-Marque", latitude: 50.6331, longitude: 3.1900, population: 1600 },
  { nom: "Fournes-en-Weppes", latitude: 50.5850, longitude: 2.8900, population: 2200 },
  { nom: "Frelinghien", latitude: 50.7081, longitude: 2.9331, population: 2500 },
  { nom: "Fretin", latitude: 50.5581, longitude: 3.1381, population: 3300 },
  { nom: "Fromelles", latitude: 50.6050, longitude: 2.8569, population: 900 },
  { nom: "Gondecourt", latitude: 50.5450, longitude: 2.9831, population: 4000 },
  { nom: "Gruson", latitude: 50.5950, longitude: 3.2081, population: 1200 },
  { nom: "Hallennes-lez-Haubourdin", latitude: 50.6181, longitude: 2.9669, population: 4400 },
  { nom: "Hantay", latitude: 50.5281, longitude: 2.8731, population: 1300 },
  { nom: "Hasnon", latitude: 50.4250, longitude: 3.3869, population: 3700 },
  { nom: "Haspres", latitude: 50.2581, longitude: 3.4169, population: 2700 },
  { nom: "Haubourdin", latitude: 50.6081, longitude: 2.9900, population: 15000 },
  { nom: "Haucourt-en-Cambrésis", latitude: 50.1081, longitude: 3.3469, population: 200 },
  { nom: "Haveluy", latitude: 50.3481, longitude: 3.4069, population: 3300 },
  { nom: "Haynecourt", latitude: 50.2181, longitude: 3.1569, population: 600 },
  { nom: "Hazebrouck", latitude: 50.7239, longitude: 2.5381, population: 22000 },
  { nom: "Hélesmes", latitude: 50.3681, longitude: 3.3569, population: 1900 },
  { nom: "Hem", latitude: 50.6550, longitude: 3.1869, population: 19000 },
  { nom: "Hergnies", latitude: 50.4750, longitude: 3.5269, population: 4400 },
  { nom: "Hérin", latitude: 50.3581, longitude: 3.4531, population: 4100 },
  { nom: "Herlies", latitude: 50.5781, longitude: 2.8531, population: 2300 },
  { nom: "Herrin", latitude: 50.5481, longitude: 3.0031, population: 400 },
  { nom: "Herseaux", latitude: 50.6981, longitude: 3.2381, population: 13000 },
  { nom: "Hordain", latitude: 50.2681, longitude: 3.3169, population: 1300 },
  { nom: "Hornaing", latitude: 50.3681, longitude: 3.3369, population: 3600 },
  { nom: "Houdain-lez-Bavay", latitude: 50.3181, longitude: 3.9469, population: 900 },
  { nom: "Houplin-Ancoisne", latitude: 50.5631, longitude: 2.9831, population: 3300 },
  { nom: "Houplines", latitude: 50.6931, longitude: 2.9131, population: 7500 },
  { nom: "Houtkerque", latitude: 50.8050, longitude: 2.5950, population: 1000 },
  { nom: "Hoymille", latitude: 50.9750, longitude: 2.4450, population: 3300 },
  { nom: "Illies", latitude: 50.5581, longitude: 2.8269, population: 1600 },
  { nom: "Inchy", latitude: 50.1281, longitude: 3.4669, population: 700 },
  { nom: "Iwuy", latitude: 50.2331, longitude: 3.3200, population: 3300 },
  { nom: "Jenlain", latitude: 50.3150, longitude: 3.6281, population: 1100 },
  { nom: "Jezainville", latitude: 48.8581, longitude: 5.9769, population: 400 },
  { nom: "Jœuf", latitude: 49.2281, longitude: 6.0081, population: 6700 },
  { nom: "Joncret", latitude: 50.2650, longitude: 3.2681, population: 600 },
  { nom: "Jumelles", latitude: 50.2050, longitude: 3.4731, population: 700 },
  { nom: "Killem", latitude: 50.9581, longitude: 2.5600, population: 1200 },
  { nom: "Lallaing", latitude: 50.3881, longitude: 3.1681, population: 6400 },
  { nom: "Lambersart", latitude: 50.6519, longitude: 3.0231, population: 28000 },
  { nom: "Lambres-lez-Douai", latitude: 50.3550, longitude: 3.0669, population: 4900 },
  { nom: "Landas", latitude: 50.4750, longitude: 3.3031, population: 900 },
  { nom: "Landrecies", latitude: 50.1250, longitude: 3.6931, population: 3400 },
  { nom: "Lannoy", latitude: 50.6669, longitude: 3.2100, population: 1800 },
  { nom: "Larouillies", latitude: 50.1750, longitude: 3.9769, population: 200 },
  { nom: "Lauwin-Planque", latitude: 50.3881, longitude: 3.0469, population: 1700 },
  { nom: "Lecelles", latitude: 50.4750, longitude: 3.4069, population: 2800 },
  { nom: "Lécluse", latitude: 50.2750, longitude: 3.0400, population: 1500 },
  { nom: "Lederzeele", latitude: 50.8219, longitude: 2.3019, population: 600 },
  { nom: "Ledringhem", latitude: 50.8581, longitude: 2.4419, population: 600 },
  { nom: "Leers", latitude: 50.6819, longitude: 3.2469, population: 9500 },
  { nom: "Leffrinckoucke", latitude: 51.0350, longitude: 2.4650, population: 4300 },
  { nom: "Lesdain", latitude: 50.0981, longitude: 3.2681, population: 400 },
  { nom: "Lezennes", latitude: 50.6150, longitude: 3.1131, population: 3100 },
  { nom: "Liancourt-Fosse", latitude: 50.0250, longitude: 3.0619, population: 200 },
  { nom: "Lieu-Saint-Amand", latitude: 50.2750, longitude: 3.3469, population: 1400 },
  { nom: "Ligny-en-Cambrésis", latitude: 50.0981, longitude: 3.3781, population: 1800 },
  { nom: "Lille", latitude: 50.6292, longitude: 3.0573, population: 230000 },
  { nom: "Limont-Fontaine", latitude: 50.2150, longitude: 3.9169, population: 600 },
  { nom: "Linselles", latitude: 50.7381, longitude: 3.0769, population: 8200 },
  { nom: "Locquignol", latitude: 50.2150, longitude: 3.7169, population: 300 },
  { nom: "Loffre", latitude: 50.3581, longitude: 3.1669, population: 700 },
  { nom: "Lompret", latitude: 50.6681, longitude: 3.0031, population: 2200 },
  { nom: "La Longueville", latitude: 50.2881, longitude: 3.8569, population: 2100 },
  { nom: "Looberghe", latitude: 50.9150, longitude: 2.2781, population: 1100 },
  { nom: "Loon-Plage", latitude: 50.9950, longitude: 2.2150, population: 6200 },
  { nom: "Loos", latitude: 50.6119, longitude: 3.0150, population: 22000 },
  { nom: "Lourches", latitude: 50.3150, longitude: 3.3569, population: 3900 },
  { nom: "Louvignies-Quesnoy", latitude: 50.1750, longitude: 3.6419, population: 900 },
  { nom: "Louvil", latitude: 50.5550, longitude: 3.1969, population: 800 },
  { nom: "Louvroil", latitude: 50.2650, longitude: 3.9569, population: 6700 },
  { nom: "Lynde", latitude: 50.6550, longitude: 2.4181, population: 800 },
  { nom: "Lys-lez-Lannoy", latitude: 50.6681, longitude: 3.2100, population: 13000 }
];

// Fonction de calcul de distance entre deux points (formule de Haversine)
function calculerDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Fonction de recherche de ville
function trouverVille(nomVille: string): Ville | null {
  const ville = VILLES_FRANCAISES.find(v => 
    v.nom.toLowerCase().includes(nomVille.toLowerCase()) ||
    nomVille.toLowerCase().includes(v.nom.toLowerCase())
  );
  return ville || null;
}

// Fonction de calcul de distance intelligente
function calculerDistanceIntelligente(villeDepart: string, villeArrivee: string): number {
  const ville1 = trouverVille(villeDepart);
  const ville2 = trouverVille(villeArrivee);
  
  if (ville1 && ville2) {
    return calculerDistance(ville1.latitude, ville1.longitude, ville2.latitude, ville2.longitude);
  }
  
  // Estimation basée sur la taille des villes si non trouvées
  const pop1 = ville1?.population || 50000;
  const pop2 = ville2?.population || 50000;
  const facteurDistance = Math.log(Math.max(pop1, pop2) / 10000) * 50;
  
  return Math.max(50, Math.min(800, facteurDistance));
}

// Fonction de calcul des tarifs selon la distance
function calculerTarifs(distance: number) {
  if (distance < 100) {
    return { eco: 35, standard: 40, premium: 65 };
  } else if (distance <= 500) {
    return { eco: 60, standard: 95, premium: 130 };
  } else {
    return { eco: 110, standard: 140, premium: 160 };
  }
}

// Fonction de formatage des prix
function formaterPrix(prix: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(prix);
}

export default function EstimationRapide() {
  const [logement, setLogement] = useState<LogementType>('t3');
  const [villeDepart, setVilleDepart] = useState('');
  const [villeArrivee, setVilleArrivee] = useState('');
  const [suggestionsDepart, setSuggestionsDepart] = useState<string[]>([]);
  const [suggestionsArrivee, setSuggestionsArrivee] = useState<string[]>([]);
  const [showSuggestionsDepart, setShowSuggestionsDepart] = useState(false);
  const [showSuggestionsArrivee, setShowSuggestionsArrivee] = useState(false);

  // Calcul des résultats
  const resultats = useMemo((): CalculResult | null => {
    if (!villeDepart.trim() || !villeArrivee.trim()) return null;

    const configLogement = LOGEMENTS[logement];
    const distance = calculerDistanceIntelligente(villeDepart, villeArrivee);
    const tarifs = calculerTarifs(distance);
    
    const prixEco = configLogement.volume * tarifs.eco;
    const prixStandard = configLogement.volume * tarifs.standard;
    const prixPremium = configLogement.volume * tarifs.premium;

    return {
      volume: configLogement.volume,
      distance: Math.round(distance),
      tarifEco: tarifs.eco,
      tarifStandard: tarifs.standard,
      tarifPremium: tarifs.premium,
      prixEco: {
        min: Math.round(prixEco * 0.9),
        max: Math.round(prixEco * 1.25)
      },
      prixStandard: {
        min: Math.round(prixStandard * 0.9),
        max: Math.round(prixStandard * 1.25)
      },
      prixPremium: {
        min: Math.round(prixPremium * 0.9),
        max: Math.round(prixPremium * 1.25)
      }
    };
  }, [logement, villeDepart, villeArrivee]);

  // Gestion des suggestions de villes
  useEffect(() => {
    if (villeDepart.length > 1) {
      const suggestions = VILLES_FRANCAISES
        .filter(v => v.nom.toLowerCase().includes(villeDepart.toLowerCase()))
        .map(v => v.nom)
        .slice(0, 5);
      setSuggestionsDepart(suggestions);
      setShowSuggestionsDepart(true);
    } else {
      setSuggestionsDepart([]);
      setShowSuggestionsDepart(false);
    }
  }, [villeDepart]);

  useEffect(() => {
    if (villeArrivee.length > 1) {
      const suggestions = VILLES_FRANCAISES
        .filter(v => v.nom.toLowerCase().includes(villeArrivee.toLowerCase()))
        .map(v => v.nom)
        .slice(0, 5);
      setSuggestionsArrivee(suggestions);
      setShowSuggestionsArrivee(true);
    } else {
      setSuggestionsArrivee([]);
      setShowSuggestionsArrivee(false);
    }
  }, [villeArrivee]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary via-brand-primary to-brand-accent py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Estimation rapide", href: "/estimation-rapide/" }
          ]}
        />
        {/* Header */}
        <div className="text-center mb-12 mt-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Estimation Rapide de Coût de Déménagement
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Obtenez une estimation instantanée des fourchettes de prix pour votre déménagement
          </p>
        </div>

        {/* Formulaire horizontal sur desktop */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Vos informations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Type de logement */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Type de logement
              </label>
              <select
                value={logement}
                onChange={(e) => setLogement(e.target.value as LogementType)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-brand-soft focus:border-transparent"
              >
                {Object.entries(LOGEMENTS).map(([key, config]) => (
                  <option key={key} value={key} className="bg-gray-800 text-white">
                    {config.label} ({config.surface}m²)
                  </option>
                ))}
              </select>
            </div>

            {/* Ville de départ */}
            <div className="relative">
              <label className="block text-sm font-medium text-white/90 mb-2">
                Ville de départ
              </label>
              <input
                type="text"
                value={villeDepart}
                onChange={(e) => setVilleDepart(e.target.value)}
                onFocus={() => setShowSuggestionsDepart(true)}
                onBlur={() => setTimeout(() => setShowSuggestionsDepart(false), 200)}
                placeholder="Ex: nice"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-brand-soft focus:border-transparent"
              />
              {showSuggestionsDepart && suggestionsDepart.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-white/20 z-10">
                  {suggestionsDepart.map((ville, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setVilleDepart(ville);
                        setShowSuggestionsDepart(false);
                      }}
                      className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 first:rounded-t-xl last:rounded-b-xl"
                    >
                      {ville}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Ville d'arrivée */}
            <div className="relative">
              <label className="block text-sm font-medium text-white/90 mb-2">
                Ville d'arrivée
              </label>
              <input
                type="text"
                value={villeArrivee}
                onChange={(e) => setVilleArrivee(e.target.value)}
                onFocus={() => setShowSuggestionsArrivee(true)}
                onBlur={() => setTimeout(() => setShowSuggestionsArrivee(false), 200)}
                placeholder="Ex: Paris"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-brand-soft focus:border-transparent"
              />
              {showSuggestionsArrivee && suggestionsArrivee.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-white/20 z-10">
                  {suggestionsArrivee.map((ville, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setVilleArrivee(ville);
                        setShowSuggestionsArrivee(false);
                      }}
                      className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 first:rounded-t-xl last:rounded-b-xl"
                    >
                      {ville}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Résultats avec le même format que la page services */}
        {resultats ? (
          <div className="space-y-8">
            {/* Détails du calcul */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">Détails du calcul</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <span className="text-white/70 block">Volume</span>
                  <span className="text-white font-medium text-lg">{resultats.volume}m³</span>
                </div>
                <div className="text-center">
                  <span className="text-white/70 block">Distance</span>
                  <span className="text-white font-medium text-lg">{resultats.distance}km</span>
                </div>
                <div className="text-center">
                  <span className="text-white/70 block">Tarif Éco</span>
                  <span className="text-white font-medium text-lg">{resultats.tarifEco}€/m³</span>
                </div>
                <div className="text-center">
                  <span className="text-white/70 block">Tarif Standard</span>
                  <span className="text-white font-medium text-lg">{resultats.tarifStandard}€/m³</span>
                </div>
              </div>
            </div>

            {/* Cartes d'offres au format services */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Offre Économique */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">💰 Économique</span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2 mt-4">Déménagement Économique</h3>
                <p className="text-white/70 text-sm mb-6">Pour les budgets serrés</p>
                
                <div className="space-y-3 text-sm text-white/90 mb-6">
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Chargement, déchargement et transport
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Mobilier et cartons
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Assurance incluse
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Support téléphonique
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-lg font-medium text-green-400">
                    {formaterPrix(resultats.prixEco.min)}
                  </span>
                  <span className="text-3xl font-bold text-white">
                    {formaterPrix(Math.round((resultats.prixEco.min + resultats.prixEco.max) / 2))}
                  </span>
                  <span className="text-lg font-medium text-red-600">
                    {formaterPrix(resultats.prixEco.max)}
                  </span>
                </div>
                
                <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-xl transition-colors">
                  Découvrir cette formule
                </button>
              </div>

              {/* Offre Standard */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">⭐ Standard</span>
                </div>
                <div className="absolute -top-2 -right-2">
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium">Recommandé</span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2 mt-4">Déménagement Standard</h3>
                <p className="text-white/70 text-sm mb-6">Le plus populaire</p>
                
                <div className="space-y-3 text-sm text-white/90 mb-6">
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Chargement et déplacement des meubles
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Objets précieux et fragiles
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Montage et démontage mobilier
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Assurance renforcée
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Support prioritaire
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-lg font-medium text-green-400">
                    {formaterPrix(resultats.prixStandard.min)}
                  </span>
                  <span className="text-3xl font-bold text-white">
                    {formaterPrix(Math.round((resultats.prixStandard.min + resultats.prixStandard.max) / 2))}
                  </span>
                  <span className="text-lg font-medium text-red-600">
                    {formaterPrix(resultats.prixStandard.max)}
                  </span>
                </div>
                
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-xl transition-colors">
                  Découvrir cette formule
                </button>
              </div>

              {/* Offre Premium */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">👑 Premium</span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2 mt-4">Déménagement Premium</h3>
                <p className="text-white/70 text-sm mb-6">Service haut de gamme</p>
                
                <div className="space-y-3 text-sm text-white/90 mb-6">
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Transport et chargement des meubles
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    <strong>Objets fragiles</strong>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Emballage de vos biens
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Montage et démontage mobilier
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Assurance tous risques
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Support dédié 24/7
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-lg font-medium text-green-400">
                    {formaterPrix(resultats.prixPremium.min)}
                  </span>
                  <span className="text-3xl font-bold text-white">
                    {formaterPrix(Math.round((resultats.prixPremium.min + resultats.prixPremium.max) / 2))}
                  </span>
                  <span className="text-lg font-medium text-red-600">
                    {formaterPrix(resultats.prixPremium.max)}
                  </span>
                </div>
                
                <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-6 rounded-xl transition-colors">
                  Découvrir cette formule
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 text-center">
            <div className="text-white/60 text-lg">
              Remplissez les informations ci-dessus pour obtenir votre estimation
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-[#2b7a78] to-[#6bcfcf] rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Obtenir des devis précis et personnalisés
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Nos partenaires déménageurs nicenais vous proposent des devis gratuits et personnalisés 
            avec visite à domicile pour un prix ferme et définitif.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://movers-test.gslv.cloud/" 
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-white px-8 text-lg font-semibold text-[#2b7a78] shadow-xl hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition duration-300"
            >
              Demander mes devis gratuits
            </a>
            <div className="flex items-center space-x-2 text-white/80">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">100% gratuit • Sans engagement</span>
            </div>
          </div>
        </div>

        {/* Note explicative */}
        <div className="mt-12 text-center">
          <p className="text-white/70 text-sm max-w-4xl mx-auto">
            * Les prix indiqués sont des estimations basées sur le volume calculé et la distance. 
            Les fourchettes incluent une marge de ±25% pour tenir compte des variations de service. 
            Pour un devis précis, contactez nos partenaires déménageurs.
          </p>
        </div>
      </div>
    </div>
  );
}
