const API_BASE_URL = "http://localhost:8081";

function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("jwt_token");
  }
  return null;
}

export function setToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt_token", token);
  }
}

export function removeToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt_token");
  }
}

export const isAuthenticated = () => !!getToken();

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = getToken();
  const headers = new Headers(options.headers || {});
  
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(`API error (${response.status}): ${errorBody || response.statusText}`);
  }

  return response;
}

export const api = {
  // Auth
  login: async (credentials: any) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  },
  
  signup: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Signup failed");
    return res.json();
  },

  // Leaderboard
  getLeaderboard: async () => {
    const res = await fetchWithAuth("/leaderboard");
    return res.json();
  },

  // Matchmaking
  findMatch: async () => {
    const res = await fetchWithAuth("/match/find");
    return res.text();
  },

  getCurrentMatch: async () => {
    const res = await fetchWithAuth("/match/current");
    return res.json();
  },

  submitCode: async (data: { matchId: number, code: string, language: string }) => {
    const res = await fetchWithAuth("/match/submit", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getMatchResult: async (matchId: number) => {
    const res = await fetchWithAuth(`/match/result/${matchId}`);
    return res.json();
  }
};
