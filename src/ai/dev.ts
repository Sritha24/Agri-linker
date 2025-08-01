import { config } from 'dotenv';
config();

import '@/ai/flows/produce-freshness-prediction.ts';
import '@/ai/flows/produce-price-prediction.ts';
import '@/ai/flows/generate-farmer-awareness-report.ts';
