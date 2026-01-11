import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService implements OnModuleInit {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      console.warn('Supabase URL or Key not found in environment variables');
      return;
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
    console.log('? Supabase client initialized with Storage support');
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  getStorage() {
    return this.supabase.storage;
  }
}
