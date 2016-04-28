declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

// declare var template : string;
//
// declare module "raw!../html/partials/speciesForm.html" {
//   export = template;
// }
//
// declare module "raw!../html/app/partials/speciesList.html" {
//   export = template;
// }
