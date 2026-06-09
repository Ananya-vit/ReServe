const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const refreshTokenCall = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });
  if (!response.ok) throw new Error('Refresh failed');
  const data = await response.json();
  localStorage.setItem('accessToken', data.accessToken);
  return data.accessToken;
};

const apiCall = async (method, endpoint, body = null) => {
  const makeRequest = async (token) => {
    const options = {
      method,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    if (body && !(body instanceof FormData)) {
      options.headers['Content-Type'] = 'application/json';
    }

    if (body) {
      options.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    return fetch(`${API_URL}${endpoint}`, options);
  };

  let token = localStorage.getItem('accessToken');
  let response = await makeRequest(token);

  if (response.status === 401 && localStorage.getItem('refreshToken')) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const newToken = await refreshTokenCall();
        isRefreshing = false;
        processQueue(null, newToken);
        response = await makeRequest(newToken);
      } catch (err) {
        isRefreshing = false;
        processQueue(err, null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/auth';
        throw new Error('Session expired. Please login again.', { cause: err });
      }
    } else {
      const newToken = await new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      });
      response = await makeRequest(newToken);
    }
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API Error');
  }

  return data;
};

export const authAPI = {
  signup: (name, email, password, role) =>
    apiCall('POST', '/auth/signup', { name, email, password, role }),
  login: (email, password) =>
    apiCall('POST', '/auth/login', { email, password }),
  refresh: () =>
    apiCall('POST', '/auth/refresh', {}),
  verifyOtp: (email, otp) =>
    apiCall('POST', '/auth/verify-otp', { email, otp }),
  resendOtp: (email) =>
    apiCall('POST', '/auth/resend-otp', { email }),
};

export const donationAPI = {
  getAll: (page = 1, limit = 10) =>
    apiCall('GET', `/donation?page=${page}&limit=${limit}`),
  getMyDonations: (page = 1, limit = 10) =>
    apiCall('GET', `/donation/my-donations?page=${page}&limit=${limit}`),
  getById: (id) =>
    apiCall('GET', `/donation/${id}`),
  create: (data) =>
    apiCall('POST', '/donation', data),
  update: (id, data) =>
    apiCall('PUT', `/donation/${id}`, data),
  delete: (id) =>
    apiCall('DELETE', `/donation/${id}`),
};

export const claimAPI = {
  getAll: (page = 1, limit = 10) =>
    apiCall('GET', `/claim?page=${page}&limit=${limit}`),
  getById: (id) =>
    apiCall('GET', `/claim/${id}`),
  getMyClaims: () =>
    apiCall('GET', '/claim/my-claims'),
  getDonorClaims: () =>
    apiCall('GET', '/claim/donor-claims'),
  create: (data) =>
    apiCall('POST', '/claim', data),
  updateStatus: (id, status, data) =>
    apiCall('PUT', `/claim/${id}`, { status, ...data }),
  cancel: (id, reason) =>
    apiCall('PATCH', `/claim/${id}/cancel`, { cancellationReason: reason }),
};

export const userAPI = {
  getAll: () =>
    apiCall('GET', '/user'),
  getById: (id) =>
    apiCall('GET', `/user/${id}`),
  update: (id, data) =>
    apiCall('PUT', `/user/${id}`, data),
  delete: (id) =>
    apiCall('DELETE', `/user/${id}`),
};

export const locationAPI = {
  addPickup: (data) =>
    apiCall('POST', '/location/pickup', data),
  addUser: (data) =>
    apiCall('POST', '/location/user', data),
  getUserLocations: () =>
    apiCall('GET', '/location/user'),
  getPickupLocations: () =>
    apiCall('GET', '/location/pickup'),
  delete: (id) =>
    apiCall('DELETE', `/location/${id}`),
};

export const ratingAPI = {
  create: (data) =>
    apiCall('POST', '/rating', data),
  getUserRatings: (userId) =>
    apiCall('GET', `/rating/user/${userId}`),
};

export const notificationAPI = {
  getAll: () =>
    apiCall('GET', '/notification'),
  markAsRead: (id) =>
    apiCall('PUT', `/notification/${id}/read`),
  markAllAsRead: () =>
    apiCall('PUT', '/notification/read-all'),
};
