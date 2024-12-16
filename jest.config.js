module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/controllers/authController.ts",
    "!src/controllers/userController.ts",
    "!src/services/userService.ts",
  ],
};
