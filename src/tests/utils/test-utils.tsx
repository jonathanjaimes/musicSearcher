import React, { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { vi } from "vitest";

// Custom render function that includes providers if needed
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };

// Helper functions for testing
export const createMockFunction = <T extends (...args: unknown[]) => unknown>(
  implementation?: T
) => (implementation ? vi.fn(implementation) : vi.fn());

export const waitForNextTick = () =>
  new Promise((resolve) => setTimeout(resolve, 0));

export const mockConsoleError = () => {
  const originalError = console.error;
  const mockError = vi.fn();
  console.error = mockError;

  return {
    mockError,
    restore: () => {
      console.error = originalError;
    },
  };
};

export const mockConsoleLog = () => {
  const originalLog = console.log;
  const mockLog = vi.fn();
  console.log = mockLog;

  return {
    mockLog,
    restore: () => {
      console.log = originalLog;
    },
  };
};
