import { ref } from "vue";
import { useEventListener } from "@/composables/event";

export function useMouse() {
  const isMouseDown = ref(false);

  const onMouseDown = () => {
    isMouseDown.value = true;
  };

  const onMouseUp = () => {
    isMouseDown.value = false;
  };

  useEventListener(window, "mouseup", onMouseUp);
  useEventListener(window, "mouseleave", onMouseUp);

  return {
    isMouseDown,
    onMouseDown,
    onMouseUp,
  };
}

export function useDrag() {
  const isDragging = ref(false);
  const activeItem = ref<any>(null);

  const onDragStart = (item: any) => {
    isDragging.value = true;
    activeItem.value = item;
  };

  const onDragEnd = (callback?: (item: any) => void) => {
    if (callback && activeItem.value) callback(activeItem.value);
    isDragging.value = false;
    activeItem.value = null;
  };

  const onDragMove = (
    event: MouseEvent,
    moveHandler: (item: any, x: number, y: number) => void
  ) => {
    if (!isDragging.value || !activeItem.value) return;
    const x = event.clientX;
    const y = event.clientY;
    moveHandler(activeItem.value, x, y);
  };

  return {
    isDragging,
    activeItem,
    onDragStart,
    onDragMove,
    onDragEnd,
  };
}
