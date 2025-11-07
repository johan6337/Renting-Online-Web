const normalizeBase = (value = "") => {
  if (!value) return "";
  return value.endsWith("/") ? value.slice(0, -1) : value;
};

const API_BASE = normalizeBase(import.meta.env.VITE_API_URL || "");

const ensureApiPrefix = (path) => {
  if (!path || path.startsWith('/api')) {
    return path;
  }
  return path.startsWith('/')
    ? `/api${path}`
    : `/api/${path}`;
};

const withBase = (path) => {
  const normalizedPath = ensureApiPrefix(path || '/api');

  if (!API_BASE) {
    return normalizedPath;
  }

  const isAbsolute = /^https?:\/\//i.test(normalizedPath);
  if (isAbsolute) {
    return normalizedPath;
  }

  return `${API_BASE}${normalizedPath}`;
};

class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

const normalizeReview = (review = {}) => ({
  id: review.review_id ?? review.id ?? null,
  reviewerId: review.reviewer_id ?? review.reviewerId ?? null,
  productId: review.product_id ?? review.productId ?? null,
  productName: review.product_name ?? review.productName ?? null,
  orderNumber: review.order_number ?? review.orderNumber ?? null,
  satisfaction: review.satisfaction ?? "",
  satisfactionScore:
    typeof review.satisfaction_score === "number"
      ? review.satisfaction_score
      : review.satisfactionScore ?? null,
  experience: review.experience ?? {},
  highlights: review.highlights ?? "",
  improvements: review.improvements ?? "",
  photos: review.photos ?? [],
  photosCount:
    typeof review.photos_count === "number"
      ? review.photos_count
      : review.photosCount ?? review.photos?.length ?? 0,
  submittedAt: review.submitted_at ?? review.submittedAt ?? null,
  createdAt: review.created_at ?? review.createdAt ?? null,
  updatedAt: review.updated_at ?? review.updatedAt ?? null,
});

const request = async (path, { method = "GET", body, headers, ...rest } = {}) => {
  const response = await fetch(withBase(path), {
    method,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body,
    ...rest,
  });

  const text = await response.text();
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    const message =
      (data && (data.message || data.error)) ||
      `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status, data);
  }

  return data;
};

export const createReview = async (payload) => {
  const body = JSON.stringify(payload);
  const result = await request("/api/reviews", {
    method: "POST",
    body,
  });
  return normalizeReview(result?.data ?? result);
};

export const getReviewByOrder = async (orderNumber) => {
  if (!orderNumber) {
    throw new Error("orderNumber is required");
  }
  const result = await request(`/api/reviews/order/${encodeURIComponent(orderNumber)}`, {
    method: "GET",
  });
  return normalizeReview(result?.data ?? result);
};

export const getProductReviews = async (productId, { page = 1, limit = 10, sort = "latest" } = {}) => {
  if (!productId) {
    throw new Error("productId is required");
  }
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort,
  });
  const result = await request(`/api/reviews/product/${encodeURIComponent(productId)}?${params.toString()}`);
  const reviews = Array.isArray(result?.data) ? result.data.map(normalizeReview) : [];
  return {
    reviews,
    pagination: result?.pagination ?? null,
    stats: result?.stats ?? null,
  };
};

export const updateReview = async (reviewId, payload) => {
  if (!reviewId) {
    throw new Error("reviewId is required");
  }
  const body = JSON.stringify(payload);
  const result = await request(`/api/reviews/${reviewId}`, {
    method: "PUT",
    body,
  });
  return normalizeReview(result?.data ?? result);
};

export { ApiError, normalizeReview };
