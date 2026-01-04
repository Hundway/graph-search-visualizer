import { ref, onMounted, onUnmounted } from "vue";

export function useMouse() {
  const mouseDown = ref(false);

  const start = () => {
    mouseDown.value = true;
  };

  const stop = () => {
    mouseDown.value = false;
  };

  onMounted(() => {
    window.addEventListener("mouseup", stop);
  });

  onUnmounted(() => {
    window.removeEventListener("mouseup", stop);
  });

  return {
    mouseDown,
    start,
    stop,
  };
}
