import type { LoadingProps } from "../types/app";

export default function Loading({ message = "Loading...", fullScreen = false }: LoadingProps) {
  return (
    <div
      className={`d-flex flex-column align-items-center justify-content-center text-center ${
        fullScreen ? "vh-100" : "py-5"
      }`}
      style={{
        backgroundColor: fullScreen ? "#f8f9fa" : "transparent",
      }}
    >
      <div
        className="spinner-border text-primary mb-3"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-secondary fw-medium mb-0">{message}</p>
    </div>
  );
}
