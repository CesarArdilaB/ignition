import { APP_NAME } from "~/lib/constants";

export function NameAndLogo({ open }: { open?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <img src="/logo.svg" alt="logo" className="w-10 h-10" />
      {open && (
        <span className="font-bold sm:inline-block">{APP_NAME}</span>
      )}
    </div>
  );
}