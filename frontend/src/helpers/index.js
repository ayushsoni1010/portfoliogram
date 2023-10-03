const helpers = {
  apiURL:
    process.env.NODE_ENV !== "production"
      ? `http://localhost:8000`
      : `http://${window.location.host}`,
};

export { helpers };
