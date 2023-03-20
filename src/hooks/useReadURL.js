const useReadURL = () => {
  const params = {};

  // location.hash: category=36-History?page=1&valor2=num2&valor3=num3
  // ['category=36-History', 'page=1&valor2=num2&valor3=num3']
  const [hash, queryParams] = location.hash.split("?");
  let [, query] = hash.split("="); // ['category', '36-History']
  query = query.replaceAll("%20", " ");
  const queryParamsArray = queryParams ? queryParams.split("&") : [];
  // page=1&valor2=num2&valor3=num3 =>
  // ['page=1', 'valor2=num2', 'valor3=num3']

  queryParamsArray.forEach((param) => {
    const [paramName, paramValue] = param.split("=");
    params[paramName] = paramValue;
  });
  // params: {
  //     page: 2,
  //     valor2: algo,
  //     valor3: algo,
  // }

  let { page } = params;
  page = page ? parseInt(page) : 1;

  return {
    hash,
    page,
    params,
    query,
  };
};

export default useReadURL;
