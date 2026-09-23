export interface UserPreferences {
  priceDropAlerts: boolean;
  wishlistAlerts: boolean;
  targetPriceAlerts: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  preferences: UserPreferences;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthSession {
  user: User;
  token: string;
}
