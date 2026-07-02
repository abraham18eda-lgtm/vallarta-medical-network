type TitleSectionProps = {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
};

export default async function TitleSection({
  title,
  subtitle,
  description,
  align = "center",
}: TitleSectionProps) {
  return (
    <div
      className={`
        my-14
        ${align === "center" ? "text-center" : "text-left"}
      `}
    >
      {/* TITLE */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
        {title}
      </h2>

      {/* SUBTITLE */}
      {subtitle && (
        <h3 className="mt-2 text-lg font-medium text-blue-600">
          {subtitle}
        </h3>
      )}

      {/* DESCRIPTION */}
      {description && (
        <p className="mt-2 text-sm md:text-base text-gray-500 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}