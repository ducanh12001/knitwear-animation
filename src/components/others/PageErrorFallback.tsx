import { Link } from 'react-router';

interface PageErrorFallbackProps {
  resetErrorBoundary?: () => void;
}

const PageErrorFallback: React.FC<PageErrorFallbackProps> = ({
  resetErrorBoundary,
}) => {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold">Page Error</h2>
        <p className="mb-4 text-gray-600">
          This page encountered an error. The rest of the app is still working.
        </p>

        <div className="space-x-4">
          <button
            onClick={resetErrorBoundary}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Retry Page
          </button>
          <Link to="/" className="rounded bg-gray-500 px-4 py-2 text-white">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageErrorFallback;
