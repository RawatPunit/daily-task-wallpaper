
import { Note } from "@/context/NotesContext";
import html2canvas from "html2canvas";
import { toast } from "@/hooks/use-toast";

export async function generateWallpaper(element: HTMLElement, note: Note): Promise<string> {
  try {
    // Show toast notification
    toast({
      title: "Creating wallpaper...",
      description: "Please wait while we generate your wallpaper."
    });
    
    // Capture the element as canvas
    const canvas = await html2canvas(element, {
      backgroundColor: note.backgroundColor,
      scale: 2, // Higher resolution
      logging: false,
      useCORS: true,
      allowTaint: true // Allow cross-origin images
    });

    // Convert to blob
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to convert canvas to blob"));
        }
      }, "image/png", 1.0);
    });

    // Create download URL
    const url = URL.createObjectURL(blob);
    
    // Create a download link and trigger it
    const link = document.createElement("a");
    link.href = url;
    link.download = `notewall-${note.title.replace(/\s+/g, "-").toLowerCase() || "wallpaper"}-${Date.now()}.png`;
    
    // In Android webview, we need to use different approach
    if (window.navigator && window.navigator.userAgent.includes("Android")) {
      // For Android, we'll just open the image in a new tab
      window.open(url, '_blank');
      
      toast({
        title: "Wallpaper ready!",
        description: "Save the image from your browser to use as wallpaper."
      });
    } else {
      // Regular browser download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Wallpaper downloaded!",
        description: "Your wallpaper has been saved to your downloads folder."
      });
    }
    
    // Clean up the URL object after a delay
    setTimeout(() => URL.revokeObjectURL(url), 100);
    
    return url;
  } catch (error) {
    console.error("Error generating wallpaper:", error);
    toast({
      title: "Error generating wallpaper",
      description: "There was a problem creating your wallpaper. Please try again.",
      variant: "destructive"
    });
    throw error;
  }
}
