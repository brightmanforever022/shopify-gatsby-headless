// Facebook pixel events
export const fbAddToCart = (
  content_ids,
  content_type,
  currency = 'USD'
) => {
  if(typeof window !== 'undefined') {
    if (window.fbq != null) {
      window.fbq('track', 'AddToCart', {
        content_ids: content_ids,
        content_type: content_type,
        currency: currency
      });
    }
  }
}

export const snapPageView = () => {
  const userEmail = localStorage.getItem('dor_user_email');
  if (typeof window !== 'undefined') {
    if(window.snaptr) {
      window.snaptr('init', '71a99375-a469-4098-9c78-604a676001cc', {
        'user_email': userEmail
      });
      window.snaptr('track', 'PAGE_VIEW');
    }
  }
}

export const snapAddToCart = () => {
  const userEmail = localStorage.getItem('dor_user_email');
  if (typeof window !== 'undefined') {
    if(window.snaptr) {
      window.snaptr('init', '71a99375-a469-4098-9c78-604a676001cc', {
        'user_email': userEmail
      });
      window.snaptr('track', 'ADD_CART');
    }
  }
}

const API_URL = 'https://api.fedex.com/country/v2/countries/AU';

const defaultHeader=()=>{
  return {
    'authorization': 'Bearer l7xx8daef6fbb1724f21b2ada537e059ad7b'
  };
  }

  export const getAvailableDates = () => {
		const method = 'GET';
		const headers = 
		  defaultHeader()
		  ;
		const opts = { method, headers};
	  return fetch(`${API_URL}`,opts)
	};