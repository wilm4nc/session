
export const regularExps = {

  // email
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
  
  //phone
  phone: /^[0-9]{7,15}$/,
  
  // NIT con formato requerido
  nit: /^\d{9,15}$|^\d{9,15}-\d{1,2}$/,  


}