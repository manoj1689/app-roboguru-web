declare global {
    interface Window {
      recaptchaVerifier: any; // Type it as `any` or `RecaptchaVerifier` if needed
    }
  }
  
  export {};