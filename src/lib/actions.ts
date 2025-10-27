"use server";

import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function sendContactEmail(formData: { name: string; email: string; message: string }) {
  const parsed = formSchema.safeParse(formData);

  if (!parsed.success) {
    return { success: false, error: "Invalid form data." };
  }

  // Here you would typically integrate with an email sending service
  // like Firebase Extensions (Trigger Email) or a third-party API.
  // For this example, we'll just log the data and simulate success.
  
  console.log("Received contact form submission:");
  console.log("Name:", parsed.data.name);
  console.log("Email:", parsed.data.email);
  console.log("Message:", parsed.data.message);

  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In a real application, you would handle potential errors from the
  // email service here and return { success: false, error: '...' }.
  
  return { success: true };
}
