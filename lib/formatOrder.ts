import { CartItem, CustomerInfo, OrderPayload } from '@/types';

export const formatOrderJSON = (items: CartItem[], customer: CustomerInfo, total: number): OrderPayload => {
  return {
    cliente: customer,
    items: items.map((item) => ({
      id: item._id,
      nombre: item.name,
      precio: item.price,
      cantidad: item.quantity,
      subtotal: item.price * item.quantity,
    })),
    total,
    moneda: 'PEN',
    timestamp: new Date().toISOString(),
  };
};

export const formatWhatsAppMessage = (items: CartItem[], customer: CustomerInfo, total: number): string => {
  let message = `*PEDIDO - LUMINA*\n\n`;
  message += `*Cliente:* ${customer.nombre}\n`;
  message += `*Tel:* ${customer.telefono}\n`;
  if (customer.direccion) message += `*Dirección:* ${customer.direccion}\n`;
  message += `\n*PRODUCTOS: *\n`;

  items.forEach((item) => {
    const subtotal = (item.price * item.quantity).toFixed(2);
    message += `• ${item.name} x${item.quantity} - S/ ${item.price.toFixed(2)} => *S/ ${subtotal}*\n`;
  });

  message += `\n*TOTAL: S/ ${total.toFixed(2)}*\n`;
  if (customer.notas) message += `\n*Notas:* ${customer.notas}`;

  return encodeURIComponent(message);
};
