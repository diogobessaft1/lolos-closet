export function generateWhatsAppLink({
  phone = "5521972310968",
  customer,
  items,
  total,
  shipping,
  discount,
  coupon,
  paymentMethod
}) {
  const cleanPhone = phone.replace(/\D/g, "");
  
  let text = "✨ *NOVO PEDIDO - LÔLO'S CLOSET* ✨\n";
  text += "━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
  
  text += "👤 *DADOS DA CLIENTE:*\n";
  text += `• *Nome:* ${customer.name}\n`;
  text += `• *WhatsApp:* ${customer.phone}\n`;
  if (customer.cpf) text += `• *CPF:* ${customer.cpf}\n`;
  text += `• *Endereço:* ${customer.address}, ${customer.number} ${customer.complement ? '(' + customer.complement + ')' : ''}\n`;
  text += `• *Bairro:* ${customer.neighborhood} - ${customer.city}/${customer.state}\n`;
  text += `• *CEP:* ${customer.cep}\n\n`;
  
  text += "🛍️ *ITENS DO PEDIDO:*\n";
  items.forEach((item, index) => {
    text += `*${index + 1}. ${item.name}*\n`;
    text += `   ▫️ Cor: ${item.selectedColor}\n`;
    text += `   ▫️ Tamanho: ${item.selectedSize}\n`;
    text += `   ▫️ Quantidade: ${item.quantity}x\n`;
    text += `   ▫️ Preço: R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n\n`;
  });
  
  text += "━━━━━━━━━━━━━━━━━━━━━━━━\n";
  if (discount > 0) {
    text += `🏷️ *Cupom (${coupon}):* -R$ ${discount.toFixed(2).replace('.', ',')}\n`;
  }
  text += `📦 *Frete:* ${shipping.type} (R$ ${shipping.cost.toFixed(2).replace('.', ',')})\n`;
  text += `💰 *TOTAL A PAGAR: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
  
  text += `💳 *Forma de Pagamento Desejada:* ${paymentMethod === 'pix' ? 'Pix (Copia e Cola / QR Code)' : 'Cartão de Crédito / Combinar no WhatsApp'}\n\n`;
  text += "Olá! Gostaria de confirmar a disponibilidade e fechar esse pedido! 💕";

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
