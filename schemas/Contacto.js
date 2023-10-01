import z from 'zod';

const contactoSchema = z.object({
  nombre: z.string({
    invalid_type_error: 'Nombre title must be a string',
    required_error: 'Nombre title is required.'
  }),
  email: z.string(),
  telefono: z.string(),
  empresa: z.string()
});

export function validateContacto (input) {
  return contactoSchema.safeParse(input);
}

export function validatePartialContacto (input) {
  return contactoSchema.partial().safeParse(input);
}
