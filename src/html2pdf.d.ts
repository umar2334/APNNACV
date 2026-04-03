declare module 'html2pdf.js' {
  function html2pdf(): {
    set: (options: object) => ReturnType<typeof html2pdf>;
    from: (element: HTMLElement) => ReturnType<typeof html2pdf>;
    save: () => Promise<void>;
  };
  export default html2pdf;
}
