
export const extractErrorMessage = (axiosErrorObj) => {
  console.log(axiosErrorObj);
  if (typeof(axiosErrorObj.response?.data) === 'string') {
    return {
      message: axiosErrorObj.response.data
    };
  }
  if (axiosErrorObj.response?.data?.errors) {
    return {
      message: axiosErrorObj.response.data.errors.join()
    };
  } else {
    return axiosErrorObj;
  }
};
