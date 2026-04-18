import { Spinner } from '../ui/spinner';

const Loading = () => {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
      <Spinner className="size-6" />
    </div>
  );
};

export default Loading;
