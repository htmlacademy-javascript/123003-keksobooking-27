const RequestUrl = {
  GET: 'https://27.javascript.pages.academy/keksobooking/data',
  POST:'https://27.javascript.pages.academy/keksobooking',
};

const getData = (onSuccess, onFail) => {
  fetch(RequestUrl.GET)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch((error) => {
      onFail(error.message);
    });
};

const sendData = (body) => fetch(
  RequestUrl.POST,
  {
    method: 'POST',
    body,
  },
);

export { getData, sendData };
