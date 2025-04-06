// doctorSchema.ts
import { z } from 'zod';

export const doctorSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  specialization: z.string().min(2, 'Specialization is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  hospital: z.string().min(5, 'Hospital is required'),
  experienceYears: z.number().min(0, 'Years of experience must be a positive number'),
  address: z.string().min(5, 'Address is required'),
});

export type DoctorForm = z.infer<typeof doctorSchema>;
