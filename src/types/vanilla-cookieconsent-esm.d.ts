declare module 'vanilla-cookieconsent/dist/cookieconsent.esm.js' {
  export function run(config: object): Promise<void>
  export function reset(eraseCookie?: boolean): void
  export function acceptedCategory(categoryName: string): boolean
  export function showPreferences(): void
}