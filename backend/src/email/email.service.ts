import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

interface EmailData {
  to: string;
  subject: string;
  html: string;
}

interface OrderEmailData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: any[];
  subtotal: number;
  shippingCost: number;
  total: number;
  shippingAddress: any;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private resend: Resend;

  constructor() {
    // Initialize Resend with API key from environment
    const apiKey = process.env.RESEND_API_KEY;
    
    if (apiKey) {
      this.resend = new Resend(apiKey);
      this.logger.log('Resend email service initialized');
    } else {
      this.logger.warn('RESEND_API_KEY not found - emails will only be logged');
    }
  }

  async sendEmail(data: EmailData): Promise<void> {
    this.logger.log(`Sending email to ${data.to}: ${data.subject}`);
    
    // If Resend is configured, send real email
    if (this.resend) {
      try {
        const result = await this.resend.emails.send({
          from: process.env.EMAIL_FROM || 'WEARING MIND <noreply@wearingmind.com>',
          to: data.to,
          subject: data.subject,
          html: data.html,
        });

        this.logger.log(`Email sent successfully to ${data.to}`, result);
      } catch (error) {
        this.logger.error(`Failed to send email to ${data.to}:`, error);
        throw error;
      }
    } else {
      // Development mode: just log
      this.logger.debug(`[DEV MODE] Email content for ${data.to}:`);
      this.logger.debug(`Subject: ${data.subject}`);
      this.logger.debug(`HTML length: ${data.html.length} chars`);
    }
  }

  async sendOrderConfirmationToCustomer(orderData: OrderEmailData): Promise<void> {
    const html = this.generateCustomerOrderEmail(orderData);
    
    await this.sendEmail({
      to: orderData.customerEmail,
      subject: `Order Confirmation - ${orderData.orderNumber}`,
      html,
    });
  }

  async sendOrderNotificationToAdmin(orderData: OrderEmailData): Promise<void> {
    const html = this.generateAdminOrderEmail(orderData);
    
    await this.sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@wearingmind.com',
      subject: `New Order Received - ${orderData.orderNumber}`,
      html,
    });
  }

  private generateCustomerOrderEmail(data: OrderEmailData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6; 
            color: #333; 
            margin: 0;
            padding: 0;
            background-color: #f8f8fa;
          }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { 
            background: #1E2A5A; 
            color: white; 
            padding: 30px; 
            text-align: center; 
            border-radius: 8px 8px 0 0;
          }
          .header h1 { 
            margin: 0; 
            font-size: 28px; 
            text-transform: uppercase; 
            letter-spacing: 2px; 
            font-weight: 900;
          }
          .content { 
            padding: 30px; 
            background: white; 
            border-radius: 0 0 8px 8px;
          }
          .order-number { 
            background: #f8f8fa; 
            padding: 20px; 
            text-align: center; 
            margin: 20px 0; 
            border-radius: 8px; 
            border: 2px solid #1E2A5A;
          }
          .order-number strong { 
            font-size: 28px; 
            color: #1E2A5A; 
            font-weight: 900;
          }
          .items { 
            background: #f8f8fa; 
            padding: 20px; 
            margin: 20px 0; 
            border-radius: 8px; 
          }
          .item { 
            padding: 15px 0; 
            border-bottom: 1px solid #ddd; 
          }
          .item:last-child { border-bottom: none; }
          .totals { 
            background: #f8f8fa; 
            padding: 20px; 
            margin: 20px 0; 
            border-radius: 8px; 
          }
          .total-row { 
            display: flex; 
            justify-content: space-between; 
            padding: 8px 0; 
            font-size: 16px;
          }
          .total-row.final { 
            font-size: 24px; 
            font-weight: bold; 
            border-top: 2px solid #1E2A5A; 
            padding-top: 15px; 
            margin-top: 15px; 
            color: #1E2A5A;
          }
          .footer { 
            text-align: center; 
            padding: 20px; 
            color: #666; 
            font-size: 14px; 
          }
          .footer a { color: #1E2A5A; text-decoration: none; }
          .footer a:hover { text-decoration: underline; }
          @media only screen and (max-width: 600px) {
            .container { padding: 10px; }
            .header h1 { font-size: 24px; }
            .order-number strong { font-size: 24px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>WEARING MIND</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Thank you for your order!</p>
          </div>
          
          <div class="content">
            <p style="font-size: 16px; margin-top: 0;">Hi <strong>${data.customerName}</strong>,</p>
            <p style="font-size: 16px;">We have received your order and will send you a confirmation when it ships.</p>
            
            <div class="order-number">
              <p style="margin: 0 0 10px 0; color: #666; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Order Number</p>
              <strong>${data.orderNumber}</strong>
            </div>

            <div class="items">
              <h3 style="margin-top: 0; color: #1E2A5A;">Order Details</h3>
              ${data.items.map(item => `
                <div class="item">
                  <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div style="flex: 1;">
                      <strong style="font-size: 16px; color: #1E2A5A;">${item.product_name}</strong><br>
                      <small style="color: #666; font-size: 14px;">
                        ${item.size ? `Size: <strong>${item.size}</strong>` : ''} 
                        ${item.color ? ` • Color: <strong>${item.color}</strong>` : ''} 
                        • Quantity: <strong>${item.quantity}</strong>
                      </small>
                    </div>
                    <div style="text-align: right; white-space: nowrap; margin-left: 20px;">
                      <strong style="font-size: 18px; color: #1E2A5A;">EUR ${(item.unit_price * item.quantity).toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="totals">
              <div class="total-row">
                <span>Subtotal</span>
                <span><strong>EUR ${data.subtotal.toFixed(2)}</strong></span>
              </div>
              <div class="total-row">
                <span>Shipping</span>
                <span><strong>EUR ${data.shippingCost.toFixed(2)}</strong></span>
              </div>
              <div class="total-row final">
                <span>Total</span>
                <span>EUR ${data.total.toFixed(2)}</span>
              </div>
            </div>

            <div style="background: #f8f8fa; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #1E2A5A;">
              <h3 style="margin-top: 0; color: #1E2A5A;">Shipping Address</h3>
              <p style="margin: 5px 0; line-height: 1.8;">
                <strong>${data.shippingAddress.firstName} ${data.shippingAddress.lastName}</strong><br>
                ${data.shippingAddress.address}<br>
                ${data.shippingAddress.apartment ? `${data.shippingAddress.apartment}<br>` : ''}
                ${data.shippingAddress.postalCode} ${data.shippingAddress.city}<br>
                ${data.shippingAddress.country}<br>
                <strong>Phone:</strong> ${data.shippingAddress.phone}
              </p>
            </div>

            <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <p style="margin: 0; color: #2e7d32; font-weight: bold;">
                ?? Estimated Delivery: 3-5 business days
              </p>
            </div>
          </div>

          <div class="footer">
            <p>Need help? Contact us at <a href="mailto:support@wearingmind.com">support@wearingmind.com</a></p>
            <p style="font-size: 12px; color: #999; margin-top: 10px;">
              © ${new Date().getFullYear()} WEARING MIND. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private generateAdminOrderEmail(data: OrderEmailData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6; 
            color: #333; 
            margin: 0;
            padding: 0;
            background-color: #f8f8fa;
          }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { 
            background: #1E2A5A; 
            color: white; 
            padding: 20px; 
            border-radius: 8px 8px 0 0;
          }
          .alert { 
            background: #10b981; 
            color: white; 
            padding: 20px; 
            text-align: center; 
            font-weight: bold; 
            font-size: 20px;
          }
          .content { 
            padding: 20px; 
            background: white; 
            border-radius: 0 0 8px 8px;
          }
          .section { 
            background: #f8f8fa; 
            padding: 15px; 
            margin: 15px 0; 
            border-radius: 8px; 
            border-left: 4px solid #1E2A5A;
          }
          .item { 
            padding: 12px 0; 
            border-bottom: 1px solid #ddd; 
          }
          .item:last-child { border-bottom: none; }
          strong { color: #1E2A5A; }
          .button {
            display: inline-block;
            padding: 15px 30px;
            background: #1E2A5A;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin: 20px 0;
          }
          .button:hover {
            background: #3B4D80;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0; font-size: 24px;">NEW ORDER RECEIVED</h2>
          </div>
          
          <div class="alert">
            Order #${data.orderNumber}
          </div>

          <div class="content">
            <div class="section">
              <h3 style="margin-top: 0; color: #1E2A5A;">Customer Information</h3>
              <p style="margin: 5px 0; line-height: 1.8;">
                <strong>Name:</strong> ${data.customerName}<br>
                <strong>Email:</strong> <a href="mailto:${data.customerEmail}">${data.customerEmail}</a><br>
                <strong>Phone:</strong> <a href="tel:${data.shippingAddress.phone}">${data.shippingAddress.phone}</a>
              </p>
            </div>

            <div class="section">
              <h3 style="margin-top: 0; color: #1E2A5A;">Shipping Address</h3>
              <p style="margin: 5px 0; line-height: 1.8;">
                ${data.shippingAddress.address}<br>
                ${data.shippingAddress.apartment ? `${data.shippingAddress.apartment}<br>` : ''}
                ${data.shippingAddress.postalCode} ${data.shippingAddress.city}<br>
                ${data.shippingAddress.country}
              </p>
            </div>

            <div class="section">
              <h3 style="margin-top: 0; color: #1E2A5A;">Items Ordered</h3>
              ${data.items.map(item => `
                <div class="item">
                  <strong style="font-size: 16px;">${item.product_name}</strong><br>
                  <small style="color: #666;">
                    <strong>SKU:</strong> ${item.product_sku} • 
                    ${item.size ? `<strong>Size:</strong> ${item.size}` : ''} 
                    ${item.color ? ` • <strong>Color:</strong> ${item.color}` : ''} • 
                    <strong>Qty:</strong> ${item.quantity} • 
                    <strong>Price:</strong> EUR ${item.unit_price} each
                  </small>
                  <div style="text-align: right; font-weight: bold; margin-top: 5px; color: #1E2A5A;">
                    EUR ${(item.unit_price * item.quantity).toFixed(2)}
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="section">
              <div style="display: flex; justify-content: space-between; padding: 8px 0; font-size: 16px;">
                <span>Subtotal:</span>
                <span><strong>EUR ${data.subtotal.toFixed(2)}</strong></span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 8px 0; font-size: 16px;">
                <span>Shipping:</span>
                <span><strong>EUR ${data.shippingCost.toFixed(2)}</strong></span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 15px 0; font-size: 24px; font-weight: bold; border-top: 2px solid #1E2A5A; margin-top: 10px;">
                <span style="color: #1E2A5A;">Total:</span>
                <span style="color: #10b981;">EUR ${data.total.toFixed(2)}</span>
              </div>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin/orders" class="button">
                View in Admin Panel
              </a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}
