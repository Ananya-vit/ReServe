import { Navigate } from 'react-router-dom'

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

const getUserRole = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch {
    return null;
  }
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('accessToken')

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    return <Navigate to="/auth" replace />
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = getUserRole(token);
    if (!userRole || !allowedRoles.includes(userRole)) {
      if (userRole === 'DONOR') {
        return <Navigate to="/donations" replace />
      }
      if (userRole === 'NGO') {
        return <Navigate to="/claims" replace />
      }
      return <Navigate to="/auth" replace />
    }
  }

  return children
}

export default ProtectedRoute
