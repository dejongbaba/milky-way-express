import { classNames } from "@/utils/utils";

export default function Component({
    type = "button",
    loading = false,
    onPress,
    style = "shade",
    loadingText = "Please wait...",
    disabled = false,
    extraClasses = "",
    children,
    ...props
}) {
    return (
        <button
            onClick={type === "button" ? () => onPress && onPress() : undefined}
            {...props}
            disabled={disabled || loading}
            className={classNames(
                style === "shade"
                    ? "bg-primary text-white border-primary rounded ring-transparent focus:outline-none hover:ring-2 disabled:opacity-40 hover:ring-offset-1 hover:ring-primary hover:border-primary hover:text-white"
                    : "bg-slate-100 border border-slate-100 rounded ring-transparent focus:outline-none hover:ring-1 disabled:opacity-40 hover:ring-black hover:border-black hover:text-gray-900",
                "whitespace-nowrap border cursor-pointer inline-flex items-center justify-center w-full px-3.5 py-3 uppercase text-xs tracking-wide font-bold transition-all duration-200",
                extraClasses
            )}
            type={type}>
            {loading ? loadingText : children}
        </button>
    );
}
