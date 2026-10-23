/**
 * API Client for House Price Prediction
 * Centralized API calls with error handling, retries, and TypeScript types
 */

// ============================================================================
// Types matching FastAPI Pydantic models
// ============================================================================

export interface NumericRange {
  min: number;
  max: number;
  median: number;
}

export interface MetadataResponse {
  numeric_ranges: Record<string, NumericRange>;
  ocean_proximity_categories: string[];
  target: string;
  test_rmse: number | null;
  train_rows: number | null;
  test_rows: number | null;
}

export interface PredictRequest {
  longitude: number;
  latitude: number;
  housing_median_age: number;
  total_rooms: number;
  total_bedrooms: number;
  population: number;
  households: number;
  median_income: number;
  ocean_proximity: string;
}

export interface PredictResponse {
  predicted_price: number;
  lower_bound: number;
  upper_bound: number;
  confidence: number;
}

export interface HealthResponse {
  status: string;
  model_loaded: boolean;
  metadata_loaded: boolean;
}

// ============================================================================
// Error Classes
// ============================================================================

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = "APIError";
  }
}

export class ValidationError extends APIError {
  constructor(message: string, public fields: Record<string, string>) {
    super(message, 400, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}

export class NetworkError extends APIError {
  constructor(message: string) {
    super(message, 0, "NETWORK_ERROR");
    this.name = "NetworkError";
  }
}

// ============================================================================
// Configuration
// ============================================================================

const API_BASE = "/api";
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;
const REQUEST_TIMEOUT_MS = 30000;

// ============================================================================
// Helper Functions
// ============================================================================

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableStatus(status: number): boolean {
  return status === 0 || status >= 500 || status === 429;
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  retryCount = 0
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;

  try {
    const response = await fetchWithTimeout(url, options, REQUEST_TIMEOUT_MS);

    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      let errorCode = "UNKNOWN_ERROR";

      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.message || errorMessage;
        errorCode = errorData.code || errorCode;
      } catch {
        // Use default error message
      }

      // Handle validation errors specially
      if (response.status === 400 && errorCode === "VALIDATION_ERROR") {
        throw new ValidationError(errorMessage, {});
      }

      // Retry on retryable errors
      if (isRetryableStatus(response.status) && retryCount < MAX_RETRIES) {
        await sleep(RETRY_DELAY_MS * Math.pow(2, retryCount));
        return request<T>(endpoint, options, retryCount + 1);
      }

      throw new APIError(errorMessage, response.status, errorCode);
    }

    return response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }

    // Network error
    if (error instanceof TypeError && error.message.includes("fetch")) {
      if (retryCount < MAX_RETRIES) {
        await sleep(RETRY_DELAY_MS * Math.pow(2, retryCount));
        return request<T>(endpoint, options, retryCount + 1);
      }
      throw new NetworkError(
        "Unable to connect to the server. Please check your internet connection and try again."
      );
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new APIError("Request timed out", 408, "TIMEOUT");
    }

    throw new APIError(
      error instanceof Error ? error.message : "An unexpected error occurred",
      0,
      "UNKNOWN_ERROR"
    );
  }
}

// ============================================================================
// API Functions
// ============================================================================

/**
 * Fetch model metadata including feature ranges and categories
 */
export async function fetchMetadata(): Promise<MetadataResponse> {
  return request<MetadataResponse>("/metadata", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // Cache for 1 hour
    next: { revalidate: 3600 },
  });
}

/**
 * Predict house price based on property features
 */
export async function predictPrice(data: PredictRequest): Promise<PredictResponse> {
  return request<PredictResponse>("/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

/**
 * Health check endpoint
 */
export async function checkHealth(): Promise<HealthResponse> {
  return request<HealthResponse>("/health", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Format price as USD currency
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Get confidence color based on percentage
 */
export function getConfidenceColor(confidence: number): string {
  if (confidence >= 80) return "#18794E"; // emerald
  if (confidence >= 60) return "#EAB308"; // amber
  return "#EF4444"; // red
}

/**
 * Get confidence label
 */
export function getConfidenceLabel(confidence: number): string {
  if (confidence >= 80) return "High";
  if (confidence >= 60) return "Moderate";
  return "Low";
}

/**
 * Validate prediction request data
 */
export function validatePredictRequest(data: Partial<PredictRequest>): Record<string, string> {
  const errors: Record<string, string> = {};

  const requiredFields: (keyof PredictRequest)[] = [
    "longitude",
    "latitude",
    "housing_median_age",
    "total_rooms",
    "total_bedrooms",
    "population",
    "households",
    "median_income",
    "ocean_proximity",
  ];

  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null || data[field] === "") {
      errors[field] = `${formatFieldName(field)} is required`;
    }
  }

  // Validate ocean_proximity
  const validCategories = [
    "<1H OCEAN",
    "INLAND",
    "ISLAND",
    "NEAR BAY",
    "NEAR OCEAN",
  ];
  if (data.ocean_proximity && !validCategories.includes(data.ocean_proximity)) {
    errors.ocean_proximity = "Invalid ocean proximity value";
  }

  return errors;
}

function formatFieldName(field: string): string {
  return field
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace("Median Income", "Median Income (×$10k)");
}