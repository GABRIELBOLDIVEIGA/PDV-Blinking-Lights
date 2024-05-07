interface IProps {
  children?: React.ReactNode;
}

export function GridBackground({ children }: IProps) {
  return (
    <div className="relative w-full overflow-hidden bg-dot-black/[0.1] dark:bg-black dark:bg-dot-white/[0.09]">
      {children}
    </div>
  );
}
