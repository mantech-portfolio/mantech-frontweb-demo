import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UiState = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  productFocus: 'MDRM-IT' | 'MDRM-DR';
  setProductFocus: (p: UiState['productFocus']) => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      productFocus: 'MDRM-IT',
      setProductFocus: (p) => set({ productFocus: p }),
    }),
    { name: 'mantech-portfolio-ui' }
  )
);
