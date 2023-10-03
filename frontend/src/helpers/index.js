const helpers = {
  apiURL:
    process.env.NODE_ENV !== "development"
      ? `http://localhost:8000`
      : `http://${window.location.host}`,
};

export { helpers };
