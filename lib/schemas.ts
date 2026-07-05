import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha obrigatória"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const setupSchema = z
  .object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

export type SetupInput = z.infer<typeof setupSchema>;

export const citySchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  state: z.string().min(2, "Estado deve ter pelo menos 2 caracteres"),
  image: z.string().optional(),
  active: z.boolean().default(true),
});

export type CityInput = z.infer<typeof citySchema>;

export const itemSchema = z.object({
  title: z.string().min(2, "Título deve ter pelo menos 2 caracteres"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  category: z.string().min(1, "Selecione uma categoria"),
  cityId: z.string().min(1, "Selecione uma cidade"),
  image: z.string().optional(),
  gallery: z.string().default("[]"),
  price: z.coerce.number().min(0, "Preço deve ser maior ou igual a 0"),
  whatsapp: z.string().optional(),
  active: z.boolean().default(true),
});

export type ItemInput = z.infer<typeof itemSchema>;

export const settingsSchema = z.object({
  defaultWhatsapp: z.string().optional(),
});

export type SettingsInput = z.infer<typeof settingsSchema>;

export function mapServerErrors(
  serverResult: { error?: Record<string, string[]> },
  setError: (field: string, error: { message: string }) => void,
  setServerError?: (msg: string) => void
) {
  if (!serverResult.error) return;
  for (const [key, msgs] of Object.entries(serverResult.error)) {
    if (key === "_form") {
      setServerError?.(msgs[0]);
    } else {
      setError(key, { message: msgs[0] });
    }
  }
}