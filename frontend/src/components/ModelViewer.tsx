import React from "react";

type Props = {
  caseId: number;
};

export function ModelViewer({ caseId }: Props) {
  const imageUrl = `/models/caso_${caseId}.png`;
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setHasError(false);
  }, [caseId]);

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden dd-inset p-2 bg-white h-full">
      <div className="flex justify-between items-center mb-2 border-b border-black/10 pb-1 text-xs select-none">
        <span className="font-bold opacity-80">Modelo Conceitual (ER)</span>
      </div>
      <div className="flex-1 overflow-auto flex items-center justify-center border border-dashed border-black/20 p-1 bg-neutral-50 rounded-sm">
        {hasError ? (
          <div className="text-xs opacity-60 italic text-center p-4">
            Diagrama do modelo ER indisponível para este caso.
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={`Modelo ER do Caso ${caseId}`}
            className="max-w-full max-h-full object-contain cursor-zoom-in"
            onClick={() => {
              const newTab = window.open();
              if (newTab) {
                newTab.document.write(`<img src="${imageUrl}" style="max-width:100%" />`);
                newTab.document.close();
              }
            }}
            onError={() => setHasError(true)}
            title="Clique para abrir em tamanho real"
          />
        )}
      </div>
    </div>
  );
}
