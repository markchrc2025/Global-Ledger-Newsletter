import type { Issue } from "./types";

const registry: Record<string, () => Promise<{ default: Issue }>> = {
  "estonia-distribution-tax": () =>
    import("@/content/issues/estonia-distribution-tax"),
};

export async function getIssue(slug: string): Promise<Issue | null> {
  const loader = registry[slug];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}

export function getAllIssueSlugs(): string[] {
  return Object.keys(registry);
}
