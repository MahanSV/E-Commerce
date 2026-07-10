"use client";

import { useSessionTimeout } from "@/apps/frontend/hooks/useSessionTimeout";

export default function SessionTimeoutWrapper() {
  useSessionTimeout();
  return null;
}
