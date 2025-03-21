"use client";

export function ErrorMessage({
  message = "Something went wrong",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-md border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800/30 p-6 w-full flex flex-col items-center justify-center gap-4">
      <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-red-600 dark:text-red-400"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <div className="text-center">
        <h3 className="text-sm font-medium text-red-800 dark:text-red-300">
          Error
        </h3>
        <p className="mt-1 text-sm text-red-700 dark:text-red-400">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center rounded-md border border-red-300 bg-white dark:bg-red-900/30 dark:border-red-800/30 px-4 py-2 text-sm font-medium text-red-700 dark:text-red-300 shadow-sm hover:bg-red-50 dark:hover:bg-red-900/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Try again
        </button>
      )}
    </div>
  );
}
