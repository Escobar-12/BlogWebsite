import { useEffect } from "react";

function useButtonHoverEffect() {
    useEffect(() => {
        const buttons = document.querySelectorAll(".Prim_Button");

        buttons.forEach((button) => {
            button.addEventListener("mousemove", (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left; 
                const y = e.clientY - rect.top; 

                button.style.setProperty("--mouse-x", `${x}px`);
                button.style.setProperty("--mouse-y", `${y}px`);
            });
        });

        // Cleanup event listeners on unmount
        return () => {
            buttons.forEach((button) => {
                button.removeEventListener("mousemove", () => {});
            });
        };
    });
}

export default useButtonHoverEffect;
