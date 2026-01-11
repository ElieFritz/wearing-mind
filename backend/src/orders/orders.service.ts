import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly emailService: EmailService,
  ) {}

  async findAll(filters?: { status?: string; customer_id?: string; limit?: number }) {
    let query = this.supabase.getClient()
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.customer_id) {
      query = query.eq('customer_id', filters.customer_id);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query;
    if (error) throw new Error(`Failed to fetch orders: ${error.message}`);
    return data || [];
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase.getClient()
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Failed to fetch order: ${error.message}`);
    }
    return data;
  }

  async findByOrderNumber(orderNumber: string) {
    const { data, error } = await this.supabase.getClient()
      .from('orders')
      .select('*')
      .eq('order_number', orderNumber)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Failed to fetch order: ${error.message}`);
    }
    return data;
  }

  async create(createOrderDto: any) {
    // Generate order number
    const orderNumber = await this.generateOrderNumber();
    
    const orderData = {
      order_number: orderNumber,
      customer_id: createOrderDto.customer_id || null,
      customer_email: createOrderDto.customer_email,
      customer_name: createOrderDto.customer_name,
      status: createOrderDto.status || 'pending',
      subtotal: createOrderDto.subtotal,
      shipping_cost: createOrderDto.shipping_cost || 0,
      total: createOrderDto.total,
      items: createOrderDto.items,
      shipping_address: createOrderDto.shipping_address,
      payment_method: createOrderDto.payment_method || null,
      payment_status: createOrderDto.payment_status || 'pending',
      notes: createOrderDto.notes || null,
    };

    const { data, error } = await this.supabase.getClient()
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (error) throw new Error(`Failed to create order: ${error.message}`);

    // Send confirmation emails
    try {
      const emailData = {
        orderNumber: data.order_number,
        customerName: data.customer_name,
        customerEmail: data.customer_email,
        items: data.items || [],
        subtotal: data.subtotal,
        shippingCost: data.shipping_cost,
        total: data.total,
        shippingAddress: data.shipping_address,
      };

      // Send to customer
      await this.emailService.sendOrderConfirmationToCustomer(emailData);
      
      // Send to admin
      await this.emailService.sendOrderNotificationToAdmin(emailData);
    } catch (emailError) {
      console.error('Failed to send order emails:', emailError);
      // Don't fail the order creation if email fails
    }

    // Create order items
    if (createOrderDto.items && Array.isArray(createOrderDto.items)) {
      await this.createOrderItems(data.id, createOrderDto.items);
    }

    return data;
  }

  async update(id: string, updateOrderDto: any) {
    const { data, error } = await this.supabase.getClient()
      .from('orders')
      .update(updateOrderDto)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update order: ${error.message}`);
    return data;
  }

  async updateStatus(id: string, status: string) {
    const { data, error } = await this.supabase.getClient()
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update order status: ${error.message}`);
    return data;
  }

  async getByCustomer(customerId: string) {
    return this.findAll({ customer_id: customerId });
  }

  async getStats(startDate?: string, endDate?: string) {
    let query = this.supabase.getClient()
      .from('orders')
      .select('status, total, created_at');

    if (startDate) {
      query = query.gte('created_at', startDate);
    }

    if (endDate) {
      query = query.lte('created_at', endDate);
    }

    const { data, error } = await query;
    if (error) throw new Error(`Failed to fetch order stats: ${error.message}`);

    const stats = {
      total_orders: data.length,
      total_revenue: data.reduce((sum, order) => sum + parseFloat(order.total), 0),
      by_status: {
        pending: data.filter(o => o.status === 'pending').length,
        processing: data.filter(o => o.status === 'processing').length,
        completed: data.filter(o => o.status === 'completed').length,
        cancelled: data.filter(o => o.status === 'cancelled').length,
      },
      avg_order_value: data.length > 0 
        ? data.reduce((sum, order) => sum + parseFloat(order.total), 0) / data.length 
        : 0,
    };

    return stats;
  }

  private async generateOrderNumber(): Promise<string> {
    const { data, error } = await this.supabase.getClient()
      .rpc('generate_order_number');

    if (error || !data) {
      // Fallback si la fonction n'existe pas
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      return `WM-${timestamp}-${random}`;
    }

    return data;
  }

  private async createOrderItems(orderId: string, items: any[]) {
    const orderItems = items.map(item => ({
      order_id: orderId,
      product_id: item.product_id || null,
      product_name: item.product_name || item.name,
      product_sku: item.product_sku || item.sku,
      quantity: item.quantity,
      unit_price: item.unit_price || item.price,
      total_price: (item.unit_price || item.price) * item.quantity,
    }));

    const { error } = await this.supabase.getClient()
      .from('order_items')
      .insert(orderItems);

    if (error) throw new Error(`Failed to create order items: ${error.message}`);
  }
}
