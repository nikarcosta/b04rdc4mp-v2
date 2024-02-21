import joi from "joi";

export const clientSchema = joi.object({
  name: joi.string().trim().min(3).required(),
  phone: joi.string().trim().min(10).max(11).pattern(/^\d+$/).required(),
  cpf: joi.string().trim().length(11).pattern(/^\d+$/).required(),
  birthday: joi.date().max("now").required(),
});
