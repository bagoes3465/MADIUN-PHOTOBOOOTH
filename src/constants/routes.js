// Application routes
export const ROUTES = {
  HOME: '/',
  CAPTURE: '/capture',
  EDIT: '/edit',
  EDIT_WITH_ID: '/edit/:photoId',
  GALLERY: '/gallery',
  DOWNLOAD: '/download',
  DOWNLOAD_WITH_QR: '/download/:qrCode',
  ADMIN: '/admin',
  NOT_FOUND: '/404'
};

// Route names for navigation
export const ROUTE_NAMES = {
  HOME: 'Home',
  CAPTURE: 'Capture',
  EDIT: 'Edit',
  GALLERY: 'Gallery',
  DOWNLOAD: 'Download',
  ADMIN: 'Admin'
};

// Navigation items for menu
export const NAV_ITEMS = [
  {
    name: ROUTE_NAMES.HOME,
    path: ROUTES.HOME,
    icon: 'Home'
  },
  {
    name: ROUTE_NAMES.CAPTURE,
    path: ROUTES.CAPTURE,
    icon: 'Camera'
  },
  {
    name: ROUTE_NAMES.GALLERY,
    path: ROUTES.GALLERY,
    icon: 'Image'
  }
];

export default ROUTES;