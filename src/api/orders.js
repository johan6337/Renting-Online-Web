import { request } from './client';

const normalizeTimelineEvent = (event = {}, index = 0) => ({
  title: event.title ?? event.status ?? `Step ${index + 1}`,
  date: event.date ?? event.timestamp ?? null,
  completed: Boolean(event.completed ?? event.is_completed ?? false),
  description: event.description ?? event.details ?? '',
});

const normalizeProduct = (order = {}) => {
  const unitPrice =
    typeof order.unitPrice === 'number'
      ? order.unitPrice
      : Number(order.subtotal ?? 0);

  return {
    productId: order.productId ?? order.product_id ?? null,
    productName: order.productName ?? order.product_name ?? '',
    productImage: order.productImage ?? order.product_image ?? null,
    productSize: order.productSize ?? order.product_size ?? null,
    productColor: order.productColor ?? order.product_color ?? null,
    rentalPeriod: order.rentalPeriod ?? order.rental_period ?? null,
    quantity: order.quantity ?? 1,
    unitPrice,
  };
};

const normalizeOrder = (order = {}) => {
  const timeline = Array.isArray(order.timeline)
    ? order.timeline.map((event, index) => normalizeTimelineEvent(event, index))
    : [];
  const product = normalizeProduct(order);

  return {
    id: order.id ?? order.order_id ?? null,
    orderId: order.orderId ?? order.order_number ?? order.id ?? '',
    orderNumber: order.orderNumber ?? order.order_number ?? order.orderId ?? '',
    placedDate: order.placedDate ?? order.placed_date ?? order.createdAt ?? order.created_at ?? '',
    status: order.status ?? 'Ordered',
    buyerName: order.buyerName ?? order.buyer_name ?? '',
    productId: product.productId,
    productName: product.productName,
    productImage: product.productImage,
    productSize: product.productSize,
    productColor: product.productColor,
    rentalPeriod: product.rentalPeriod,
    quantity: product.quantity,
    unitPrice: product.unitPrice,
    totalAmount:
      typeof order.totalAmount === 'number'
        ? order.totalAmount
        : Number(order.total_amount ?? order.subtotal ?? 0),
    subtotal:
      typeof order.subtotal === 'number'
        ? order.subtotal
        : Number(order.sub_total ?? order.subtotal ?? order.totalAmount ?? 0),
    tax: typeof order.tax === 'number' ? order.tax : Number(order.tax_amount ?? 0),
    shippingAddress: order.shippingAddress ?? order.shipping_address ?? null,
    timeline,
    receivingInfo: order.receivingInfo ?? order.receiveDetails ?? order.receive_details ?? order.receiving_details ?? null,
    returnInfo: order.returnInfo ?? order.returnDetails ?? order.return_details ?? null,
    createdAt: order.createdAt ?? order.created_at ?? null,
    updatedAt: order.updatedAt ?? order.updated_at ?? null,
  };
};

const unwrapList = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.orders)) return payload.orders;
  return [];
};

export const getOrders = async () => {
  const raw = await request('/orders');
  const collection = unwrapList(raw);
  return collection.map(normalizeOrder);
};

export const getOrderByNumber = async (orderId) => {
  if (!orderId) {
    throw new Error('orderId is required');
  }
  const raw = await request(`/orders/${encodeURIComponent(orderId)}`);
  const payload = raw?.data ?? raw?.order ?? raw;
  return normalizeOrder(payload);
};

export { normalizeOrder };
