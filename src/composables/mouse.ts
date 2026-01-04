import { ref } from "vue";
import { useEventListener } from "@/composables/event";

export function useMouse() {
  const mouseDown = ref(false);

  const start = () => {
    mouseDown.value = true;
  };

  const stop = () => {
    mouseDown.value = false;
  };

  useEventListener(window, "mouseup", stop);

  return {
    mouseDown,
    start,
    stop,
  };
}
