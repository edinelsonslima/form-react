const masks = {
  currency: (options?: Intl.NumberFormatOptions & { locale?: string }) => {
    const intl = new Intl.NumberFormat(options?.locale ?? 'pt-br', {
      currency: 'BRL',
      style: 'currency',
      ...options,
    });

    const parts = intl.formatToParts(0);
    const fraction = parts.find((part) => part.type === 'fraction');
    const quantity = fraction?.value ? fraction?.value.length + 1 : 0;
    const decimals = '1'.concat(Array.from({ length: quantity }).join('0'));

    return {
      set(input: string) {
        const value = Number(input);
        return Number.isNaN(value) ? input : intl.format(value);
      },

      clear: (input: string) => {
        const value = Number(input.replace(/\D/g, '')) / Number(decimals);
        return String(value);
      },
    };
  },
};

export default masks;
