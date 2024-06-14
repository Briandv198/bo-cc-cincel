import { ReactNode } from "react";

export interface ContextType {
    jwt: string | null;
    setJwt: (jwt: string | null, expiresIn?: number) => void;
    logout: () => void;
    showSnackbar: (message: string) => void;
    clients: Client[];
    fetchClients: () => void;
    addClient: (client: Client) => Promise<void>;
    updateClient: (client: Client) => Promise<void>;
    deleteClient: (clientId: number) => Promise<void>;
    provisionClient: (clientId: number, provisionAmount: number) => Promise<void>;
  }

export interface Client {
    id: number;
    name: string;
    email: string;
    balance: number;
    lastProvisioning: string;
  }
  
  export interface SnackbarState {
    message: string;
    open: boolean;
    autoHideDuration: number;
    onClose: () => void;
  }
  export interface ContextProviderProps {
    children: ReactNode;
  }