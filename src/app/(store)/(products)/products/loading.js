export default function Loading() {
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 justify-items-center p-3 pt-3 animate-pulse pt-10">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
        (skeleton, index) => (
          <div
            className="flex flex-col w-full h-96 border border-gray-300 p-2 max-w-[280px]"
            key={index}
          >
            <div className="h-1/2 bg-gray-300 w-full"></div>
            <div className="h-1/2 flex flex-col justify-start pt-1">
              <div className="h-5 mt-2 bg-gray-300 w-full"></div>
              <div className="h-5 mt-2 bg-gray-300 "></div>
              <div className="h-5 mt-2 bg-gray-300 "></div>
            </div>
            <div className="w-full h-10 bg-gray-400 "></div>
          </div>
        )
      )}
    </div>
  );
}
