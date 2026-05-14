import { Link } from "react-router-dom";
import { useTop5Context } from "../context/Top5Context";
import { useAuth } from "../context/AuthContext";
import type { Top5List } from "../types/Top5List";

const navy = "bg-[#0f1b2e]";

function ImagePlaceholder() {
  return (
    <div className="w-full h-full min-h-0 bg-gray-100 flex items-center justify-center">
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

interface ListaCardProps {
  list: Top5List;
}

export const ListaCard = ({ list }: ListaCardProps) => {
  const { removeList, lists } = useTop5Context();
  const { user } = useAuth();

  const canDelete = Boolean(
    user?.id &&
      list.id != null &&
      (lists.some((l) => l.id === list.id) ||
        (list.user_id != null && list.user_id === user.id))
  );

  const normalizedItems = list.items.map((item) =>
    typeof item === "string" ? { text: item, image: "" } : item
  );

  const firstThree = normalizedItems.slice(0, 3);
  const remaining = normalizedItems.length - 3;

  return (
    <article className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col w-full max-w-[260px] mx-auto">
      <h2 className="text-base sm:text-lg font-bold text-[#0f1b2e] leading-snug line-clamp-2">
        {list.title}
      </h2>
      <span
        className={`inline-flex self-start mt-2 ${navy} text-white text-xs font-semibold px-3 py-1 rounded-full`}
      >
        {list.category}
      </span>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {firstThree.map((item, i) => (
          <div key={i} className="flex flex-col min-w-0">
            <div className="relative w-full">
              <div
                className={`absolute -top-px -left-px z-10 w-3.5 h-3.5 ${navy} text-white rounded-full flex items-center justify-center text-[7px] font-bold leading-none`}
              >
                {i + 1}
              </div>
              <div className="h-10 w-full rounded-md overflow-hidden border border-gray-100 bg-gray-50">
                {item.image ? (
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImagePlaceholder />
                )}
              </div>
            </div>
            <p className="text-[11px] sm:text-xs font-medium text-gray-800 mt-1.5 line-clamp-2 text-center leading-tight">
              {item.text || "—"}
            </p>
          </div>
        ))}
      </div>

      {remaining > 0 && (
        <p className="text-center text-gray-400 text-xs mt-3">+{remaining} más</p>
      )}

      <div className="mt-5 flex items-stretch gap-2">
        <Link
          to={`/lista/${list.id}`}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 ${navy} text-white text-sm font-semibold py-2 px-2.5 rounded-lg hover:opacity-90 transition shadow-sm`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            width={12}
            height={12}
            className="shrink-0 opacity-95"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          Ver detalles
        </Link>

        {canDelete && (
          <button
          type="button"
          onClick={() => removeList(list.id!)}
          className="shrink-0 inline-flex items-center justify-center bg-red-600 text-white w-8 rounded-lg hover:bg-red-700 transition shadow-sm py-2"
          aria-label="Eliminar lista"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            width={12}
            height={12}
            className="shrink-0"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
        )}
      </div>
    </article>
  );
};
