const helpers = {
  apiURL:
    process.env.NODE_ENV !== "production"
      ? `http://localhost:8000`
      : `${window.location.protocol}://${window.location.host}`,
};

export { helpers };
