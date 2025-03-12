
import { Note } from "@/context/NotesContext";
import html2canvas from "html2canvas";

export async function generateWallpaper(element: HTMLElement, note: Note): Promise<string> {
  try {
    // Capture the element as canvas
    const canvas = await html2canvas(element, {
      backgroundColor: note.backgroundColor,
      scale: 2, // Higher resolution
      logging: false,
      useCORS: true,
    });

    // Convert to blob
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          throw new Error("Failed to convert canvas to blob");
        }
      }, "image/png", 1.0);
    });

    // Create download URL
    const url = URL.createObjectURL(blob);
    
    // Create a download link and trigger it
    const link = document.createElement("a");
    link.href = url;
    link.download = `notewall-${note.title.replace(/\s+/g, "-").toLowerCase() || "wallpaper"}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    setTimeout(() => URL.revokeObjectURL(url), 100);
    
    return url;
  } catch (error) {
    console.error("Error generating wallpaper:", error);
    throw error;
  }
}
