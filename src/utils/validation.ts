export function isStrongPassword(password: string): boolean {
    // At minimum, enforce 8+ characters
    if (password.length < 8) {
      return false;
    }
    
    // For stronger enforcement, uncomment these additional criteria
    // Has at least one lowercase letter
    // const hasLowercase = /[a-z]/.test(password);
    
    // Has at least one uppercase letter
    // const hasUppercase = /[A-Z]/.test(password);
    
    // Has at least one digit
    // const hasDigit = /\d/.test(password);
    
    // Has at least one special character
    // const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    // For basic requirements, just check length
    return true;
    
    // For stronger enforcement, use this instead:
    // return hasLowercase && hasUppercase && hasDigit && hasSpecial;
  }