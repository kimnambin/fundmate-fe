import { createTheme } from '@mui/material/styles';

/**
 * MUI 테마 — 기존 Tailwind 프리셋(tailwind-preset.js)의 브랜드 토큰을 그대로 옮겨왔다.
 * main(#5FBDFF)을 MUI의 primary로, sub-color를 secondary 배경으로 매핑.
 */
export const fundmateTheme = createTheme({
  palette: {
    primary: {
      main: '#5FBDFF',
      light: '#DFF2FF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F59E0B',
    },
    error: {
      main: '#FB6565',
    },
    text: {
      primary: '#000000',
      secondary: '#7E7C7C',
    },
    divider: '#E2E8F0',
  },
  typography: {
    fontFamily: ['Pretendard', 'sans-serif'].join(','),
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 6 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'box-shadow 0.2s ease',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 10 },
      },
    },
  },
});
