import React from "react";

type Props = {
  caseId: number;
};

export function ModelViewer({ caseId }: Props) {
  const [image, setImage] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Load image
  React.useEffect(() => {
    // 1. Check local storage
    const stored = localStorage.getItem(`dd_model_image_case_${caseId}`);
    if (stored) {
      setImage(stored);
    } else {
      // 2. Fallback to public folder
      const fallbackUrl = `/models/caso_${caseId}.png`;
      const img = new Image();
      img.onload = () => setImage(fallbackUrl);
      img.onerror = () => setImage(null);
      img.src = fallbackUrl;
    }
  }, [caseId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecione um arquivo de imagem.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        localStorage.setItem(`dd_model_image_case_${caseId}`, base64);
        setImage(base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    localStorage.removeItem(`dd_model_image_case_${caseId}`);
    setImage(null);
  };

  // Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Paste from clipboard
  React.useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            const file = items[i].getAsFile();
            if (file) {
              processFile(file);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, [caseId]);

  return (
    <div className="flex h-full flex-col gap-2">
      {image ? (
        <div className="relative flex flex-1 flex-col overflow-hidden dd-inset p-2 bg-white h-full">
          <div className="flex justify-between items-center mb-2 border-b border-black/10 pb-1 text-xs">
            <span className="font-bold opacity-80">Modelo Conceitual (ER)</span>
            <button onClick={handleRemove} className="dd-btn py-0.5 px-1.5 text-[10px] bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer">
              Remover
            </button>
          </div>
          <div className="flex-1 overflow-auto flex items-center justify-center border border-dashed border-black/20 p-1 bg-neutral-50 rounded-sm">
            <img
              src={image}
              alt={`Modelo ER do Caso ${caseId}`}
              className="max-w-full max-h-full object-contain cursor-zoom-in"
              onClick={() => {
                const newTab = window.open();
                if (newTab) {
                  newTab.document.write(`<img src="${image}" style="max-width:100%" />`);
                  newTab.document.close();
                }
              }}
              title="Clique para abrir em tamanho real"
            />
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-1 flex-col items-center justify-center p-4 text-center cursor-pointer border-2 border-dashed border-slate-400 rounded bg-slate-100/50 hover:bg-slate-100 hover:border-slate-600 transition-colors h-full select-none"
        >
          <div className="text-3xl mb-2">📊</div>
          <div className="text-xs font-bold mb-1">Nenhum modelo ER carregado</div>
          <div className="text-[10px] opacity-75 max-w-[200px] leading-tight">
            Arraste um print do brModelo aqui, clique para procurar ou use <kbd className="bg-slate-200 px-1 py-0.5 rounded border font-mono">Ctrl + V</kbd> para colar.
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
