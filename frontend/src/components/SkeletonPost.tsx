import { Skeleton } from "@/components/ui/skeleton";

const SkeletonPost = () => {
  return (
    <div className="mb-5 flex flex-col gap-0">
      <Skeleton className="w-full h-[250px] rounded-b-none" />
      <div className="w-full h-[260px] border bg-card text-card-foreground shadow  rounded-lg p-5">
        <div className="flex gap-2 items-center mb-8">
          <Skeleton className="rounded-full h-10 w-10" />
          <div className="flex flex-col gap-2">
            <Skeleton className="w-[150px] h-5" />
            <Skeleton className="w-20 h-3" />
          </div>
        </div>
        <div className="px-12 mb-4">
          <Skeleton className="w-[200px] h-8 mb-2" />
          <Skeleton className="w-8 h-3" />
        </div>
        <div className="px-12 mb-2">
          <Skeleton className="w-25 h-16" />
        </div>

        <div className="flex px-12 gap-3">
          <Skeleton className="w-5 h-2" />
          <Skeleton className="w-5 h-2" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonPost;
