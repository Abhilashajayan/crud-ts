interface Validation {
    isValid: boolean;
    error?: string;
  }
  
  const validateInput = (name: string | undefined, email: string, password: string): Validation => {
    const stringRegex = /^[a-zA-Z0-9_.\s-]{3,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^[^\s]{6,}$/;
  
    if (name !== undefined && !stringRegex.test(name)) {
      return { isValid: false, error: 'Invalid Fullname' };
    } else if (!emailRegex.test(email)) {
      return { isValid: false, error: 'Invalid Email Address' };
    } else if (!passwordRegex.test(password)) {
      return { isValid: false, error: 'Invalid Password! Make a strong password' };
    }
  
    return { isValid: true };
  };
  
  export default validateInput;
  