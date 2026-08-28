import { createClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "../../utils/supabase/info";

const browser = globalThis as typeof globalThis & {
  __pravaahSupabase?: ReturnType<typeof createClient>;
};

// Vite can re-evaluate modules during hot reload. Keep one GoTrue client per tab.
export const supabase = browser.__pravaahSupabase ??= createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey,
  {
    auth: {
      // Avoid the default sb-<project>-auth-token key, which can be shared by
      // another Make layer in the same browser context.
      storageKey: "pravaah-responder-auth-v1",
      detectSessionInUrl: true,
    },
  },
);
export const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-5f67f247`;
