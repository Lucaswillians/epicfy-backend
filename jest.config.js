/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "^@domain/(.*)$": "<rootDir>/src/domain/$1", // Resolve @domain para src/domain
  },
  rootDir: ".", // Raiz do projeto
  testMatch: ["<rootDir>/tests/**/*.test.(ts|tsx)"],
};
