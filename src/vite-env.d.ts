/// <reference types="vite/client" />

// midtrans 
export { };

declare global {
    interface Window {
        snap: {
            pay: (token: string, options?: object) => void;
        };
    }
}
