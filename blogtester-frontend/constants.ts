// Using relative path allows Nginx (Docker) or Vite Proxy (Dev) to route correctly
// This fixes CORS and "Failed to fetch" on remote environments like Gitpod/Codespaces
export const API_BASE_URL = '/api';

export enum FetchState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}