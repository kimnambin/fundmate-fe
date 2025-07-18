export const navigateToLogin = () => {
  window.dispatchEvent(new CustomEvent('navigate', { detail: '/login' }));
};
