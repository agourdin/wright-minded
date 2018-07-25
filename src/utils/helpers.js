import { removeFromArray, isEmpty } from './fn';

/**
 * A helper function for use in `this.setState()`. Updates query parameters
 * stored in a component's state given a simple object of new parameters
 * and a state namespace.
 *
 * #### Namespacing
 * Giving the function a namespace string allows for management of
 * multiple concurrent endpoints within one container component.
 * ```
 * this.setState(manageParams({id: 1, is_public: True}, 'endpoint_1_params'))
 *
 * this.setState(manageParams({id: 2, is_admin: True}, 'endpoint_2_params'))
 *
 * state = {
 *  endpoint_1_params: {
 *    id: 1,
 *    is_public: True
 *  },
 *  endpoint_2_params: {
 *    id: 2,
 *    is_admin: True
 *  }
 * }
 * ```
 *
 * #### Multi-value params
 * The function looks for any parameters with suffix `_m`, indicating a mutli-value
 * parameter, and handles concatenation (values separated by commas) or
 * deletion accordingly.
 * ```
 * state.params = { id_m: '1' }
 * newParams = { id_m: '2' }
 * newParams_2 = { id_m: '1' }
 *
 * this.setState(manageParams(newParams))
 * new state = { id_m: '1,2' }
 *
 * this.setState(manageParams(newParams_2))
 * new state = { id_m: '2' }
 * ```
 * ---
 * @param {Object} params A simple object of query parameters
 * (e.g. `{id: '52', status: 'active', tacos: ''}`)
 * @param {string} namespace A string indicating the name of the key for the
 * given query parameters in the component's state. Enables concurrent management
 * of multiple endpoints.
 * @returns a new Object of the form `{ params: newParams }` to be passed during
 * a `this.setState()` call (e.g. `this.setState(manageParams(newParams))`).
 */
export const manageParams = (params, namespace) => {
  return (state, props) => {
    let obj = {};
    if (params) {
      for (let param of Object.keys(params)) {
        // if param is one of '_m' (multi), handle concatenation/clear
        if (param.indexOf('_m') > 0) {
          let newParam = params[param];
          let oldParam;
          // if old params were empty, just serve the new param
          if (
            isEmpty(state) ||
            isEmpty(state[namespace]) ||
            !state[namespace].hasOwnProperty(param)
          ) {
            continue;
          }
          oldParam = state[namespace][param];
          // if either param is '', just serve the new param
          if (newParam === '' || oldParam === '') {
            continue;
          }

          if (oldParam.indexOf(newParam) > -1) {
            // if the old param has the new param, delete it
            var paramArray = oldParam.split(',');
            removeFromArray(paramArray, newParam);
            params[param] = paramArray.join(',');
          } else {
            // otherwise concatenate it
            params[param] += ',' + oldParam;
          }
        }
      }
      let prevState = state[namespace] ? state[namespace] : {};
      let newParams = Object.assign(prevState, params);
      obj[namespace] = newParams;
      return obj;
    } else {
      obj[namespace] = {};
      return obj;
    }
  };
};

/**
 * Constructs a url with query parameters.
 * @param {string} url The base URL for the API endpoint
 * @param {Object} params A simple object of query parameters
 * (e.g. `{id_m: '52,53', status: 'active', tacos: ''}`)
 * @returns {string} A new url with the query parameters attached properly.
 * Ignores parameters set to `''`. Example output using above:
 *
 * `www.base-url.com/some/api/endpoint?id_m=52,53&status=active`
 *
 *
 */
export const urlWithParams = (url, params) => {
  if (params) {
    url += '?';
    for (var param in params) {
      if (params[param] === '') {
        continue;
      }
      url += param + '=' + params[param] + '&';
    }
    url = url.slice(0, -1);
  }
  return url;
};

export default {
  urlWithParams,
  manageParams
};
