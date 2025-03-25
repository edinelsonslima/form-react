import { z } from 'zod';

export function validate(schema: z.ZodType) {
  return async (value: string) => {
    try {
      await schema.parseAsync(value);
      return undefined;
    } catch (error) {
      if (!(error instanceof z.ZodError)) {
        return 'Erro desconhecido';
      }

      return error.errors[0].message;
    }
  };
}
