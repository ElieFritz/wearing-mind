import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ProductsService {
  constructor(private readonly supabase: SupabaseService) {}

  async findAll(filters?: { category?: string; featured?: boolean; limit?: number }) {
    let query = this.supabase.getClient()
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.featured !== undefined) {
      query = query.eq('is_featured', filters.featured);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query;
    if (error) throw new Error(`Failed to fetch products: ${error.message}`);
    return data || [];
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase.getClient()
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Failed to fetch product: ${error.message}`);
    }
    return data;
  }

  async findBySlug(slug: string) {
    const { data, error } = await this.supabase.getClient()
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Failed to fetch product: ${error.message}`);
    }
    return data;
  }

  async create(createProductDto: any) {
    // Generate unique slug
    const baseSlug = this.generateSlug(createProductDto.name);
    let slug = baseSlug;
    let slugAttempt = 0;
    
    while (await this.slugExists(slug)) {
      slugAttempt++;
      slug = `${baseSlug}-${slugAttempt}`;
    }

    // Generate unique SKU if needed
    let sku = createProductDto.sku;
    let skuAttempt = 0;
    
    while (await this.skuExists(sku)) {
      skuAttempt++;
      sku = `${createProductDto.sku}-${skuAttempt}`;
    }

    const productData = {
      ...createProductDto,
      slug,
      sku,
      stock: createProductDto.stock || 0,
      is_new: createProductDto.is_new || false,
      is_featured: createProductDto.is_featured || false,
    };

    const { data, error } = await this.supabase.getClient()
      .from('products')
      .insert([productData])
      .select()
      .single();

    if (error) throw new Error(`Failed to create product: ${error.message}`);
    return data;
  }

  async update(id: string, updateProductDto: any) {
    const { data, error } = await this.supabase.getClient()
      .from('products')
      .update(updateProductDto)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update product: ${error.message}`);
    return data;
  }

  async remove(id: string) {
    const { error } = await this.supabase.getClient()
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete product: ${error.message}`);
  }

  async updateStock(id: string, quantity: number) {
    const product = await this.findOne(id);
    if (!product) throw new Error('Product not found');

    const newStock = product.stock + quantity;
    if (newStock < 0) throw new Error('Insufficient stock');

    return this.update(id, { stock: newStock });
  }

  async getFeatured(limit: number = 4) {
    return this.findAll({ featured: true, limit });
  }

  async getByCategory(category: string) {
    return this.findAll({ category });
  }

  async search(query: string) {
    const { data, error } = await this.supabase.getClient()
      .from('products')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,sku.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to search products: ${error.message}`);
    return data || [];
  }

  private async slugExists(slug: string): Promise<boolean> {
    const { data, error } = await this.supabase.getClient()
      .from('products')
      .select('id')
      .eq('slug', slug)
      .single();

    if (error && error.code === 'PGRST116') return false;
    return !!data;
  }

  private async skuExists(sku: string): Promise<boolean> {
    const { data, error } = await this.supabase.getClient()
      .from('products')
      .select('id')
      .eq('sku', sku)
      .single();

    if (error && error.code === 'PGRST116') return false;
    return !!data;
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}
