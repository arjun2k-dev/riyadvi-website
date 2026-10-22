const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateFields(requiredFields) {
  return (req, res, next) => {
    const errors = [];
    for (const field of requiredFields) {
      const value = req.body?.[field];
      if (value === undefined || value === null || String(value).trim() === "") {
        errors.push(`Field '${field}' is required.`);
      }
    }

    if (req.body?.email && !EMAIL_REGEX.test(String(req.body.email).trim())) {
      errors.push("Please provide a valid email address.");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors
      });
    }

    next();
  };
}

export function errorHandler(err, req, res, next) {
  console.error("[API Error]:", err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: [err.message || "Unexpected error occurred"]
  });
}
