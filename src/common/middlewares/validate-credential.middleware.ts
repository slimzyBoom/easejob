import { Request, Response, NextFunction } from "express";
import { ObjectSchema, ValidationErrorItem } from "joi";

type validationSource = "body" | "query" | "params";

// Helper function to validate payload from client making use of defined object schemas 
export const validationSchema = (schema: ObjectSchema, method: validationSource) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[method];
    const { error, value } = schema.validate(data, { abortEarly: true });
    if (error) {
      res
        .status(402)
        .json({
          message: "Credential validation failed ",
          details: error.details.map(
            (detail: ValidationErrorItem) => detail.message
          ),
        });
      return;
    }
    req[method] = value;
    next();
  };
};
