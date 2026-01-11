import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class CustomersService {
  constructor(private readonly supabase: SupabaseService) {}

  async findAll(limit?: number) {
    let query = this.supabase.getClient()
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) throw new Error(`Failed to fetch customers: ${error.message}`);
    return data || [];
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase.getClient()
      .from('customers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Failed to fetch customer: ${error.message}`);
    }
    return data;
  }

  async findByEmail(email: string) {
    const { data, error } = await this.supabase.getClient()
      .from('customers')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Failed to fetch customer: ${error.message}`);
    }
    return data;
  }

  async create(createCustomerDto: any) {
    const { data, error } = await this.supabase.getClient()
      .from('customers')
      .insert([createCustomerDto])
      .select()
      .single();

    if (error) throw new Error(`Failed to create customer: ${error.message}`);
    return data;
  }

  async update(id: string, updateCustomerDto: any) {
    const { data, error } = await this.supabase.getClient()
      .from('customers')
      .update(updateCustomerDto)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update customer: ${error.message}`);
    return data;
  }

  async getOrders(customerId: string) {
    const { data, error } = await this.supabase.getClient()
      .from('orders')
      .select('*')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch customer orders: ${error.message}`);
    return data || [];
  }

  async getStats(customerId: string) {
    const orders = await this.getOrders(customerId);
    
    const stats = {
      total_orders: orders.length,
      total_spent: orders.reduce((sum, order) => sum + parseFloat(order.total), 0),
      avg_order_value: orders.length > 0 
        ? orders.reduce((sum, order) => sum + parseFloat(order.total), 0) / orders.length 
        : 0,
      last_order_date: orders.length > 0 ? orders[0].created_at : null,
    };

    return stats;
  }
}
