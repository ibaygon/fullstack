import type { Top5List } from "../types/Top5List";

const navy = "bg-[#0f1b2e]";

function ImagePlaceholder() {
  return (
    <div className="w-9 h-9 shrink-0 bg-gray-100 rounded-md flex items-center justify-center border border-gray-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        width={10}
        height={10}
        className="text-gray-300 shrink-0"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>
    </div>
  );
}

interface Top5DetailProps {
  list: Top5List;
}

export const Top5Detail = ({ list }: Top5DetailProps) => {
  const normalizedItems = list.items.map((item) =>
    typeof item === "string" ? { text: item, image: "" } : item
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#0f1b2e] tracking-tight">{list.title}</h1>
      <span
        className={`inline-flex mt-3 ${navy} text-white text-xs font-semibold px-3 py-1 rounded-full`}
      >
        {list.category}
      </span>

      <ol className="mt-8 space-y-0 divide-y divide-gray-100">
        {normalizedItems.map((item, i) => (
          <li key={i} className="flex items-center gap-4 py-4 first:pt-0">
            <div
              className={`w-4 h-4 shrink-0 ${navy} text-white rounded-full flex items-center justify-center text-[7px] font-bold leading-none`}
            >
              {i + 1}
            </div>
            {item.image ? (
              <img
                src={item.image}
                alt=""
                className="w-9 h-9 object-cover rounded-md border border-gray-100 shrink-0"
              />
            ) : (
              <ImagePlaceholder />
            )}
            <span className="text-base sm:text-lg font-medium text-gray-900 leading-snug">
              {item.text}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};
