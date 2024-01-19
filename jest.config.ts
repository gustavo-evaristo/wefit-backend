export default {
  clearMocks: false,
  coveragePathIgnorePatterns: ["/node_modules/", "/migrations/"],
  coverageProvider: "v8",
  preset: "ts-jest",
  testMatch: ["**/**/*.spec.ts"],
};
