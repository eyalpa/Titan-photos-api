import { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
  // Log request details
  console.log(`Request: ${req.method} ${req.url}`);
  console.log(`Request Body: ${JSON.stringify(req.body)}`);

  // Store original send function
  const originalSend = res.send;

  // Replace send function
  res.send = function (body) {
    // Log response body
    console.log(`Response Body: ${body}`);
    return originalSend.apply(this, arguments as any);
  };

  next();
};

export default logger;
