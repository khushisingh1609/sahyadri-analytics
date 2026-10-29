import { useAuth } from "./useAuth";

export function useRole() {
  const { user, isAuthenticated } = useAuth();

  // Helper function to check for a specific role
  const hasRole = (allowedRoles: string | string[]) => {
    if (!isAuthenticated || !user?.role) return false;
    
    if (Array.isArray(allowedRoles)) {
      return allowedRoles.includes(user.role);
    }
    return user.role === allowedRoles;
  };

  return {
    currentRole: user?.role || null,
    hasRole,
    
    // Quick boolean checks for specific UI rendering
    isDoctor: user?.role === "doctor",
    isNurse: user?.role === "nurse",
    isReception: user?.role === "reception",
    isPharmacy: user?.role === "pharmacy",
    isLab: user?.role === "laboratory",
    isAdmin: user?.role === "admin",
  };
}