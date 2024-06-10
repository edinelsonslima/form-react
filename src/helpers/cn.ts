function cn(style: CSSModuleClasses, ...cls: (string | undefined)[]) {
  return cls
    .map((c) => (c ? style[c] || c : ''))
    .join(' ')
    .trim();
}

export default cn;
