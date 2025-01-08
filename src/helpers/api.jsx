// export async function handleApiResponse(response, showMessage = true) {
//     const apiRes = { status: '', data: {} };
    
//     if (!response) return apiRes;
    
//     apiRes.data = response.data || {};
  
//     // You can directly use JavaScript's built-in checks
//     if (response && response.status === 200) {
//       apiRes.status = 'ok';
//       if (showMessage) {
//         alert('Success: ' + apiRes.data.message);
//       }
//     } 
//     else if (response && response.status === 403) {
//       if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/contact')) {
//         window.location.href = '/login'; // Redirect to login
//         if (apiRes.data.message) alert(apiRes.data.message);
//       }
//     } 
//     else {
//       apiRes.status = 'error';
//       if (showMessage) {
//         alert('Error: ' + apiRes.data.message);
//       }
//     }
  
//     return apiRes;
//   }
  
import { helper } from ".";

/**
 * Handles api response
 * @param {object} response
 * @param {boolean} [showMessage=true]
 * @returns {Promise<{data: {}, status: string}>}
 */
export async function handleApiResponse(response, showMessage = true) {
  const apiRes = { status: '', data: {} };
  if (!response) return apiRes;
  apiRes.data = response.data || {};
  if (helper.notEmpty(response) && helper.cmpStr(response.status, 200)) {
    apiRes.status = 'ok';
    if (helper.cmpBool(showMessage, true))
      helper.general.alert('success', { message: apiRes.data.message });
  } else if (helper.notEmpty(response) && helper.cmpStr(response.status, 403)) {
    if (
      !helper.cmpStr(window.location.pathname, '/login') &&
      window.location.pathname.indexOf('/contact') === -1
    ) {
      helper.auth.redirectToLogin(null, apiRes.data.message);
    }
  } else {
    apiRes.status = 'error';
    if (showMessage) helper.general.alert('error', { message: apiRes.data.message });
  }
  return apiRes;
}