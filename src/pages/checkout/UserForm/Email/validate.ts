import { z } from 'zod';

export const emailValidation = z
  .string()
  .email('Por favor, informe um e-mail válido.')
  .min(3, 'Por favor, informe um e-mail válido.')
  .max(255, 'E-mail muito longo. Por favor, abrevie.');
