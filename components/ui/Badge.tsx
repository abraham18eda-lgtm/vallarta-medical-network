interface Props {
  children: React.ReactNode;
}

export default function Badge({
  children,
}: Props) {
  return (
    <span
      className="
      inline-flex
      rounded-full
      bg-blue-50
      px-3
      py-1
      text-sm
      font-medium
      text-[#0F4C81]"
    >
      {children}
    </span>
  );
}