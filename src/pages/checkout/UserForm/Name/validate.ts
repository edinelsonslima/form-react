import { z } from 'zod';

export const nameValidation = z
  .string()
  .trim()
  .nonempty('Por favor, informe seu nome completo.')
  .min(3, 'Por favor, informe seu nome completo.')
  .max(255, 'Nome muito longo. Por favor, abrevie.')
  .regex(/^[^ ]{2,} .*[^ ]{2,}$/, 'Nome e sobrenome são obrigatórios');
