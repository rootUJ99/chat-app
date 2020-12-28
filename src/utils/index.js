export const convertToken = (token) => {
    if(token) {
      const [algo, userInfo] = token?.split('.');
      if (userInfo){
        return JSON.parse(atob(userInfo))
      }
    }
  }
  
  export default {
    convertToken
  }